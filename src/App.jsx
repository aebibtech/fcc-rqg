import { useState, useEffect } from 'react'
import axios from 'axios'
import QuoteBox from './QuoteBox'

function App() {
  const [quotesData, setQuotesData] = useState({})
  const [currQuote, setCurrQuote] = useState({ quote: "You can’t use up creativity. The more you use, the more you have.", author: "Maya Angelou"})

  useEffect(() => {
    axios.get("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
          .then(res => {
            setQuotesData(res.data)
          }).catch(e => {
            console.log(e.message)
          })
  }, [])

  function getRandomQuote() {
    let qts = quotesData.quotes
    return qts[Math.floor(Math.random() * qts.length)]
  }

  function newQuote() {
    setCurrQuote(() => getRandomQuote())
  }
  return (
    <>
    <QuoteBox quote={currQuote} handler={newQuote} />
    </>
  )
}

export default App
