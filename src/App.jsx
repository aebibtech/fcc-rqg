import React, { useState, useEffect } from 'react'
import axios from 'axios'
import QuoteBox from './QuoteBox'

function App() {
  const [quotesData, setQuotesData] = useState({})
  const [currQuote, setCurrQuote] = useState({})
  const [color, setColor] = useState({})
  const commonStyle = { transition: "all 2s ease", WebkitTransition: "all 2s ease", MozTransition: "all 2s ease" }

  let colors = [
    '#16a085', '#27ae60', '#2c3e50',
    '#f39c12', '#e74c3c', '#9b59b6',
    '#FB6964', '#342224', '#472E32',
    '#BDBB99', '#77B1A9', '#73A857'
  ];

  useEffect(() => {
    axios.get("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
          .then(res => {
            setQuotesData(res.data.quotes)
            setCurrQuote(res.data.quotes[Math.floor(Math.random() * res.data.quotes.length)])
            setColor({ color: colors[Math.floor(Math.random() * colors.length)], ...commonStyle })
          }).catch(e => {
            setCurrQuote({ quote: "Failed to get data from server.", author: ""})
          })
  }, [])

  function getRandomQuote() {
    return quotesData[Math.floor(Math.random() * quotesData.length)]
  }

  function newQuote() {
      setCurrQuote(() => getRandomQuote())
      getRandomColor()
  }

  function getRandomColor() {
    setColor(() => {
      let randomColor = colors[Math.floor(Math.random() * colors.length)]
      return { color: randomColor, ...commonStyle }})
  }
  return (
    <div style={ { backgroundColor: color.color, ...commonStyle } }>
    <div className="jumbotron-fluid container-fluid text-center">
      <h1 className="display-4">Random Quote Generator</h1>
      <p className="lead">Share some quotes to your friends!</p>
    </div>
    <QuoteBox quote={currQuote} handler={newQuote} styleObj={color} />
    <div className="container-fluid text-center footer">
      <strong><a href="https://aebibtech.com" target="_blank" rel="noreferrer noopener">by Aebibtech</a></strong>
    </div>
    </div>
  )
}

export default App
