function ResultSection({ result, leaderboard, onRestartQuiz, onContinue }) {
  const percentage = Math.round((result.score / result.total) * 100)
  let message = 'Great effort. Keep practicing STL patterns in compiler use-cases.'
  if (percentage >= 80) message = 'Excellent. You are presentation-ready.'
  else if (percentage >= 60) message = 'Good job. One more revision and you are strong.'

  return (
    <section className="space-y-6">
      <div className="glass-card p-8 text-center sm:p-10">
        <h2 className="text-3xl font-bold text-white">Quiz Result</h2>
        <p className="mt-4 text-xl text-cyan-300">
          {result.score} / {result.total}
        </p>
        <p className="mt-2 text-slate-300">{message}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" className="btn-secondary" onClick={onRestartQuiz}>
            Restart Quiz
          </button>
          <button type="button" className="btn-primary" onClick={onContinue}>
            Continue to Slides
          </button>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="mb-3 text-lg font-semibold text-cyan-200">Leaderboard (Local)</h3>
        {leaderboard.length === 0 ? (
          <p className="text-slate-400">No attempts yet.</p>
        ) : (
          <ol className="space-y-2">
            {leaderboard.map((entry, index) => (
              <li key={`${entry.date}-${index}`} className="rounded-lg bg-slate-800/80 px-4 py-3 text-sm sm:text-base">
                #{index + 1} - {entry.score}/{entry.total} on {entry.date}
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}

export default ResultSection
