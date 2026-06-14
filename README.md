#  Yamete Scrolling

<p align="center">
  <img src="https://raw.githubusercontent.com/AntsaIsMe/Yamete_scroll/main/image/logo512.png" width="128" alt="Yamete Scrolling Logo">
</p>

> *"Stop scrolling or YAMETE will do it for you"*

Une extension Chrome qui **punit les scrolleurs compulsifs** de Shorts/Reels avec un compte à rebours chaotique. Chaque fois que tu reviens, le temps diminue.

---

##  Structure

```
yamete-scrolling/
├── manifest.json
├── index.html
├── script.js
├── storage.js
├── image/
│   ├── judge.gif
│   ├── logo16.png
│   ├── logo48.png
│   └── logo128.png
└── audio/
    ├── caserolle.mp3
    ├── meow.mp3
    └── Yamete.mp3
```

---

##  Installation

1. Clone ou télécharge le repo
2. Ouvre Chrome → `chrome://extensions/`
3. Active le **mode développeur** (en haut à droite)
4. Clique **"Charger l'extension non empaquetée"**
5. Sélectionne le dossier du projet

---

##  Fonctionnement

### Détection automatique
L'extension détecte les Shorts/Reels sur:
- **YouTube** (`/shorts/`)
- **Instagram** (`/reels/`)
- **Facebook** (`/reel/`)

Si tu n'es pas sur ces pages → la popup se ferme automatiquement.

### Compte à rebours
- **60 secondes** au départ
- **-10% à chaque récidive** (stocké via `chrome.storage.local`)
- La popup s'ouvre automatiquement sur les Shorts/Reels

### Punitions progressives

| Coups restants | Punition |
|---|---|
| 50 | "Moins de 50 maintenant" |
| 40 | Compression de l'écran |
| 30 | "Quitte ce scroll!!" |
| 20-10 | "Tu vas le regretter" + son toutes les 2s |
| 15 | Yamete.mp3 à volume boosté (x1.5) |
| 0 | Redirection vers [heeeeeeeey.com](https://heeeeeeeey.com) 💥 |

### Système de son progressif

| Timer | Fréquence | Son |
|---|---|---|
| 60 → 30 | toutes les 10 coups | caserolle.mp3 |
| 30 → 20 | toutes les 5 coups | caserolle.mp3 + meow.mp3 |
| 20 → 10 | toutes les 2 coups | caserolle.mp3 |
| 15 | une seule fois | Yamete.mp3 (boosté x1.5) |

### Système récidiviste
```
1ère fois  → 60 coups
2ème fois  → 54 coups (-10%)
3ème fois  → 48 coups (-10%)
...
```

---

## 🔧 Permissions

| Permission | Utilité |
|---|---|
| `activeTab` | Lire l'URL de l'onglet actif |
| `scripting` | Injecter du code dans la page |
| `tabs` | Accéder aux infos de l'onglet |
| `storage` | Sauvegarder le timer et le compteur de scroll |

---

## 🛠️ Tech Stack

- **Manifest V3**
- **Chrome Extension API** (`chrome.scripting`, `chrome.storage`, `chrome.tabs`)
- **Vanilla JS**

---



---

*Made with 😈 pour punir les scrolleurs de Shorts/Reels*
