function PlayingCard(rank, suit) {
	this.rank = rank,
	this.suit = suit
	this._rankOrder = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"],
	this.value = this._rankOrder.indexOf(this.rank)
}

PlayingCard.prototype.description = function() {
	return this.rank + " of " + this.suit;
}

// PlayingCard.prototype.toJSON = function() {
// 	this.className = this.constructor.name;
// 	return this;
// }

// PlayingCard.prototype.fromJSON = function(json) {
// 	var object = JSON.parse(json);
// 	object.__proto__ = window[object.className].prototype;
// 	return object;
// }