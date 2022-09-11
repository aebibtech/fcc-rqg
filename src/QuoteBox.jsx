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


function QuoteBox() {
    const [qt, setQuote] = useState(getRandomQuote())
    

    function getRandomQuote() {
        return quotesData ? quotesData[Math.floor(Math.random() * quotesData.length)] : {quote: "The quick brown fox jumps over the lazy dog", author: "Keyboard Warrior"}
    }
    
    function newQuote() {
        setQuote(() => getRandomQuote())
    }

    return (
        <div className="container-fluid" id="quote-box">
            <div className="row">
                <div className="col col-xs-4"><h3 className="text-center"><i className='fa fa-quote-left'></i> <span id="text">{qt.quote}</span></h3></div>
            </div>
            <div className="row" id="author">
                <div className="col">
                    <p className="text-right">- {qt.author}</p>
                </div>
            </div>
            <div className="row" id="buttons">
                <div className="col col-md-8">
                    <strong>Share on:</strong> <a className='btn btn-primary' id="tweet-quote" href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='.concat(qt.quote).concat(' ').concat(qt.author)} target="_blank" rel="noopener noreferrer"><i className='fa fa-twitter'></i></a>
                </div>
                <div className="col col-sm-4">
                    <button className='btn btn-primary' id="new-quote" onClick={newQuote}>New quote</button>
                </div>
            </div>
        </div>
    )
}

export default QuoteBox