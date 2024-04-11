import {useState} from 'react'
import Popup from 'reactjs-popup'
import {CgClose} from 'react-icons/cg'
import {BiArrowBack} from 'react-icons/bi'
import RPSElements from '../RPSElements'
import RPSResult from '../RPSResult'
import './index.css'

const choicesList = [
  {
    id: 'rock',
    imageUrl:
      'https://res.cloudinary.com/dktojjeva/image/upload/v1709304576/Rock_h2ez62.png',
  },
  {
    id: 'scissor',
    imageUrl:
      'https://res.cloudinary.com/dktojjeva/image/upload/v1709304576/Scissor_asr6sx.png',
  },
  {
    id: 'paper',
    imageUrl:
      'https://res.cloudinary.com/dktojjeva/image/upload/v1709304576/Paper_kfqxzt.png',
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

  const {rpsGameStatus, message, myChoice, computerChoice, score} = gameData

  const renderRules = () => (
    <div className="rps-rules">
      <h1 className="rps-rules-text">Rules</h1>
      <div className="rules-list-container">
        <ul className="rps-rules-list">
          <li className="rps-rule-item">
            The game result should be based on user and user opponent choices
          </li>
          <li className="rps-rule-item">
            When the user choice is Rock and his opponent choice is rock then
            the result will be <span>IT IS DRAW</span>
          </li>
          <li className="rps-rule-item">
            When the user choice is paper and his opponent choice is rock then
            the result will be <span>YOU WON</span>
          </li>
          <li className="rps-rule-item">
            When the user choice is a scissor and his opponent choice is rock
            then the result will be <span>YOU LOSE</span>
          </li>
          <li className="rps-rule-item">
            When the user choice is paper and his opponent choice is paper then
            the result will be <span>IT IS DRAW</span>
          </li>
          <li className="rps-rule-item">
            When the user choice is scissors and his opponent choice is paper
            then the result will be <span>YOU WON</span>
          </li>
        </ul>
        <ul className="rps-rules-list">
          <li className="rps-rule-item">
            When the user choice is rock and his opponent choice is scissors
            then the result will be <span>YOU WON</span>
          </li>
          <li className="rps-rule-item">
            When the user choice is paper and his opponent choice is scissors
            then the result will be <span>YOU LOSE</span>
          </li>
          <li className="rps-rule-item">
            When the user choice is scissors and his opponent choice is scissors
            then the result will be <span>IT IS DRAW</span>
          </li>
          <li className="rps-rule-item">
            When the result is <span>YOU WON</span>, then the count of the score
            should be incremented by 1
          </li>
          <li className="rps-rule-item">
            When the result is <span>IT IS DRAW</span>, then the count of the
            score should be the same
          </li>
          <li className="rps-rule-item">
            When the result is <span>YOU LOSE</span>, then the count of the
            score should be decremented by 1.
          </li>
        </ul>
      </div>
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
    <>
      <img
        className="rps-home-image"
        src="https://res.cloudinary.com/dktojjeva/image/upload/v1709187224/Group_7469_xycjo2.png"
        alt="rock paper scissor"
      />
      <div className="rps-rules-container">
        {renderRules()}

        <button
          className="rps-start-button"
          type="button"
          onClick={onStartPlaying}
        >
          Start playing
        </button>
      </div>
    </>
  )

  const renderModal = () => (
    <div className="rps-popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="rps-rules-button">
            Rules
          </button>
        }
      >
        {close => (
          <div className="rps-modal-container">
            <button
              type="button"
              aria-label="close"
              className="trigger-button"
              data-testid="close"
              onClick={() => close()}
            >
              <CgClose />
            </button>
            <div className="text-container">{renderRules()}</div>
          </div>
        )}
      </Popup>
    </div>
  )

  const updateScore = (id, image) => {
    const randomSelection = Math.floor(Math.random() * choicesList.length)
    if (id === choicesList[randomSelection].id) {
      setGameData(prevState => ({
        ...prevState,
        myChoice: [id, image],
        computerChoice: choicesList[randomSelection],
        message: 'IT IS DRAW',
        rpsGameStatus: rpsConstants.gameOver,
      }))
    } else if (id === 'rock' && choicesList[randomSelection].id === 'scissor') {
      setGameData(prevState => ({
        myChoice: [id, image],
        computerChoice: choicesList[randomSelection],
        score: prevState.score + 1,
        message: 'YOU WON',
        rpsGameStatus: rpsConstants.gameOver,
      }))
    } else if (id === 'rock' && choicesList[randomSelection].id === 'paper') {
      setGameData(prevState => ({
        myChoice: [id, image],
        computerChoice: choicesList[randomSelection],
        score: prevState.score - 1,
        message: 'YOU LOSE',
        rpsGameStatus: rpsConstants.gameOver,
      }))
    } else if (id === 'scissor' && choicesList[randomSelection].id === 'rock') {
      setGameData(prevState => ({
        myChoice: [id, image],
        computerChoice: choicesList[randomSelection],
        score: prevState.score - 1,
        message: 'YOU LOSE',
        rpsGameStatus: rpsConstants.gameOver,
      }))
    } else if (
      id === 'scissor' &&
      choicesList[randomSelection].id === 'paper'
    ) {
      setGameData(prevState => ({
        myChoice: [id, image],
        computerChoice: choicesList[randomSelection],
        score: prevState.score + 1,
        message: 'YOU WON',
        rpsGameStatus: rpsConstants.gameOver,
      }))
    } else if (id === 'paper' && choicesList[randomSelection].id === 'rock') {
      setGameData(prevState => ({
        myChoice: [id, image],
        computerChoice: choicesList[randomSelection],
        score: prevState.score + 1,
        message: 'YOU WON',
        rpsGameStatus: rpsConstants.gameOver,
      }))
    } else if (
      id === 'paper' &&
      choicesList[randomSelection].id === 'scissor'
    ) {
      setGameData(prevState => ({
        myChoice: [id, image],
        computerChoice: choicesList[randomSelection],
        score: prevState.score - 1,
        message: 'YOU LOSE',
        rpsGameStatus: rpsConstants.gameOver,
      }))
    }
  }

  const renderRpsGame = () => (
    <>
      <p className="rps-elements-heading">Let’s pick</p>
      <ul className="rps-elements-container">
        {choicesList.map(each => (
          <RPSElements
            rpsElement={each}
            key={each.id}
            onClickIcon={updateScore}
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
