import { useCallback, useMemo, useState } from 'react'
import QuestionCard from '../components/QuestionCard'
import Timer from '../components/Timer'
import { quizQuestions } from '../data/quizQuestions'

function QuizSection({ onQuizEnd }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [timeoutTriggered, setTimeoutTriggered] = useState(false)

  const currentQuestion = quizQuestions[currentIndex]
  const progressText = `Question ${currentIndex + 1}/${quizQuestions.length}`
  const progressPercent = ((currentIndex + 1) / quizQuestions.length) * 100

  const nextQuestion = useCallback(() => {
    if (currentIndex === quizQuestions.length - 1) {
      onQuizEnd({ score, total: quizQuestions.length })
      return
    }
    setCurrentIndex((prev) => prev + 1)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setTimeoutTriggered(false)
  }, [currentIndex, score, onQuizEnd])

  const playAlert = () => {
    const audioContext = new window.AudioContext()
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()
    oscillator.type = 'square'
    oscillator.frequency.value = 520
    gain.gain.value = 0.06
    oscillator.connect(gain)
    gain.connect(audioContext.destination)
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.18)
  }

  const handleSelectAnswer = (option) => {
    if (showFeedback) return
    setSelectedAnswer(option)
    setShowFeedback(true)
    if (option === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1)
    }
    window.setTimeout(nextQuestion, 1400)
  }

  const handleTimeUp = useCallback(() => {
    if (showFeedback) return
    setTimeoutTriggered(true)
    setShowFeedback(true)
    playAlert()
    window.setTimeout(nextQuestion, 1400)
  }, [showFeedback, nextQuestion])

  const feedbackMessage = useMemo(() => {
    if (!showFeedback) return ''
    if (timeoutTriggered) return `Time's up. ${currentQuestion.explanation}`
    if (selectedAnswer === currentQuestion.correctAnswer) return `Correct. ${currentQuestion.explanation}`
    return `Not quite. ${currentQuestion.explanation}`
  }, [showFeedback, timeoutTriggered, selectedAnswer, currentQuestion])

  return (
    <section className="space-y-6">
      <div className="glass-card p-5">
        <div className="mb-3 flex items-center justify-between text-sm sm:text-base">
          <span className="font-medium text-cyan-300">{progressText}</span>
          <span className="font-medium text-slate-300">Score: {score}</span>
        </div>
        <div className="mb-4 h-2 rounded-full bg-slate-800">
          <div className="h-2 rounded-full bg-cyan-400 transition-all" style={{ width: `${progressPercent}%` }} />
        </div>
        <Timer questionIndex={currentIndex} onTimeUp={handleTimeUp} />
      </div>

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={handleSelectAnswer}
        showFeedback={showFeedback}
      />

      {showFeedback && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm sm:text-base ${
            timeoutTriggered
              ? 'border-amber-400/50 bg-amber-500/10 text-amber-200'
              : selectedAnswer === currentQuestion.correctAnswer
                ? 'border-emerald-400/50 bg-emerald-500/10 text-emerald-200'
                : 'border-red-400/50 bg-red-500/10 text-red-200'
          }`}
        >
          {feedbackMessage}
        </div>
      )}
    </section>
  )
}

export default QuizSection
