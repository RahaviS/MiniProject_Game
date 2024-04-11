import './index.css'

const RPSResult = props => {
  const {message, myChoice, computerChoice, score, onClickPlayAgain} = props

  const getEmojiImage = () => {
    switch (message) {
      case 'YOU WON':
        return 'https://res.cloudinary.com/dktojjeva/image/upload/v1709312532/Group_7618_1_n05oty.png'
      case 'YOU LOSE':
        return 'https://res.cloudinary.com/dktojjeva/image/upload/v1709312532/Group_7618_2_xc2c3l.png'
      case 'IT IS DRAW':
        return 'https://res.cloudinary.com/dktojjeva/image/upload/v1709312532/Group_7618_dij0o0.png'
      default:
        return null
    }
  }

  const getSmileyImage = () => {
    switch (message) {
      case 'YOU WON':
        return 'https://res.cloudinary.com/dktojjeva/image/upload/v1709312532/Emoji_ynpocn.png'
      case 'YOU LOSE':
        return 'https://res.cloudinary.com/dktojjeva/image/upload/v1709312532/Emoji_1_afvqbv.png'
      case 'IT IS DRAW':
        return 'https://res.cloudinary.com/dktojjeva/image/upload/v1709312532/Emoji_2_zckp8g.png'
      default:
        return null
    }
  }

  const getEmojiAltText = () => {
    switch (message) {
      case 'YOU WON':
        return 'won emoji'
      case 'YOU LOSE':
        return 'lose emoji'
      case 'IT IS DRAW':
        return 'draw emoji'
      default:
        return null
    }
  }

  const getSmileyAltText = () => {
    switch (message) {
      case 'YOU WON':
        return 'Smiling face with star eyes'
      case 'YOU LOSE':
        return 'Face without mouth'
      case 'IT IS DRAW':
        return 'Face without mouth'
      default:
        return null
    }
  }

  const emojiImgUrl = getEmojiImage()
  const smileyUrl = getSmileyImage()
  const emojiAltText = getEmojiAltText()
  const smileyAltText = getSmileyAltText()

  return (
    <div className="rps-results-container">
      <div className="result-top-section">
        <h1 className="results-view-heading">Rock Paper Scissor</h1>
        <img src={emojiImgUrl} alt={emojiAltText} className="result-image" />
        <div className="score-section">
          <p className="score-text">Score</p>
          <p className="score">{score}</p>
        </div>
      </div>
      <div className="mid-section">
        <p className="player-text">You</p>
        <p className="player-text">Opponent</p>
      </div>
      <div className="status-section">
        <img className="choice-image" src={myChoice[1]} alt={myChoice[0]} />
        <div className="center-content">
          <img className="smiley-icon" src={smileyUrl} alt={smileyAltText} />
          <p className="message">{message}</p>
          <button
            type="button"
            className="rps-play-again-button"
            onClick={onClickPlayAgain}
          >
            Play Again
          </button>
        </div>
        <img
          className="choice-image"
          src={computerChoice.imageUrl}
          alt={computerChoice.id}
        />
      </div>
    </div>
  )
}

export default RPSResult
