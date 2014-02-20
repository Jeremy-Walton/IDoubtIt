function DiscardPile() {
	this.cards = new Array(),
	this.isDiscardPure = true
}

DiscardPile.prototype.size = function() {
	return this.cards.length
}

DiscardPile.prototype.recieveNewCards = function(rank, cards) {
	this.isDiscardPure = true;
	for (var i = 0; i < cards.length; i++) {
		if (cards[i].rank != rank) {
			this.isDiscardPure = false;
		}
	}
	for (var i = 0; i < cards.length; i++) {
		// cards[i].selected = false;
		this.cards.push(cards[i]);
	}
}

DiscardPile.prototype.takeCards = function() {
	var wholePile = this.cards;
	this.cards = new Array();
	return wholePile;
}