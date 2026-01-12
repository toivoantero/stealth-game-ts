# Tiedustelijan Kosto — A Stealth Game

**A simple stealth game built with React & TypeScript — inspired by classic stealth games.**

## 📖 Project Description
This is a browser-based stealth game where the player controls a character and tries to avoid being found while navigating through a level. The project is a practical exercise in React and TypeScript, exploring the ways how a small game can be built using modern web technologies. I used the source code of a tic-tac-toe game as a starting point and gradually built a more complex system from it. This process led me to develop my own game logic framework. The game is fully playable on both desktop and mobile devices, with support for touch-based controls.

## 🎮 Live Demo
[Try the game here → Tiedustelijan Kosto](https://tiedustelijan-kosto.vercel.app)

## ✨ Features

#### 1. Game over
![Game over](/src/kuvat/gameover.gif)

A rotating spotlight illuminates different parts of the game area.
If the player’s character enters an illuminated area, the player is detected and the game ends.

---

#### 2. Win condition
![Win condition](/src/kuvat/gamewin.gif)

The player wins by moving the character to the stairs.
To reach the stairs without being detected, the player can use shaded areas in the environment. 
The spotlight cannot illuminate these shaded zones, making them safe for the character.

---

#### 3. Mobile support
The game is fully playable on mobile devices with touch screens.
The controls adapt to touch input, allowing the character to be moved by tapping.

## 🛠️ Technologies
- React  
- TypeScript  
- Vite  
- CSS

## 🧪 Testing

Basic automated tests are included to ensure that core components render correctly and respond to user interactions as expected.

Testing covers:

-Rendering of main screens (TitleScreen, Level, EndScreen)
-User interactions such as clicking game elements
-Simple time-based UI behavior

Tests are written using **Jest** and **React Testing Library**.

To run tests locally:
```bash
npm test
```

## ⚙️ Installation & Setup
1. Clone the repository:  
```bash
git clone https://github.com/toivoantero/stealth-game-ts.git
```
```bash
cd stealth-game-ts
```
```bash
npm install
```
```bash
npm run dev
```
