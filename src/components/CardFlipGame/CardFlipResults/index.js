import './index.css'

const CardFlipResults = props => {
  const {score, noOfFlips, onClickPlayAgain} = props
  const onClickEvent = () => {
    onClickPlayAgain()
  }
  const resultImage =
    score === 10
      ? 'https://res.cloudinary.com/dktojjeva/image/upload/v1712062142/2x_e5wg5z.png'
      : 'https://res.cloudinary.com/dktojjeva/image/upload/v1712062142/wd5xxasgturbzd5vjgvt.png'
  const greetText =
    score === 10
      ? 'You matched all of the cards in record time'
      : 'You did not match all of the cards in record time'
  const altText = score === 10 ? 'grinning face with big eyes' : 'neutral face'

  const greetMsg = score === 10 ? 'Congratulations!' : 'Better luck next time!'
  return (
    <div className="card-flip-result-container">
      <img src={resultImage} alt={altText} className="result_avatar_img" />
      <h1 className="result-heading">{greetMsg}</h1>
      <p className="total-flips">{`No.of Flips - ${noOfFlips} `}</p>
      <h1 className="result-text">{greetText}</h1>
      <button
        onClick={onClickEvent}
        type="button"
        className="card-flip-play-again"
      >
        Play Again
      </button>
    </div>
  )
}
export default CardFlipResults
