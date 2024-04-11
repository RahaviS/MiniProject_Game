import './index.css'

const WinOrLoseCard = props => {
  const {score, onClickPlayAgain} = props
  const imgUrl =
    score === 12
      ? 'https://res.cloudinary.com/dktojjeva/image/upload/v1709216318/Win_xrrw07.png'
      : 'https://res.cloudinary.com/dktojjeva/image/upload/v1709216318/Lose_1_k0srbz.png'
  const winOrLoseText = score === 12 ? 'You Won' : 'You Lose'
  const imgAltText = score === 12 ? 'won' : 'lose'

  return (
    <div className="results-container">
      <div className="result-contents">
        <h1 className="result-text">{winOrLoseText}</h1>
        <p className="best-score-text">Best Score</p>
        <p className="final-score">{score}/12</p>
        <button
          className="play-again-button"
          type="button"
          onClick={onClickPlayAgain}
        >
          Play Again
        </button>
      </div>
      <img src={imgUrl} alt={imgAltText} className="emoji-result-img" />
    </div>
  )
}
export default WinOrLoseCard
