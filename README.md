# C++ STL in Compiler Design

Modern interactive frontend app built with React, Tailwind CSS, Reveal.js, and Monaco Editor.

## Run

```bash
npm install
npm start
```

## Build

```bash
npm run build
```

## Flow

`Landing -> Quiz -> Result -> Slides -> Code Demo`

## Features

- VS Code style dark UI
- 20-question quiz (30s timer, score tracking, auto-next)
- Per-question explanation feedback
- Timer-end visual + sound alert
- Result screen with performance message
- Local leaderboard (stored in browser localStorage)
- Reveal.js presentation mode with 6 slides
- Monaco code viewer with switchable C++ STL demos
- Responsive layout with smooth motion transitions

## Project Structure

```text
project/
  src/
    components/
      CodeViewer.jsx
      Navbar.jsx
      QuestionCard.jsx
      SlideWrapper.jsx
      Timer.jsx
    data/
      codeExamples.js
      quizQuestions.js
      slidesContent.js
    sections/
      CodeDemoSection.jsx
      LandingPage.jsx
      QuizSection.jsx
      ResultSection.jsx
      SlidesSection.jsx
    App.jsx
    index.css
    main.jsx
  index.html
  package.json
  tailwind.config.js
  postcss.config.js
  vite.config.js
```
