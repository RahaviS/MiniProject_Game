import './index.css'

const EmojiCard = props => {
  const {emojiDetails, onClickEmoji} = props
  const {emojiName, emojiUrl, id} = emojiDetails

  const onClickEvent = () => {
    onClickEmoji(id)
  }

  return (
    <button className="emoji-button" type="button" onClick={onClickEvent}>
      <li className="emoji-item">
        <img src={emojiUrl} alt={emojiName} className="emoji-icon" />
      </li>
    </button>
  )
}
export default EmojiCard
