function Hand() {
	this.cards = new Array()
}

Hand.prototype.size = function() {
	return this.cards.length
}

Hand.prototype.addCards = function(cards) {
	for (var i = 0; i < cards.length; i++) {
		this.cards.push(cards[i]);
	}
}

Hand.prototype.takeCards = function(newCards) {
	var cardsToGive = new Array();
	for (var j = 0; j < newCards.length; j++) {
		for (var i = 0; i < this.size(); i++) {
			if (this.cards[i].rank == newCards[j].rank && this.cards[i].suit == newCards[j].suit) {
				cardsToGive.push(this.cards[i]);
				if (i > -1) {
					this.cards.splice(i, 1);
				}
			}
		}
	}
	return cardsToGive;
}

Hand.prototype.sortCards = function() {
	for (var i = 0; i < this.size(); i++) {
		
	}
}