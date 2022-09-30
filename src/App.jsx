import { useState, useEffect } from 'react'
import axios from 'axios'
import QuoteBox from './QuoteBox'

function App() {
  const [quotesData, setQuotesData] = useState({})
  const [currQuote, setCurrQuote] = useState({})

  useEffect(() => {
    axios.get("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
          .then(res => {
            setQuotesData(res.data.quotes)
            setCurrQuote(res.data.quotes[Math.floor(Math.random() * res.data.quotes.length)])
          }).catch(e => {
            setCurrQuote({ quote: "Failed to get data from server.", author: ""})
          })
  }, [])

  function getRandomQuote() {
    return quotesData[Math.floor(Math.random() * quotesData.length)]
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
