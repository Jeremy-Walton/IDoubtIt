function Deck() {
	this.cards = new Array(),
	this.ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"],
	this.suits = ["Hearts", "Diamonds", "Clubs", "Spades"],
	
	this.size = function() {
		return this.cards.length
	},
	
	this.makeDeck = function() {
		for (var rank in this.ranks) {
			for (var suit in this.suits) {
				this.cards.push(new PlayingCard(this.ranks[rank], this.suits[suit]));
			}
		}
	},

	this.shuffle = function() {
		for(var j, x, i = this.cards.length; i; j = Math.floor(Math.random() * i), x = this.cards[--i], this.cards[i] = this.cards[j], this.cards[j] = x);
	},

	this.takeTopCard = function() {
		return this.cards.pop();
	}
}