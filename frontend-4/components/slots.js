import { compose } from 'recompose'

const symbolEmojis = {
  apple: '🍎',
  banana: '🍌',
  cherry: '🍒',
  lemon: '🍋',
}

const getSymbolEmoji = (symbol) => symbolEmojis[symbol] || '🎰'

const Slots = ({ slots, winningPayline }) => (
  <div className="slots">
    {slots.map((slot, index) =>
      <div
        className="slot"
        key={index}
        data-animate={winningPayline ? winningPayline.symbol === slot : false}
      >
        {getSymbolEmoji(slot)}
      </div>)
    }
  </div>
)

export default compose()(Slots)
