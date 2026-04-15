import { useEffect, useState } from 'react'

const QUESTION_TIME = 20

function Timer({ questionIndex, onTimeUp }) {
  const [secondsLeft, setSecondsLeft] = useState(QUESTION_TIME)

  useEffect(() => {
    setSecondsLeft(QUESTION_TIME)
  }, [questionIndex])

  useEffect(() => {
    if (secondsLeft === 0) {
      onTimeUp()
      return undefined
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(intervalId)
  }, [secondsLeft, onTimeUp])

  const percent = (secondsLeft / QUESTION_TIME) * 100
  const isCritical = secondsLeft <= 5

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-slate-400">Time Left</span>
        <span className={isCritical ? 'font-bold text-red-400' : 'text-cyan-300'}>{secondsLeft}s</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${
            isCritical ? 'bg-red-500' : 'bg-cyan-400'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

export default Timer
