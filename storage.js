// Service Worker - Gère le storage
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Cringe installée!");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkRecidivist") {
        const storedKey = `scrollReel_${request.url}`;
        chrome.storage.local.get(storedKey, (result) => {
            const isRecidivist = result[storedKey] !== undefined;
            chrome.storage.local.set({[storedKey]: Date.now()});
            sendResponse({isRecidivist});
        });
        return true;
    }
});