function Game() {
	this.deck = new Deck(),
	this.discardPile = new DiscardPile(),
	this.players = new Array(),
	this.turnOrder = new Array(),
	this.ranks = this.deck.ranks
}

Game.prototype.addPlayer = function(name) {
	this.players.push(new Player(name));
	this.turnOrder.push(new Player(name));
}

Game.prototype.changeTurnOrder = function() {
	this.turnOrder.push(this.turnOrder.shift());
}

Game.prototype.whosTurn = function() {
	return this.turnOrder[0].name;
}

Game.prototype.dealCards = function() {
	while (this.deck.size() != 0) {
		this.players[0].addCardsToHand([this.deck.takeTopCard()]);
		this.players.push(this.players.shift());
	}
}

Game.prototype.setup = function() {
	this.deck.makeDeck();
	this.deck.shuffle();
	this.dealCards();
}

Game.prototype.currentRank = function() {
	return this.ranks[0];
}

Game.prototype.changeCurrentRank = function() {
	this.ranks.push(this.ranks.shift());
}