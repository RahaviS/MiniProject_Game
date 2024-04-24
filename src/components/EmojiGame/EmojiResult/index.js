import './index.css'

const EmojiResult = props => {
  const {score, onClickPlayAgain} = props
  const imgUrl =
    score === 12
      ? 'https://res.cloudinary.com/dktojjeva/image/upload/v1709216318/Win_xrrw07.png'
      : 'https://res.cloudinary.com/dktojjeva/image/upload/v1709216318/Lose_1_k0srbz.png'
  const winOrLoseText = score === 12 ? 'You Won' : 'You Lose'
  const imgAltText = score === 12 ? 'won' : 'lose'
  const scoreText = score === 12 ? 'Best Score' : 'Score'

  return (
    <div className="results-container">
      <div className="result-contents">
        <h1 className="emoji-result-text">{winOrLoseText}</h1>
        <p className="best-score-text">{scoreText}</p>
        <p className="emoji-final-score">{score}/12</p>
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
export default EmojiResult
