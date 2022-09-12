import React, {useState} from 'react'

let quotesData;
fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
.then(res => {
    if(!res.ok) {
        console.log("Error loading data from server.")
    }
    return res.json()
})
.then((jsonQuotes) => {
    quotesData = jsonQuotes.quotes
}).catch((err) => {
    console.log(err)
})

function getRandomQuote() {
    return quotesData ? quotesData[Math.floor(Math.random() * quotesData.length)] : {quote: "The quick brown fox jumps over the lazy dog", author: "Keyboard Warrior"}
}

function QuoteBox() {
    /*  For some reason, useState( () => getRandomQuote() ) does not work
        Also, getRandomQuote() does not get a random quote on first load.
        Though, it works when I press the 'New quote' button that sets the state.
    */
    const [qt, setQuote] = useState(getRandomQuote())   
    
    function newQuote() {
        setQuote(() => getRandomQuote())
    }

    return (
        <div className="container-fluid" id="quote-box">
            <div className="d-flex justify-content-start">
                <div className="col col-xs-4"><h3><i className='fa fa-quote-left'></i> <span id="text">{qt.quote}</span></h3></div>
            </div>
            <div className="d-flex justify-content-end" id="author">
                <p>- {qt.author}</p>
            </div>
            <div className="d-flex justify-content-between" id="buttons">
                <div>
                    <strong>Share on:</strong> <a className='btn btn-primary' id="tweet-quote" href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='.concat(qt.quote).concat(' ').concat(qt.author)} target="_blank" rel="noopener noreferrer"><i className='fa fa-twitter'></i></a>
                </div>
                <div>
                    <button className='btn btn-primary' id="new-quote" onClick={newQuote}>New quote</button>
                </div>
            </div>
        </div>
    )
}

export default QuoteBox