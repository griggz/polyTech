import currencyJs from 'currency.js'

const getCurrencyValue = ({ value, symbol }) => (
  symbol === undefined
    ? currencyJs(value, { formatWithSymbol: false }).format()
    : currencyJs(value, { symbol: symbol, formatWithSymbol: true, precision: 0 }).format()
)

export default getCurrencyValue
