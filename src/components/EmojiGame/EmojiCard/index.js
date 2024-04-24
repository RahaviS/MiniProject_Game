import './index.css'

const EmojiCard = props => {
  const {emojiDetails, onClickEmoji} = props
  const {emojiUrl, emojiName, id} = emojiDetails

  const onClickEvent = () => {
    onClickEmoji(id)
  }

  return (
    <li className="emoji-item">
      <button className="emoji-button" type="button" onClick={onClickEvent}>
        <img
          src={emojiUrl}
          alt={emojiName.toLowerCase()}
          className="emoji-icon"
        />
      </button>
    </li>
  )
}
export default EmojiCard
