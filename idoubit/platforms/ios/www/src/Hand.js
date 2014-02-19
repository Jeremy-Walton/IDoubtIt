function Hand() {
	this.cards = new Array(),
	this.selectedCards = new Array()
}

Hand.prototype.size = function() {
	return this.cards.length
}

Hand.prototype.addCards = function(cards) {
	for (var i = 0; i < cards.length; i++) {
		this.cards.push(cards[i]);
	}
	this.sortCards();
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
	this.sortCards();
	return cardsToGive;
}

Hand.prototype.takeCardByDescription = function(newCard) {
	var cardToGive = new Array();
	for (var i = 0; i < this.size(); i++) {
		if (this.cards[i].description() == newCard) {
			cardToGive.push(this.cards[i]);
			if (i > -1) {
				this.cards.splice(i, 1);
			}
		}
	}
	this.sortCards();
	return cardToGive[0];
}

Hand.prototype.sortCards = function() {
			this.cards.sort(function (a, b) {
   			if (a.value > b.value)
    			return 1;
   			if (a.value < b.value)
      			return -1;
   			return 0;
			});
}