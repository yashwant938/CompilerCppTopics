<div align="center">

  <h1 align="center">C++ STL & Compiler Interactive Demonstrator</h1>

  <p align="center">
    A premium, highly interactive frontend application visualizing C++ Standard Template Library (STL) operations, algorithm execution, and data structure management through the lens of Compiler Design.
    <br />
    <a href="https://yashwant938.github.io/CompilerCppTopics/"><strong>Explore the live demo »</strong></a>
    <br />
    <br />
    <a href="#key-features">Key Features</a>
    ·
    <a href="#technology-stack">Tech Stack</a>
    ·
    <a href="#getting-started-locally">Getting Started</a>
  </p>
</div>

---

## ⚡ Overview

The **C++ STL & Compiler Interactive Demonstrator** is an educational platform designed to bridge the gap between theoretical C++ concepts and their practical, under-the-hood implementations. By combining interactive animations, real-time code executions, and gamified quizzes, this platform transforms complex topics like memory management, functor operations, and algorithmic efficiency into digestible visual experiences.

## ✨ Key Features

This application is composed of several distinct, interactive modules:

### 🔬 1. Interactive Animation Lab
A powerful dual-pane visualizer inspired by premium learning platforms. It provides real-time, step-by-step visualizations of:
- **Vectors & Maps:** Observes dynamic resizing, capacity changes, and element erasure operations.
- **Stacks, Queues & Priority Queues:** Visualizes LIFO, FIFO, and heap-based data management.
- **Sets:** Demonstrates unique value insertion and tree-based implementations.
- **Custom Functor Objects:** Shows persisting object states alongside `operator()` invocations for advanced C++ concepts.
- **Algorithms:** Features sweeping visual scanners simulating operations like `std::count_if`.

### 🧠 2. Quiz Mode
Reinforce your learning with a gamified, timed quiz module:
- Features 20-second compiler and STL-focused questions.
- Built-in score and progress tracking.
- Localized leaderboard logic to track high scores across sessions.

### 📊 3. Interactive Slide Decks
Beautiful, keyboard-navigable presentation slides using Reveal.js integration to deliver core theoretical concepts before diving into practical execution.

### 💻 4. Code Explorer Lab
Embedded Monaco Editors allow users to:
- Discover how structures work beneath the abstraction layer.
- View beautifully syntax-highlighted C++ code.
- Understand the exact code structures corresponding to the visualizations.

### 🎨 5. Premium Aesthetics
- **Dark-Mode First:** Crafted with sleek, dark aesthetics perfect for developer environments.
- **Motion & Fluidity:** Highly animated layout transitions and micro-interactions utilizing Framer Motion.
- **Responsive Design:** Completely responsive layout, scaling seamlessly from desktop to tablet devices via Tailwind CSS.

## 🛠️ Technology Stack

This project leverages modern frontend tooling to ensure high performance and maintainability:

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Core** | [React 19](https://react.dev/) | Modern UI library utilizing Hooks and Functional Components. |
| **Build Tool** | [Vite](https://vitejs.dev/) | Lightning-fast development server and optimized build bundler. |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | Utility-first CSS framework for rapid UI development. |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Production-ready animation library for smooth UI transitions. |
| **Editors / Presentations** | [Monaco Editor](https://microsoft.github.io/monaco-editor/) / [Reveal.js](https://revealjs.com/) | Integrated VS Code-like editor and HTML presentation framework. |

## 🏗️ Project Structure

```text
compiler-cpp-topics/
├── public/                 # Static assets (favicons, etc.)
├── src/
│   ├── assets/             # Images and global styling
│   ├── components/         # Reusable UI components (Navbar, Buttons, etc.)
│   ├── data/               # Static content (Quiz questions, Slide data, Code examples)
│   ├── sections/           # Main application stages (Landing, Quiz, Labs, etc.)
│   ├── App.jsx             # Root component handling stage navigation & state
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global Tailwind CSS directives
├── index.html              # HTML entry point
├── package.json            # Project dependencies and scrips
├── tailwind.config.js      # Tailwind theme configuration
└── vite.config.js          # Vite configuration and plugins
```

## 🚀 Getting Started Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **npm** (Node Package Manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yashwant938/CompilerCppTopics.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd CompilerCppTopics
   ```

3. **Install the dependencies:**
   ```bash   
   npm install
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will start, usually at `http://localhost:5173`.

## 📦 Deployment

The application is configured to deploy automatically via GitHub Pages using the `gh-pages` package.

To create a production build and push it to the live environment:

```bash
npm run deploy
```

> **Note:** Ensure your GitHub Repository settings have "Pages" enabled, and it is configured to point toward the `gh-pages` branch. 

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

* [React](https://react.dev/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Framer Motion](https://www.framer.com/motion/)
* [Monaco Editor](https://microsoft.github.io/monaco-editor/)
* [Reveal.js](https://revealjs.com/)

---
*Built with ❤️ by Yashwant*
