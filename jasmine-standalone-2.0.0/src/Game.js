function Game() {
	this.deck = new Deck(),
	this.discardPile = new DiscardPile(),
	this.players = new Array()
}

Game.prototype.addPlayer = function(name) {
	this.players.push(new Player(name));
}

Game.prototype.changeTurnOrder = function() {
	this.players.push(this.players.shift());
}

Game.prototype.whosTurn = function() {
	return this.players[0].name;
}

Game.prototype.dealCards = function() {
	while (this.deck.size() != 0) {
		this.players[0].addCardsToHand([this.deck.takeTopCard()]);
		this.changeTurnOrder();
	}
}

Game.prototype.setup = function() {
	this.deck.makeDeck();
	this.deck.shuffle();
	this.dealCards();
}