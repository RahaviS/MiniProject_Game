import './index.css'

const MMTiles = props => {
  const {id, isActive, onClickTile, disabled, isHighlighted} = props
  const {isClicked, boardSize, copyOfArray} = props
  const activeClassName = isActive && 'active'
  const dataTestIdValue = isHighlighted ? 'highlighted' : 'notHighlighted'
  const emptyString = ''
  let bgColorClassName = ''
  if (isClicked) {
    bgColorClassName = copyOfArray.indexOf(id) !== -1 ? 'right' : 'wrong'
  }

  const onClickEvent = () => {
    onClickTile(id)
  }

  return (
    <li className={`tile ${activeClassName} ${bgColorClassName} ${boardSize}`}>
      <button
        type="button"
        className="tile-btn"
        onClick={onClickEvent}
        data-testid={dataTestIdValue}
        disabled={disabled}
      >
        {emptyString}
      </button>
    </li>
  )
}
export default MMTiles
