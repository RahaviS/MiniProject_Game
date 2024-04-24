import './index.css'

const CardItem = props => {
  const {cardDetails, onClickCard, cardFlipped} = props
  const {isClicked, cardOne, cardTwo, disabled} = props
  const {name, image} = cardDetails
  const onClickEvent = () => {
    onClickCard(cardDetails)
  }
  const cardClassName = cardFlipped ? 'flipped' : ''
  let borderColorClassName = ''
  if (isClicked) {
    if (cardOne !== null && cardTwo === null) {
      borderColorClassName = cardOne.name === name && 'correctCardsSelected'
    } else if (cardOne && cardTwo) {
      borderColorClassName =
        cardOne.name !== cardTwo.name && 'wrongCardsSelected'
    }
  }
  const isDisabled = cardFlipped || disabled
  return (
    <li className="list-item">
      <button
        type="button"
        className={`card ${cardClassName}`}
        onClick={onClickEvent}
        data-testid={name}
        disabled={isDisabled}
      >
        <div className="front">
          <img
            className="front-image"
            src="https://res.cloudinary.com/dktojjeva/image/upload/v1711801298/foot-print_20_kbepqq.png"
            alt="foot print"
          />
        </div>
        <div className={`back ${borderColorClassName}`}>
          <img src={image} alt={name} className="back-image" />
        </div>
      </button>
    </li>
  )
}
export default CardItem
