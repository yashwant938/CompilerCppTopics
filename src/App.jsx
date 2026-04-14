import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimationSection from './sections/AnimationSection'
import Navbar from './components/Navbar'
import CodeDemoSection from './sections/CodeDemoSection'
import LandingPage from './sections/LandingPage'
import QuizSection from './sections/QuizSection'
import ResultSection from './sections/ResultSection'
import SlidesSection from './sections/SlidesSection'
import ChatBot from './components/ChatBot'

const STAGES = {
  LANDING: 'landing',
  QUIZ: 'quiz',
  RESULT: 'result',
  SLIDES: 'slides',
  CODE: 'code',
  ANIMATION: 'animation'
}

const LEADERBOARD_KEY = 'stl-compiler-leaderboard'

function App() {
  const [stage, setStage] = useState(STAGES.LANDING)
  const [quizResult, setQuizResult] = useState({ score: 0, total: 20 })
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem(LEADERBOARD_KEY)
    if (saved) {
      setLeaderboard(JSON.parse(saved))
    }
  }, [])

  const handleQuizEnd = (result) => {
    setQuizResult(result)
    const entry = {
      score: result.score,
      total: result.total,
      date: new Date().toLocaleString()
    }
    const updated = [...leaderboard, entry].sort((a, b) => b.score - a.score).slice(0, 5)
    setLeaderboard(updated)
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(updated))
    setStage(STAGES.RESULT)
  }

  const activeView = useMemo(() => {
    switch (stage) {
      case STAGES.QUIZ:
        return <QuizSection onQuizEnd={handleQuizEnd} />
      case STAGES.RESULT:
        return (
          <ResultSection
            result={quizResult}
            leaderboard={leaderboard}
            onRestartQuiz={() => setStage(STAGES.QUIZ)}
            onContinue={() => setStage(STAGES.SLIDES)}
          />
        )
      case STAGES.SLIDES:
        return <SlidesSection onContinue={() => setStage(STAGES.CODE)} />
      case STAGES.CODE:
        return <CodeDemoSection onContinue={() => setStage(STAGES.ANIMATION)} />
      case STAGES.ANIMATION:
        return <AnimationSection />
      case STAGES.LANDING:
      default:
        return <LandingPage onStart={() => setStage(STAGES.QUIZ)} onExploreSlides={() => setStage(STAGES.SLIDES)} />
    }
  }, [stage, quizResult, leaderboard])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar currentStage={stage} onNavigate={setStage} stages={STAGES} />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-24 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {activeView}
          </motion.div>
        </AnimatePresence>
      </main>
      <ChatBot />
    </div>
  )
}

export default App
