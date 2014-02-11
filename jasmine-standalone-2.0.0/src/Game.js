function Game() {
	this.deck = new Deck(),
	this.discardPile = new DiscardPile(),
	this.players = new Array(),

	this.addPlayer = function(name) {
		this.players.push(new Player(name));
	},

	this.changeTurnOrder = function() {
		this.players.push(this.players.shift());
	},

	this.whosTurn = function() {
		return this.players[0].name;
	},

	this.dealCards = function() {
		while (this.deck.size() != 0) {
			this.players[0].addCardsToHand([this.deck.takeTopCard()]);
			this.changeTurnOrder();
		}
	}

	this.setup = function() {
		this.deck.makeDeck();
		this.deck.shuffle();
		this.dealCards();
	}
}