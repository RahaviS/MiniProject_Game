import {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import Popup from 'reactjs-popup'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'
import CardItem from '../CardItem'
import CardFlipResults from '../CardFlipResults'
import './index.css'

const cardFlipConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  gameOver: 'GAME_OVER',
}

const cardsData = [
  {
    name: 'tiger',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-tiger-img.png',
  },
  {
    name: 'lion',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-lion-img.png',
  },
  {
    name: 'rat',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-rat-img.png',
  },
  {
    name: 'hen',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-hen-img.png',
  },
  {
    name: 'elephant',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-elephant-img.png',
  },
  {
    name: 'buffalo',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-buffalo-img.png',
  },
  {
    name: 'goat',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-goat-img.png',
  },
  {
    name: 'zebra',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-zebra-img.png',
  },
  {
    name: 'duck',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-duck-img.png',
  },
  {
    name: 'pigeon',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-pigeon-img.png',
  },
]

const CardFlipHome = props => {
  const [cardFlipGameStatus, setCarFlipGameStatus] = useState(
    cardFlipConstants.initial,
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [cardsArray, setCardsArray] = useState([])
  const [cardOne, setCardOne] = useState(null)
  const [cardTwo, setCardTwo] = useState(null)
  const [clickedCards, setClickedCards] = useState([])
  const [score, setScore] = useState(0)
  const [minutes, setMinutes] = useState(2)
  const [seconds, setSeconds] = useState(0)

  const shuffleCards = () => {
    const mergedCardsData = [...cardsData, ...cardsData]
    const shuffledCards = mergedCardsData.sort(() => Math.random() - 0.5)
    const newCardsData = shuffledCards.map(eachCard => ({
      ...eachCard,
      id: uuidv4(),
      matched: false,
    }))
    setCardsArray(newCardsData)
  }

  const removeSelection = () => {
    setCardOne(null)
    setCardTwo(null)
  }

  useEffect(() => {
    if (cardOne !== null && cardTwo !== null) {
      if (cardOne.name === cardTwo.name) {
        console.log('sameCard selected')
        setCardsArray(prevState =>
          prevState.map(eachCard => {
            if (eachCard.name === cardOne.name) {
              return {...eachCard, matched: true}
            }
            return eachCard
          }),
        )
        setScore(prevScore => prevScore + 1)
        removeSelection()
      } else {
        setTimeout(() => {
          removeSelection()
        }, 2000)
      }
    }
  }, [cardOne, cardTwo])

  let timerId

  useEffect(() => {
    if (score === 10) {
      setIsPlaying(false)
      setCarFlipGameStatus(cardFlipConstants.gameOver)
    }
  }, [score])

  const updateTime = () => {
    setSeconds(prevState => prevState + 1)
  }

  const startTimer = () => {
    timerId = setInterval(updateTime, 1000)
  }

  const onStartPlaying = () => {
    startTimer()
    shuffleCards()
    setCarFlipGameStatus(cardFlipConstants.inProgress)
    setIsPlaying(true)
    setMinutes(2)
    setSeconds(0)
    setClickedCards([])
    setScore(0)
  }

  const renderRules = () => (
    <div className="card-flip-rules">
      <h1 className="card-flip-rules-text">Rules</h1>
      <div className="card-flip-rules-list-container">
        <ul className="card-flip-rules-list">
          <li className="card-flip-rule-item">
            When the game is started, the users should be able to see the list
            of Cards that are shuffled and turned face down.
          </li>
          <li className="card-flip-rule-item">
            When a user starts the game, the user should be able to see the
            Timer running.
          </li>
          <li className="card-flip-rule-item">
            The Timer starts from 2 Minutes.
          </li>
          <li className="card-flip-rule-item">
            If the two cards have the same image, they remain face up. If not,
            they should be flipped face down again after a short 2 seconds.
          </li>
        </ul>
        <ul className="card-flip-rules-list">
          <li className="card-flip-rule-item">
            Users should be able to compare only two cards at a time.
          </li>
          <li className="card-flip-rule-item">
            When the user is not able to find all the cards before the timer
            ends then the game should end and redirect to the Time Up Page.
          </li>
          <li className="card-flip-rule-item">
            If the user finds all the matching cards before the timer ends, then
            the user should be redirected to the results page.
          </li>
        </ul>
      </div>
    </div>
  )

  const renderCardFlipRules = () => (
    <>
      <img
        src="https://res.cloudinary.com/dktojjeva/image/upload/v1709187216/animals_b71o81.png"
        alt="card flip game"
        className="card-flip-home-image"
      />
      <div className="card-flip-rules-container">
        {renderRules()}
        <button
          className="card-flip-start-button"
          type="button"
          onClick={onStartPlaying}
        >
          Start Playing
        </button>
      </div>
    </>
  )

  const renderModal = () => (
    <div className="card-flip-popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="card-flip-rules-button">
            Rules
          </button>
        }
      >
        {close => (
          <div className="card-flip-modal-container">
            <button
              type="button"
              aria-label="close"
              data-testid="close"
              className="close-button"
              onClick={() => close()}
            >
              <CgClose />
            </button>
            <div className="card-flip-text-container">{renderRules()}</div>
          </div>
        )}
      </Popup>
    </div>
  )

  const renderCardFlipResults = () => (
    <>
      <CardFlipResults
        score={score}
        noOfFlips={clickedCards.length}
        onClickPlayAgain={onStartPlaying}
      />
    </>
  )

  const onClickCard = cardItem => {
    if (cardOne !== null && cardOne.id !== cardItem.id) {
      setCardTwo(cardItem)
    } else {
      setCardOne(cardItem)
    }
    if (clickedCards.indexOf(cardItem.name) === -1) {
      setClickedCards(prevState => [...prevState, cardItem.name])
    }
  }

  const renderCardFlipGame = () => {
    const items = clickedCards.length
    const moves = items < 10 ? `0${items}` : items
    const finalScore = score < 10 ? `0${score}` : score

    const timeLeft = () => {
      const remainingSeconds = minutes * 60 - seconds
      if (remainingSeconds === 0) {
        clearInterval(timerId)
        setIsPlaying(false)
        setCarFlipGameStatus(cardFlipConstants.gameOver)
      }
      const mins = Math.floor(remainingSeconds / 60)
      const secs = Math.floor(remainingSeconds % 60)
      const stringifiedMins = mins > 9 ? mins : `0${mins}`
      const stringifiedSecs = secs > 9 ? secs : `0${secs}`
      return `${stringifiedMins}:${stringifiedSecs}`
    }

    return (
      <div className="game-container">
        <h1 className="game-title">Card-Flip Memory Game</h1>
        <div className="card-flip-score-section">
          <p className="card-flip-count">{`Card flip count - ${moves}`}</p>
          <p className="time">{timeLeft()}</p>
          <p className="card-flip-score">{`Score - ${finalScore}`}</p>
        </div>
        <div className="cards-container">
          <ul className="cards-list">
            {cardsArray.map(eachCard => (
              <CardItem
                cardDetails={eachCard}
                key={eachCard.id}
                onClickCard={onClickCard}
                cardFlipped={
                  cardOne === eachCard ||
                  cardTwo === eachCard ||
                  eachCard.matched === true
                }
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
  const renderCardFlipChoices = () => {
    switch (cardFlipGameStatus) {
      case cardFlipConstants.initial:
        return renderCardFlipRules()
      case cardFlipConstants.inProgress:
        return renderCardFlipGame()
      case cardFlipConstants.gameOver:
        return renderCardFlipResults()
      default:
        return null
    }
  }
  const onClickBack = () => {
    const {history} = props
    history.replace('/')
  }

  const containerClassName = isPlaying ? 'playing' : ''
  return (
    <div className={`card-flip-game-container ${containerClassName}`}>
      <div className="card-flip-menu">
        <button
          type="button"
          className="card-flip-back-icon"
          onClick={onClickBack}
        >
          <BiArrowBack size={25} color="#ffffff" />
          <p className="card-flip-back-text">Back</p>
        </button>

        {isPlaying && renderModal()}
      </div>
      <div className="card-flip-app-container">{renderCardFlipChoices()}</div>
    </div>
  )
}
export default CardFlipHome
