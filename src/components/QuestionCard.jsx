function QuestionCard({ question, selectedAnswer, onSelectAnswer, showFeedback }) {
  return (
    <div className="glass-card p-6 sm:p-8">
      <h2 className="mb-6 text-xl font-semibold text-slate-100 sm:text-2xl">{question.question}</h2>
      <div className="grid gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option
          const isCorrect = question.correctAnswer === option
          const label = `${String.fromCharCode(65 + index)}. ${option}`

          let styleClass = 'border-slate-700 bg-slate-900 hover:border-cyan-500/60'
          if (showFeedback && isCorrect) styleClass = 'border-emerald-500 bg-emerald-600/20'
          if (showFeedback && isSelected && !isCorrect) styleClass = 'border-red-500 bg-red-600/20'

          return (
            <button
              key={option}
              type="button"
              disabled={showFeedback}
              onClick={() => onSelectAnswer(option)}
              className={`rounded-xl border px-4 py-3 text-left text-sm text-slate-100 transition sm:text-base ${styleClass}`}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default QuestionCard
