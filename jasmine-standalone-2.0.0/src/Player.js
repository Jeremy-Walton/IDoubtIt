function Player(name) {
	this.name = name,
	this.hand = new Hand(),

	this.handSize = function() {
		return this.hand.size();
	},

	this.addCardsToHand = function(cards) {
		this.hand.addCards(cards);
	},

	this.takeCardsFromHand = function(newCards) {
		return this.hand.takeCards(newCards);
	}
}