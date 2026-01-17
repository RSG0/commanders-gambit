# Commander's Gambit 🎲

Welcome to **Commander's Gambit**, a web application that helps you **randomly select commanders** for your Magic: The Gathering games. Built with **React + Vite**, it provides a simple, fast, and fun way to spice up your Commander matches.

---

## 🚀 Features
- 🎴 Randomly assigns a Magic: The Gathering commander from your chosen pool
- 🔀 Quick and fair randomization for multiplayer games
- ⚡ Built with **Vite** for lightning-fast dev and build times
- 🛤️ Uses **react-router-dom** for navigation
- 🎨 Clean icons powered by **react-icons**
- 🧹 Code formatting with **Prettier**
- 🧪 End-to-End Testing with **Cypress**

---

## 📦 Tech Stack
- Frontend: [React](https://react.dev/), [Vite](https://vitejs.dev/)
- Backend: [Node.js](https://nodejs.org/)
- Routing: [react-router-dom](https://reactrouter.com/)
- UI: [react-icons](https://react-icons.github.io/react-icons/)
- Formatting: [Prettier](https://prettier.io/)
- Testing: [Cypress](https://docs.cypress.io/)

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/rsg0/commanders-gambit.git
cd commanders-gambit/src
```

### 2. Install Dependencies
```bash
npm install
```

### 2. Run the development server (backend)
```bash
node server.js
```
#### In another terminal run (frontend)

```bash
npm run dev
```

---

The app should now be running at:
```bash
http://localhost:5173
```
##
### 🧪 Running Cypress Tests

Cypress is used for end-to-end testing, validating real user behavior such as navigation, button interactions, and commander selection.

Open the Cypress Test Runner

### In a new terminal, run:
```bash
npx cypress open
```
Warning: To ensure no errors, the back and frontend must be running simultaneously to run Cypress testing
