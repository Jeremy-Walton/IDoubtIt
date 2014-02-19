function Player(name) {
	this.name = name,
	this.hand = new Hand()
}

Player.prototype.handSize = function() {
	return this.hand.size();
}

Player.prototype.addCardsToHand = function(cards) {
	this.hand.addCards(cards);
}

Player.prototype.takeCardsFromHand = function(newCards) {
	return this.hand.takeCards(newCards);
}