import React, {useState} from 'react'

function QuoteBox({ quote, handler, styleObj }) {
    let qt = quote
    return (
        <div style={styleObj} id="main">
        <div className="container-fluid" id="quote-box">
            <div className="d-flex justify-content-start">
                <div className="col col-xs-4"><h3 className="text-center"><i className='fa fa-quote-left'></i> <span id="text">{qt.quote}</span></h3></div>
            </div>
            <div className="d-flex justify-content-end" id="author">
                <p className="lead">- {qt.author}</p>
            </div>
            <div className="d-flex justify-content-between" id="buttons">
                <div>
                    <strong>Share on:</strong> <a style={{ backgroundColor: styleObj.color, transition: "all 2s ease", WebkitTransition: "all 2s ease", MozTransition: "all 2s ease" }} className='btn btn-dark' id="tweet-quote" href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='.concat(qt.quote).concat(' ').concat(qt.author)} target="_blank" rel="noopener noreferrer"><i className='fa fa-twitter'></i></a>
                </div>
                <div>
                    <button style={{ backgroundColor: styleObj.color, transition: "all 2s ease", WebkitTransition: "all 2s ease", MozTransition: "all 2s ease" }} className='btn btn-dark' id="new-quote" onClick={handler} disabled={qt.author === ""}>New quote</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default QuoteBox