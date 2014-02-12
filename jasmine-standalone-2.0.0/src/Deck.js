function Deck() {
	this.cards = new Array(),
	this.ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"],
	this.suits = ["Hearts", "Diamonds", "Clubs", "Spades"]
}

Deck.prototype.size = function() {
	return this.cards.length
}

Deck.prototype.makeDeck = function() {
	for (var rank in this.ranks) {
		for (var suit in this.suits) {
			this.cards.push(new PlayingCard(this.ranks[rank], this.suits[suit]));
		}
	}
}

Deck.prototype.shuffle = function() {
	for(var j, x, i = this.cards.length; i; j = Math.floor(Math.random() * i), x = this.cards[--i], this.cards[i] = this.cards[j], this.cards[j] = x);
}

Deck.prototype.takeTopCard = function() {
	return this.cards.pop();
}