function DiscardPile() {
	this.cards = new Array(),
	this.lastDiscard = new Array(),
	this.isDiscardPure = true
}

DiscardPile.prototype.size = function() {
	return this.cards.length
}

DiscardPile.prototype.transferCards = function() {
	for (var i = 0; i < this.lastDiscard.length; i++) {
		this.cards.push(this.lastDiscard[i]);
	}
}

DiscardPile.prototype.recieveNewCards = function(rank, cards) {
	this.isDiscardPure = true;
	for (var i = 0; i < cards.length; i++) {
		if (cards[i].rank != rank) {
			this.isDiscardPure = false;
		}
	}
	for (var i = 0; i < cards.length; i++) {
		this.lastDiscard.push(cards[i]);
	}
}

DiscardPile.prototype.takeCards = function() {
	var wholePile = this.cards;
	this.cards = new Array();
	return wholePile;
}