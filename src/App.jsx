import React, { useState, useEffect } from 'react'
import axios from 'axios'
import QuoteBox from './QuoteBox'
import Styles from '../styles.css'

function App() {
	const [quotesData, setQuotesData] = useState({})
	const [currQuote, setCurrQuote] = useState({})
	const [color, setColor] = useState({})
	const animation = { transition: "all 2s ease", WebkitTransition: "all 2s ease", MozTransition: "all 2s ease" }

	function getNumber(){
		const DARK_VALUES = "01234567"
		return DARK_VALUES[Math.floor(Math.random() * DARK_VALUES.length)]
	}

	function getRandomColor() {
		let randomColor = "#"
		for(let i = 0; i < 3; i++){
			randomColor += getNumber()
		}
		return { color: randomColor, ...animation }
	}

	function setBodyColor(color){
		document.body.style.setProperty("--bgc", color)
	}

	function getRandomQuote() {
		return quotesData[Math.floor(Math.random() * quotesData.length)]
	}

	function newQuote() {
		setCurrQuote(() => getRandomQuote())
		setColor(() => getRandomColor())
	}

	useEffect(function(){
		(async function(){
			try{
				const res = await axios.get("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json")
				setQuotesData(res.data.quotes)
				setCurrQuote(res.data.quotes[Math.floor(Math.random() * res.data.quotes.length)])
				setColor(getRandomColor())
			}
			catch(err){
				setCurrQuote({ quote: "Failed to get data from server.", author: ""})
			}
		})()
	}, [])

	useEffect(function(){
		setBodyColor(color.color)
	}, [color])

	return (
		<div style={animation}>
			<div className="jumbotron-fluid container-fluid text-center">
				<h1 className="display-4 fw-bold">Random Quote Generator</h1>
				<p className="lead">Share some quotes to your friends!</p>
			</div>
			<QuoteBox quote={currQuote} handler={newQuote} styleObj={color} />
			<div className="container-fluid text-center footer">
				<span>&copy;</span> <strong><a href="https://aebibtech.com" target="_blank" rel="noreferrer noopener">Aebibtech</a></strong>
			</div>
		</div>
	)
}

export default App
