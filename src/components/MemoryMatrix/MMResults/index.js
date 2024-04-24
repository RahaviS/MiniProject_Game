import {Line} from 'rc-progress'
import './index.css'

const MMResults = props => {
  const {level, onClickPlayAgain, copyOfArray, clickedTiles} = props
  // const emojisArray = [
  //   'neutral face',
  //   'grimacing face',
  //   'slightly smiling face',
  //   'grinning face with big eyes',
  //   'grinning face with smiling eyes',
  //   'beaming face with smiling eyes',
  //   'grinning face',
  //   'smiling face with sunglasses',
  // ]

  let gameFinished = ''
  if (level === 15) {
    gameFinished =
      copyOfArray.every(item => clickedTiles.includes(item)) &&
      clickedTiles.every(item => copyOfArray.includes(item))
  }
  const percentage = gameFinished ? (level * 20) / 3 : ((level - 1) * 20) / 3
  console.log(percentage)

  const onClickEvent = () => {
    onClickPlayAgain()
  }
  return (
    <div className='mm-result-section'>
      <div className='smiley-img-section'>
        <img
          src='https://res.cloudinary.com/dktojjeva/image/upload/v1712837217/05_Pokerface_mhzutc.png'
          alt='neutral face'
          className='smiley-img'
        />
        <img
          src='https://res.cloudinary.com/dktojjeva/image/upload/v1712837217/07_Grimmace_cafrzz.png'
          alt='grimacing face'
          className='smiley-img'
        />
        <img
          src='https://res.cloudinary.com/dktojjeva/image/upload/v1712837216/01_Smile_buwsoj.png'
          alt='slightly smiling face'
          className='smiley-img'
        />
        <img
          src='https://res.cloudinary.com/dktojjeva/image/upload/v1712837216/03_Optimistic_b6idx3.png'
          alt='grinning face with big eyes'
          className='smiley-img'
        />
        <img
          src='https://res.cloudinary.com/dktojjeva/image/upload/v1712837216/04_Grin_ox5zfm.png'
          alt='grinning face with smiling eyes'
          className='smiley-img'
        />
        <img
          src='https://res.cloudinary.com/dktojjeva/image/upload/v1712837216/05_Laugh_ichtpa.png'
          alt='beaming face with smiling eyes'
          className='smiley-img'
        />
        <img
          src='https://res.cloudinary.com/dktojjeva/image/upload/v1712837216/02_Happy_o8gerj.png'
          alt='grinning face'
          className='smiley-img'
        />
        <img
          src='https://res.cloudinary.com/dktojjeva/image/upload/v1712837216/02_Like_a_boss_pzxyfb.png'
          alt='smiling face with sunglasses'
          className='smiley-img'
        />
      </div>
      <Line
        percent={percentage}
        strokeWidth={1}
        strokeColor='#467AFF'
        className='progress-bar'
      />
      <div className='level-text-section'>
        <p className='level-text'>Level 1</p>
        <p className='level-text'>Level 5</p>
        <p className='level-text'>Level 10</p>
        <p className='level-text'>Level 15</p>
      </div>
      <h1 className='mm-result-title'>Congratulations!</h1>
      <p className='mm-result-desc'>
        You have reached level {gameFinished ? level : level - 1}
      </p>
      <button
        type='button'
        className='mm-play-again-btn'
        onClick={onClickEvent}
      >
        Play Again
      </button>
    </div>
  )
}
export default MMResults
