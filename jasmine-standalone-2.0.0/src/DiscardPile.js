function DiscardPile() {
	this.cards = new Array(),
	
	this.size = function() {
		return this.cards.length
	},

	this.addCards = function(cards) {
		for (var i = 0; i < cards.length; i++) {
			this.cards.push(cards[i]);
		}
	},

	this.takeCards = function() {
		var wholePile = this.cards;
		this.cards = new Array();
		return wholePile;
	}
}