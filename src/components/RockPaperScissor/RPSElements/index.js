import './index.css'

const RPSElements = props => {
  const {rpsElement, onClickIcon} = props
  const {imageUrl, id} = rpsElement
  const onClickEvent = () => {
    onClickIcon(id, imageUrl)
  }
  return (
    <li className="rps-element">
      <button
        type="button"
        data-testid={`${id}Button`}
        onClick={onClickEvent}
        className="image-button"
      >
        <img className="rps-icons" src={imageUrl} alt={id} />
      </button>
    </li>
  )
}
export default RPSElements
