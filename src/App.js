import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./variables.css";
import "./App.css";

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			quoteText: "Be yourself; everyone else is already taken.",
			quoteAuthor: "Oscar Wilde"
		};
		this.getNewQuote = this.getNewQuote.bind(this);
		this.handleNewQuoteClick = this.handleNewQuoteClick.bind(this);
	}
	async getNewQuote() {
		const API_URL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
		const CORS_URL = "http://localhost:8080/";
		try {
			const response = await fetch(CORS_URL + API_URL);
			const quote = await response.json();
			return quote;
		} catch (error) {
			console.error('Error fetching quote:', error);
		}
	}
	async handleNewQuoteClick() {
		var newQuote = await this.getNewQuote();
		if(newQuote) {
			this.setState({
			quoteText: newQuote.quoteText,			
			quoteAuthor: newQuote.quoteAuthor			
			});
		}
	}
	render() {
		const shareQuote = `"${this.state.quoteText}" ${this.state.quoteAuthor} #quotes`;
		return (
			<div className="App bg-success h-100 d-flex flex-column justify-content-center align-items-center gap-3">
				<main id="quote-box" className="bg-white p-5 rounded-2 d-flex flex-column gap-3">
					<div id="quote" className="d-flex flex-column">
						<q id="text">{this.state.quoteText}</q>
						<span id="author" className="align-self-end">- {this.state.quoteAuthor}</span>
					</div>
					<div id="ctrl-buttons" className="d-flex justify-content-between">
						<div id="share-buttons" className="d-flex gap-1">
							<a 
							id="tweet-quote"
							href={`https://twitter.com/intent/tweet?text=${shareQuote}`} 
							className="btn btn-dark"
							target="_blank"
							rel="noreferrer">
								<i className="fa-brands fa-x-twitter"></i>
							</a>
							<a 
							id="tumblr-quote"
							href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes&caption=${shareQuote}`} className="btn btn-success"
							target="_blank"
							rel="noreferrer">
								<i className="fa-brands fa-tumblr"></i>
							</a>
						</div>
						<button id="new-quote" className="btn btn-success" onClick={this.handleNewQuoteClick}>
							New Quote
						</button>
					</div>
				</main>
				<span id="app-author" className="text-white">By Hassan Ouammou</span>
			</div>
		);
	}
}

export default App;
