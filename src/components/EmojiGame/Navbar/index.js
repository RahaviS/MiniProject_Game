import './index.css'

const Navbar = props => {
  const {topScore, score, gameStatus} = props

  return (
    <nav className="nav-bar">
      <div className="logo-container">
        <img
          className="nav-image"
          src="https://res.cloudinary.com/dktojjeva/image/upload/v1709212578/wink_1_uuqav4.png"
          alt="emoji logo"
        />
        <h1 className="logo-text">Emoji Game</h1>
      </div>
      {gameStatus !== 'GAME_OVER' && (
        <div className="scores-container">
          <p className="score-text">Top Score: {topScore}</p>
          <p className="score-text">Score: {score}</p>
        </div>
      )}
    </nav>
  )
}
export default Navbar
