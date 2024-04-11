import './index.css'

const MMTiles = props => {
  const {id, isActive, onClickTile, disabled, isClicked, boardSize} = props
  const activeClassName = isActive && 'active'
  const dataTestIdValue = isActive ? 'highlighted' : 'notHighlighted'
  const emptyString = ''
  let resultClassName = ''
  if (isClicked !== 'not started') {
    resultClassName = isClicked ? 'right' : ''
  }
  const onClickEvent = () => {
    onClickTile(id)
  }

  return (
    <button
      type="button"
      className="tile-btn"
      onClick={onClickEvent}
      data-testid={dataTestIdValue}
      disabled={disabled}
    >
      <li className={`tile ${activeClassName} ${resultClassName} ${boardSize}`}>
        {emptyString}
      </li>
    </button>
  )
}
export default MMTiles
