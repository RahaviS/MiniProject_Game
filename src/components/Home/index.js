import {Link} from 'react-router-dom'
import './index.css'

const Home = () => (
  <div className="welcome-page">
    <h1 className="title">Games</h1>
    <ul className="game-list">
      <Link to="/emoji-game" className="link-item">
        <li className="game-list-item">
          <img
            className="home-image"
            src="https://res.cloudinary.com/dktojjeva/image/upload/v1709186962/Group_7428_jv6kdt.png"
            alt="emoji game"
          />
        </li>
      </Link>
      <Link to="/memory-matrix" className="link-item">
        <li className="game-list-item">
          <p className="each-game-title">Memory Matrix</p>
          <img
            className="home-image"
            src="https://res.cloudinary.com/dktojjeva/image/upload/v1709187207/memory_p3sjwa.png"
            alt="memory matrix"
          />
        </li>
      </Link>
      <Link to="/rock-paper-scissor" className="link-item">
        <li className="game-list-item">
          <p className="each-game-title">ROCK PAPER SCISSOR</p>
          <img
            className="home-image"
            src="https://res.cloudinary.com/dktojjeva/image/upload/v1709187224/Group_7469_xycjo2.png"
            alt="rock paper scissor"
          />
        </li>
      </Link>
      <Link to="/card-flip-memory-game" className="link-item">
        <li className="game-list-item">
          <img
            className="home-image card"
            src="https://res.cloudinary.com/dktojjeva/image/upload/v1709187216/animals_b71o81.png"
            alt="card flip memory game"
          />
        </li>
      </Link>
    </ul>
  </div>
)
export default Home
