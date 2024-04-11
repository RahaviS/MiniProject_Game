import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import EmojiHome from './components/EmojiGame/EmojiHome'
import RPS from './components/RockPaperScissor/RPS'
import MMGame from './components/MemoryMatrix/MMGame'
import CardFlipHome from './components/CardFlipGame/CardFlipHome'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/emoji-game" component={EmojiHome} />
    <Route exact path="/rock-paper-scissor" component={RPS} />
    <Route exact path="/memory-matrix" component={MMGame} />
    <Route exact path="/card-flip-memory-game" component={CardFlipHome} />
  </Switch>
)
export default App
