import './index.css'

const CardItem = props => {
  const {cardDetails, onClickCard, cardFlipped} = props
  const {name, image} = cardDetails
  const onClickEvent = () => {
    onClickCard(cardDetails)
  }
  const cardClassName = cardFlipped ? 'flipped' : ''
  return (
    <li className="list-item">
      <button
        type="button"
        className={`card ${cardClassName}`}
        onClick={onClickEvent}
        data-testid={name}
      >
        <div className="front">
          <img
            className="front-image"
            src="https://res.cloudinary.com/dktojjeva/image/upload/v1711801298/foot-print_20_kbepqq.png"
            alt="foot print"
          />
        </div>
        <div className="back">
          <img src={image} alt={name} className="back-image" />
        </div>
      </button>
    </li>
  )
}
export default CardItem
