# Codebox

Codebox is a modern platform for discovering, creating, and sharing beautiful UI components. Similar to UIVerse.io but with its own unique features, Codebox allows developers to browse, customize, and use components in their projects.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)

## ✨ Features


- **Component Showcase**: Browse and discover beautiful UI components
- **Authentication**: Basic login and registration
- **Live Editor**: Edit components in real-time with Monaco Editor
- **Responsive Design**: Components work across all device sizes
- **Component Categories**: Organized by type (buttons, cards, inputs, etc.)

## 🛠️ Tech Stack

### Shared Technologies
- TypeScript
- Vite
- Monaco Editor
- Vitest
- Tailwind + daicyUI
- Biome (linting/formatting)
- Playwright (E2E testing)

### React Implementation
-  React
- React Testing Library
- Lucide React icons

### Vue Implementation
- Vue 3 (Composition API)
- Lucide Vue icons
- Vue Testing Library

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v8 or later)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ElizabethCF01/codebox-two-fw.git
cd codebox-two-fw
```
## 📜 Available Scripts
```
npm run init
```
```
npm run dev
```
```
npm run test
```
```
npm run typecheck
```
```
npm run lint-format
```


## 📁 Project Structure
```
codebox/
├── react/                # React implementation
│   ├── src/              # Source files
│   │   ├── components/   # React components
│   │   ├── views/        # Editor, Preview etc
│   └── ...
├── vue/                  # Vue implementation
│   ├── src/              # Source files
│   │   ├── components/   # Vue components
│   │   ├── views/        # Editor, Preview etc
│   │   └── ...
│   └── ...
├── package.json          # Root package.json with scripts
└── README.md             # This file
```

## Links

[Vue](https://codebox-vue.netlify.app/) and
[React](https://codebox-react.netlify.app/)
