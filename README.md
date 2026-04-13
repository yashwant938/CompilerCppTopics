# C++ STL Compiler Interactive Demonstrator

A sleek, highly interactive frontend application built to visualize C++ Standard Template Library (STL) operations, algorithm execution, and data structure management through the lens of Compiler Design.

> ⭐ **Live Demo Available!** 
> *Visit the live application hosted completely free on GitHub Pages: [https://yashwant938.github.io/CompilerCppTopics/](https://yashwant938.github.io/CompilerCppTopics/)*

## Key Features

- **Interactive Animation Lab:** A powerful dual-pane visualizer (inspired by premium learning platforms) demonstrating real-time step execution for:
  - Vectors & Maps (resizing, capacity, erasing)
  - Stacks, Queues, and Priority Queues
  - Sets (unique implementations)
  - Custom Functor Objects demonstrating persisting object states alongside `operator()` invocations.
  - Algorithms (`std::count_if`) complete with sweeping visual scanners.
- **Quiz Mode:** Timed 20-second compiler-focused STL questions with built-in score and progress tracking to reinforce key logic.
- **Slide Decks:** Reveal.js integration for beautiful, keyboard-navigable presentation slides.
- **Code Explorer:** Monaco-powered embedded code editors letting you discover how structures work beneath the abstraction layer.
- **Premium Aesthetics:** Dark-mode tailored, highly animated, and fully responsive utilizing TailwindCSS and Framer Motion.

## Technology Stack

- **React 19**
- **Vite** (Build Tooling & Dev Server)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Smooth transitions and complex SVG/Div animations)
- **Monaco Editor / Reveal.js**

## Getting Started Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yashwant938/CompilerCppTopics.git
   cd CompilerCppTopics
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```

## Deployment

The application is configured to deploy automatically via `gh-pages`. To push a new production build:
```bash
npm run deploy
```
Make sure your Github Repository settings have "Pages" enabled, and pointed toward the `gh-pages` branch.
