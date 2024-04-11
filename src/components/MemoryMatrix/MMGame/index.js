import {useState, useEffect} from 'react'
import Popup from 'reactjs-popup'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'
import MMTiles from '../MMTiles'
import MMResults from '../MMResults'
import './index.css'

const mmGameConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  gameOver: 'GAME_OVER',
}

const levels = [
  {id: 1, n: 3},
  {id: 2, n: 4},
  {id: 3, n: 5},
  {id: 4, n: 6},
  {id: 5, n: 7},
  {id: 6, n: 8},
  {id: 7, n: 9},
  {id: 8, n: 10},
  {id: 9, n: 11},
  {id: 10, n: 12},
  {id: 11, n: 13},
  {id: 12, n: 14},
  {id: 13, n: 15},
  {id: 14, n: 16},
  {id: 15, n: 17},
]

const MMGame = props => {
  const [level, setLevel] = useState(null)
  const [mmGameStatus, setMMGameStatus] = useState({
    gameState: mmGameConstants.initial,
    isPlaying: false,
  })
  const [activeTilesArray, setActiveTilesArray] = useState([])
  const [copyOfArray, setCopyOfArray] = useState([])
  const [tilesArray, setTilesArray] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [clickedTiles, setClickedTiles] = useState([])
  const [topLevel, setTopLevel] = useState(0)
  const [isDark, setIsDark] = useState(0)
  let tiles = ''
  let timerId = ''
  const {gameState, isPlaying} = mmGameStatus

  const clearArray = () => {
    setActiveTilesArray([])
    timerId = setTimeout(() => {
      if (clickedTiles.length === 0) {
        console.log(clickedTiles)
        setMMGameStatus({gameState: mmGameConstants.gameOver, isPlaying: false})
      }
    }, levels[level].n * 1000)
  }

  const updateArray = () => {
    tiles = levels[level].n * levels[level].n
    const randomNumbers = []
    while (randomNumbers.length < levels[level].n) {
      const randomNum = Math.floor(Math.random() * tiles)
      if (randomNumbers.indexOf(randomNum) === -1) randomNumbers.push(randomNum)
    }
    setActiveTilesArray(randomNumbers)
    setCopyOfArray(randomNumbers)
  }

  const updateTiles = () => {
    clearTimeout(timerId)
    setDisabled(true)
    updateArray()
    tiles = levels[level].n * levels[level].n
    let tilesList = []
    for (let i = 0; i < tiles; i += 1) {
      const tileDetails = {
        id: i,
      }
      tilesList = [...tilesList, tileDetails]
    }
    setTilesArray(tilesList)
    const timer = setTimeout(() => {
      setDisabled(false)
      clearArray()
    }, levels[level].n * 1000)
    return () => {
      console.log('timer cleared')
      clearTimeout(timer)
    }
  }

  const updateTopLevel = currentLevel => {
    if (currentLevel > topLevel) {
      setTopLevel(currentLevel)
    }
  }

  useEffect(() => {
    if (gameState === mmGameConstants.inProgress) updateTiles()
    // eslint-disable-next-line
  }, [level])

  useEffect(() => {
    if (clickedTiles.length > 0) {
      const clickedTilesinActiveArray = clickedTiles.every(item =>
        copyOfArray.includes(item),
      )
      if (clickedTilesinActiveArray) {
        if (clickedTiles.length === levels[level].n) {
          setLevel(prevState => prevState + 1)
          setActiveTilesArray([])
          setCopyOfArray([])
          setClickedTiles([])
        }
      } else {
        setMMGameStatus({gameState: mmGameConstants.gameOver, isPlaying: false})
        setActiveTilesArray([])
        setCopyOfArray([])
        setClickedTiles([])
        updateTopLevel(level)
      }
    }
    // eslint-disable-next-line
  }, [clickedTiles])

  const onStartPlaying = () => {
    setMMGameStatus({gameState: mmGameConstants.inProgress, isPlaying: true})
    setLevel(0)
  }

  const renderRules = () => (
    <div className="mm-rules-container">
      <h1 className="mm-rules-text">Rules</h1>
      <div className="rules-list-container">
        <ul className="mm-rules-list">
          <li className="mm-rule-item">
            In each level of the Game, Users should be able to see the Grid with
            (N X N) size starting from 3 and the grid will highlight N cells in
            Blue, the N highlighted cells will be picked randomly.
          </li>
          <li className="mm-rule-item">
            The highlighted cells will remain N seconds for the user to memorize
            the cells. At this point, the user should not be able to perform any
            action.
          </li>
          <li className="mm-rule-item">
            After N seconds, the grid will clear the N highlighted cells.
          </li>
        </ul>
        <ul className="mm-rules-list">
          <li className="mm-rule-item">
            At N seconds, the user can click on any cell. Clicking on a cell
            that was highlighted before it will turn blue. Clicking on the other
            cells that were not highlighted before then will turn to red.
          </li>
          <li className="mm-rule-item">
            The user should be promoted to the next level if they guess all N
            cells correctly in one attempt.
          </li>
          <li className="mm-rule-item">
            The user should be taken to the results page if the user clicks on
            the wrong cell.
          </li>
          <li className="mm-rule-item">
            If the user completed all the levels, then the user should be taken
            to the results page.
          </li>
        </ul>
      </div>
    </div>
  )

  const renderModal = () => (
    <div className="mm-popup-container">
      <Popup
        modal
        trigger={
          <button type="button" className="mm-rules-button">
            Rules
          </button>
        }
      >
        {close => (
          <div className="mm-modal-container">
            <button
              type="button"
              aria-label="close"
              data-testid="close"
              className="mm-close-button"
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

  const renderRulesContainer = () => (
    <>
      <img
        src="https://res.cloudinary.com/dktojjeva/image/upload/v1709187207/memory_p3sjwa.png"
        alt="memory matrix"
        className="mm-home-img"
      />
      <div>
        {renderRules()}
        <button type="button" className="mm-start-btn" onClick={onStartPlaying}>
          Start Playing
        </button>
      </div>
    </>
  )

  const onClickPlayAgain = () => {
    setMMGameStatus({gameState: mmGameConstants.inProgress, isPlaying: true})
    setLevel(0)
    updateTopLevel(level)
    if (levels[level].id === 1) {
      updateTiles()
    }
  }

  const onClickTile = id => {
    if (clickedTiles.indexOf(id) === -1) {
      setClickedTiles(prevState => [...prevState, id])
    }
  }

  const onClickDarkMode = () => {
    setIsDark(prevState => !prevState)
  }

  const renderMemoryMatrix = () => (
    <>
      <div className="mm-top-section">
        <p className="mm-top-level">Top Level : {topLevel}</p>
        <div className="mm-mode-section">
          <p className="mm-game-level">Level - {level + 1}</p>
          <button
            type="button"
            onClick={onClickDarkMode}
            className="mm-mode-btn"
          >
            Mode:{isDark ? 'Dark' : 'Light'}
          </button>
        </div>
      </div>
      <ul className={`tile-list column${levels[level].n}`}>
        {tilesArray.map(eachTile => (
          <MMTiles
            key={eachTile.id}
            isActive={activeTilesArray.indexOf(eachTile.id) !== -1}
            id={eachTile.id}
            disabled={disabled}
            onClickTile={onClickTile}
            isClicked={
              clickedTiles.length > 0
                ? clickedTiles.indexOf(
                    copyOfArray.map(each => {
                      if (each === eachTile.id) {
                        return eachTile.id
                      }
                      return ''
                    }),
                  ) !== -1
                : 'not started'
            }
            boardSize={`row${levels[level].n}`}
          />
        ))}
      </ul>
    </>
  )

  const renderResults = () => (
    <MMResults onClickPlayAgain={onClickPlayAgain} level={levels[level].id} />
  )

  const renderChoices = () => {
    switch (gameState) {
      case mmGameConstants.initial:
        return renderRulesContainer()
      case mmGameConstants.inProgress:
        return renderMemoryMatrix()
      case mmGameConstants.gameOver:
        return renderResults()
      default:
        return null
    }
  }

  const onClickBack = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="mm-bg-container">
      <div className="mm-menu">
        <button
          type="button"
          className="mm-back-icon-container"
          onClick={onClickBack}
        >
          <BiArrowBack size={25} color="#ffffff" />
          <p className="mm-back-text">Back</p>
        </button>
        {isPlaying && renderModal()}
      </div>
      <div className="mm-app-container">
        <h1 className="mm-heading">Memory Matrix</h1>
        {renderChoices()}
      </div>
    </div>
  )
}

export default MMGame
