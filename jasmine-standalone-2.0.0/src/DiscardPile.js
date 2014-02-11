function DiscardPile() {
	this.cards = new Array(),
	this.lastDiscard = new Array(),
	this.isDiscardPure = true,
	
	this.size = function() {
		return this.cards.length
	},

	this.transferCards = function() {
		for (var i = 0; i < this.lastDiscard.length; i++) {
			this.cards.push(this.lastDiscard[i]);
		}
	},

	this.recieveNewCards = function(rank, cards) {
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

	this.takeCards = function() {
		var wholePile = this.cards;
		this.cards = new Array();
		return wholePile;
	}
}