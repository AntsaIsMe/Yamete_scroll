async function test(params) {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    })

    const popup = document.querySelector(".popup-container")
    
    if (!tab || !tab.url) {
        console.log("Impossible de lire l'URL. As-tu bien ajouté la permission 'tabs' ?");
        return;
    }
    
    const titre = tab.title
    const urlPage = tab.url

    const isReel = urlPage.includes("shorts/") ||
                   urlPage.includes('/short') ||
                   urlPage.includes('/reels') ||
                   urlPage.includes('/reel')

    const imgJudge = chrome.runtime.getURL("image/judge.gif");
    const audioAll = [
        "caserolle.mp3",
        "meow.mp3",
        "Yamete.mp3"
    ]
    
    const audMap = audioAll.map(nom => chrome.runtime.getURL(`audio/${nom}`));

    function playIt(ad, vol = 1.0) {
        const audio = new Audio(ad)
            audio.volume = vol
            audio.play().catch(err => {
                console.log(err + " Probleme du son");
            })
    }

    // change le titre de la page
    chrome.scripting.executeScript({
        target : {tabId : tab.id},
        args: [titre],
        func: (titre)=>{
            document.title = "Javascript > " + titre
        }
    })
    
    const timerDiv = document.querySelector(".time")
    const alerte = document.querySelector(".alerte")

    let timerData = await chrome.storage.local.get('timer')
    let timer = timerData.timer || 60
    let dim = 230
    let soundCounter = 0
    let soundAt10Played = false
    let inter ;
    const local = await chrome.storage.local.get(['scroll']);
    let scroll = local.scroll || 0;

    async function verifReel() {
        timer--
        dim++
        soundCounter++
        

        

        // Mise à jour du texte dans ta popup
        if (timerDiv) {
            timerDiv.innerHTML = `<p>${timer} coups</p>`;
        }  

        if (timer <= 50) {
            alerte.textContent = "Moins de 50 maintenant";
        }

        if (timer <= 40) {
            document.body.style.height = dim + "px";
        }

        // --- PALIER 30s : Flou ---
        if (timer <= 30) {
            alerte.textContent = "Quitte ce scroll!!";
        }
        
        // --- SYSTÈME DE SON PROGRESSIF ---
        // 60 - 30 : every 10 coups
        if (timer > 30 && soundCounter % 10 === 0) {
            playIt(audMap[0])
        }
        
        // 30 - 20 : every 5 coups
        if (timer <= 30 && timer > 20 && soundCounter % 5 === 0) {
            playIt(audMap[0])
            playIt(audMap[1])
        }
        
        if (timer <= 20 && timer > 10 && soundCounter % 1 === 0) {
            alerte.innerHTML = "<h1>Tu vas le regreter</h1>";
            playIt(audMap[0])
        }
        
        // 10 coups : un son, une seule fois
        if (timer === 15 && !soundAt10Played) {
            const audio = new Audio(audMap[2]);
    
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            
            const source = ctx.createMediaElementSource(audio);
            const gainNode = ctx.createGain();
            
            gainNode.gain.value = 1.5; 
            
            source.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            audio.play().catch(err => console.log("Erreur audio boosté : ", err));
            soundAt10Played = true
        }

        if (timer <= 0) {
            clearInterval(inter)
            chrome.scripting.executeScript({
                target: {tabId : tab.id},
                func: ()=>{
                        window.location.href = "https://heeeeeeeey.com/";
                    }
                })
            window.close()
        }

    }

    if (isReel) {
        popup.style.display = "flex"
        scroll++
        await chrome.storage.local.set({scroll : scroll})

        if (scroll > 1) {
            timer = Math.floor(timer * 0.9)
        }
            await chrome.storage.local.set({timer : timer})
       inter =  setInterval(() => {
            verifReel()
        }, 845);
    }
    else{
        window.close()
        // await chrome.storage.local.clear()
    }
}
test()