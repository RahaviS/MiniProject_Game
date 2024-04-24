import {useState} from 'react'
import Modal from 'react-modal'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'
import EmojiCard from '../EmojiCard'
import Navbar from '../Navbar'
import EmojiResult from '../EmojiResult'
import './index.css'

const gameStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  gameOver: 'GAME_OVER',
}

const emojisList = [
  {
    id: 0,
    emojiName: 'Face with stuck out tongue',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-img.png',
  },
  {
    id: 1,
    emojiName: 'Face with head bandage',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-head-bandage-img.png',
  },
  {
    id: 2,
    emojiName: 'Face with hugs',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-hugs-img.png',
  },
  {
    id: 3,
    emojiName: 'Face with laughing',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-img.png',
  },
  {
    id: 4,
    emojiName: 'Laughing face with hand in front of mouth',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-with-hand-infront-mouth-img.png',
  },
  {
    id: 5,
    emojiName: 'Face with mask',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-mask-img.png',
  },
  {
    id: 6,
    emojiName: 'Face with silence',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-silence-img.png',
  },
  {
    id: 7,
    emojiName: 'Face with stuck out tongue and winked eye',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-and-winking-eye-img.png',
  },
  {
    id: 8,
    emojiName: 'Grinning face with sweat',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/grinning-face-with-sweat-img.png',
  },
  {
    id: 9,
    emojiName: 'Smiling face with heart eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-heart-eyes-img.png',
  },
  {
    id: 10,
    emojiName: 'Grinning face',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/grinning-face-img.png',
  },
  {
    id: 11,
    emojiName: 'Smiling face with star eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-star-eyes-img.png',
  },
]

const EmojiHome = props => {
  const [gameStatus, setGameStatus] = useState({
    status: gameStatusConstants.initial,
    isPlaying: false,
    topScore: 0,
  })
  const [clickedId, setClickedId] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false)

  const {topScore, isPlaying, status} = gameStatus

  const playAgain = () => {
    setGameStatus(prevState => ({
      ...prevState,
      isPlaying: true,
      status: gameStatusConstants.inProgress,
    }))
    setClickedId([])
  }

  const onStartPlaying = () => {
    setGameStatus(prevState => ({
      ...prevState,
      isPlaying: true,
      status: gameStatusConstants.inProgress,
    }))
  }

  const onClickBack = () => {
    const {history} = props
    history.replace('/')
  }

  const updateScore = currentScore => {
    if (currentScore > topScore) {
      setGameStatus({
        topScore: currentScore,
        isPlaying: false,
        status: gameStatusConstants.gameOver,
      })
    } else {
      setGameStatus(prevState => ({
        ...prevState,
        isPlaying: false,
        status: gameStatusConstants.gameOver,
      }))
    }
  }

  const onClickEmoji = id => {
    if (clickedId.includes(id)) {
      updateScore(clickedId.length)
    } else {
      if (clickedId.length === emojisList.length - 1) {
        updateScore(emojisList.length)
      }
      setClickedId(prevState => [...prevState, id])
    }
  }

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  const renderEmojis = () => {
    const shuffledEmojisList = emojisList.sort(() => Math.random() - 0.5)
    return (
      <ul className="emojis-container">
        {shuffledEmojisList.map(eachEmoji => (
          <EmojiCard
            emojiDetails={eachEmoji}
            onClickEmoji={onClickEmoji}
            key={eachEmoji.id}
          />
        ))}
      </ul>
    )
  }
  const renderRules = () => (
    <>
      <h1 className="rules-title">Rules</h1>
      <ul className="rules-list">
        <li className="rule-item">
          User should be able to see the list of Emojis
        </li>
        <li className="rule-item">
          When the user clicks any one of the Emoji for the First time, then the
          count of the score should be incremented by 1 and the List of Emoji
          cards should be shuffled.
        </li>
        <li className="rule-item">
          This process should be repeated every time the user clicks on an Emoji
          card
        </li>
        <li className="rule-item">
          When the user clicks on all Emoji cards without clicking any of it
          twice, then the user will win the game.
        </li>
        <li className="rule-item">
          When the user clicks on the same Emoji for the second time, then the
          user will lose the game.
        </li>
        <li className="rule-item">
          Once the game is over, the user will be redirected to the results
          page.
        </li>
      </ul>
    </>
  )

  const renderModal = () => (
    <>
      <button type="button" className="rules-button" onClick={openModal}>
        Rules
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="emoji-rules-Modal"
        ariaHideApp={false}
      >
        <button
          type="button"
          onClick={closeModal}
          aria-label="close"
          data-testid="close"
          className="trigger-button"
        >
          <CgClose />
        </button>
        {renderRules()}
      </Modal>
    </>
  )

  const renderRulesContainer = () => (
    <div className="rules-container">
      <div className="emoji-img-section">
        <img
          className="home-page-image"
          src="https://res.cloudinary.com/dktojjeva/image/upload/v1712754848/Asset_1_4x_1_cj5ixp.png"
          alt="emoji game"
        />
        <h1 className="emoji-game-heading">Emoji Game</h1>
      </div>
      <div className="text-container">
        {renderRules()}
        <button className="start-button" type="button" onClick={onStartPlaying}>
          Start playing
        </button>
      </div>
    </div>
  )

  const renderResults = () => (
    <EmojiResult score={clickedId.length} onClickPlayAgain={playAgain} />
  )

  const renderChoices = () => {
    switch (status) {
      case gameStatusConstants.initial:
        return renderRulesContainer()
      case gameStatusConstants.inProgress:
        return renderEmojis()
      case gameStatusConstants.gameOver:
        return renderResults()
      default:
        return null
    }
  }

  return (
    <div className="bg-container">
      {status !== gameStatusConstants.initial && (
        <Navbar
          topScore={topScore}
          score={clickedId.length}
          gameStatus={status}
        />
      )}
      <div className="menu-container">
        <button
          type="button"
          className="back-icon-container"
          onClick={onClickBack}
        >
          <BiArrowBack color="#334155" size={25} />
          <p className="back-text">Back</p>
        </button>
        {isPlaying && renderModal()}
      </div>
      <div className="app-container">{renderChoices()}</div>
    </div>
  )
}

export default EmojiHome
