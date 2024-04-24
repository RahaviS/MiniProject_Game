import {useState} from 'react'
import Modal from 'react-modal'
import {CgClose} from 'react-icons/cg'
import {BiArrowBack} from 'react-icons/bi'
import RPSElements from '../RPSElements'
import RPSResult from '../RPSResult'
import './index.css'

const choicesList = [
  {
    id: 'rock',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'scissor',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'paper',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]
const rpsConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  gameOver: 'GAME_OVER',
}

const RPS = props => {
  const [gameData, setGameData] = useState({
    rpsGameStatus: rpsConstants.initial,
    message: null,
    myChoice: {},
    computerChoice: {},
    score: 0,
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)

  const {rpsGameStatus, message, myChoice, computerChoice, score} = gameData

  const renderRPSRules = () => (
    <div className="rps-rules">
      <h1 className="rps-rules-text">Rules</h1>
      <ul className="rules-list-rps">
        <li className="rule-item-rps">
          The game result should be based on user and user opponent choices
        </li>
        <li className="rule-item-rps">
          When the user choice is rock and his opponent choice is rock then the
          result will be IT IS DRAW
        </li>
        <li className="rule-item-rps">
          When the user choice is paper and his opponent choice is rock then the
          result will be YOU WON
        </li>
        <li className="rule-item-rps">
          When the user choice is a scissor and his opponent choice is rock then
          the result will be YOU LOSE
        </li>
        <li className="rule-item-rps">
          When the user choice is paper and his opponent choice is paper then
          the result will be IT IS DRAW
        </li>
        <li className="rule-item-rps">
          When the user choice is scissors and his opponent choice is paper then
          the result will be YOU WON
        </li>
        <li className="rule-item-rps">
          When the user choice is rock and his opponent choice is scissors then
          the result will be YOU WON
        </li>
        <li className="rule-item-rps">
          When the user choice is paper and his opponent choice is scissors then
          the result will be YOU LOSE
        </li>
        <li className="rule-item-rps">
          When the user choice is scissors and his opponent choice is scissors
          then the result will be IT IS DRAW
        </li>
        <li className="rule-item-rps">
          When the result is YOU WON, then the count of the score should be
          incremented by 1
        </li>
        <li className="rule-item-rps">
          When the result is IT IS DRAW, then the count of the score should be
          the same
        </li>
        <li className="rule-item-rps">
          When the result is YOU LOSE, then the count of the score should be
          decremented by 1.
        </li>
      </ul>
    </div>
  )

  const onStartPlaying = () => {
    setIsPlaying(true)
    setGameData(prevState => ({
      ...prevState,
      rpsGameStatus: rpsConstants.inProgress,
    }))
  }

  const renderRulesContainer = () => (
    <div className="rps-rules-container">
      <img
        className="rps-home-image"
        src="https://res.cloudinary.com/dktojjeva/image/upload/v1709187224/Group_7469_xycjo2.png"
        alt="rock paper scissor"
      />
      {renderRPSRules()}
      <button
        className="rps-start-button"
        type="button"
        onClick={onStartPlaying}
      >
        Start playing
      </button>
    </div>
  )

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  const renderModal = () => (
    <>
      <button type="button" className="rps-rules-button" onClick={openModal}>
        Rules
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="rps-rules-Modal"
        ariaHideApp={false}
      >
        <button
          type="button"
          onClick={closeModal}
          aria-label="close"
          data-testid="close"
          className="rps-trigger-button"
        >
          <CgClose />
        </button>
        {renderRPSRules()}
      </Modal>
    </>
  )

  const updateScore = (choiceOne, choiceTwo) => {
    if (choiceOne[0] === 'rock') {
      switch (choiceTwo.id) {
        case 'paper':
          return 'YOU LOSE'
        case 'scissor':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    } else if (choiceOne[0] === 'paper') {
      switch (choiceTwo.id) {
        case 'scissor':
          return 'YOU LOSE'
        case 'rock':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    } else {
      switch (choiceTwo.id) {
        case 'rock':
          return 'YOU LOSE'
        case 'paper':
          return 'YOU WON'
        default:
          return 'IT IS DRAW'
      }
    }
  }

  const onClickIcon = (id, image) => {
    const randomSelection = Math.floor(Math.random() * choicesList.length)
    const choiceOne = [id, image]
    const choiceTwo = choicesList[randomSelection]
    const getScore = updateScore(choiceOne, choiceTwo)
    let newScore = score
    if (getScore === 'YOU WON') {
      newScore = score + 1
    } else if (getScore === 'YOU LOSE') {
      newScore = score - 1
    }
    setGameData({
      myChoice: choiceOne,
      computerChoice: choiceTwo,
      score: newScore,
      message: getScore,
      rpsGameStatus: rpsConstants.gameOver,
    })
  }

  const renderRpsGame = () => (
    <>
      <h1 className="rps-elements-heading">Lets pick</h1>
      <ul className="rps-elements-container">
        {choicesList.map(each => (
          <RPSElements
            rpsElement={each}
            key={each.id}
            onClickIcon={onClickIcon}
          />
        ))}
      </ul>
    </>
  )

  const renderRpsResults = () => (
    <RPSResult
      message={message}
      myChoice={myChoice}
      computerChoice={computerChoice}
      score={score}
      onClickPlayAgain={onStartPlaying}
    />
  )

  const renderRpsChoices = () => {
    switch (rpsGameStatus) {
      case rpsConstants.initial:
        return renderRulesContainer()
      case rpsConstants.inProgress:
        return renderRpsGame()
      case rpsConstants.gameOver:
        return renderRpsResults()
      default:
        return null
    }
  }

  const onClickBack = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="rps-bg-container">
      <div className="rps-menu">
        <button
          type="button"
          className="rps-backIcon-container"
          onClick={onClickBack}
        >
          <BiArrowBack size={25} color="#ffffff" />
          <p className="rps-back-text">Back</p>
        </button>
        {isPlaying && renderModal()}
      </div>
      <h1 className="rps-heading">Rock Paper Scissor</h1>
      <div className="rps-app-container">{renderRpsChoices()}</div>
    </div>
  )
}
export default RPS
