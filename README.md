# Tiedustelijan Kosto — A Stealth Game

**A simple stealth game built with React & TypeScript — inspired by classic stealth games.**

## Project Description
This is a browser-based stealth game where the player controls a character and tries to avoid being found while navigating through a level. The project is a practical exercise in React and TypeScript, exploring the ways how a small game can be built using modern web technologies. I used the source code of a tic-tac-toe game as a starting point and gradually built a more complex system from it. This process led me to develop my own game logic framework.

## Live Demo
[Try the game here → Tiedustelijan Kosto](https://tiedustelijan-kosto.vercel.app)

## Features

#### 1. Game over
![Game over](/src/kuvat/alert.gif)

A rotating spotlight illuminates different parts of the game area.
If the player’s character enters an illuminated area, the player is detected and the game ends.

---

#### 2. Win condition
![Win condition](/src/kuvat/win.gif)

The player wins by moving the character to the stairs.
To reach the stairs without being detected, the player can use shaded areas in the environment. 
The spotlight cannot illuminate these shaded zones, making them safe for the character.

## Technologies
- React  
- TypeScript  
- Vite  
- CSS  

## Installation & Setup
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
