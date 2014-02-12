function GameView() {
	this.game = new Game()
}

GameView.prototype.setup = function() {
	this.game.addPlayer("Jeremy");
	this.game.setup();
}

GameView.prototype.displayHand = function() {
	var hand = document.querySelector("#Hand ul");
	for (var i = 0; i < this.game.players[0].handSize(); i++) {
		var li = document.createElement("li");
		var img = new Image();
		var card = this.game.players[0].hand.cards[i];
		img.src = "../jasmine-standalone-2.0.0/cards/" + card.description() + ".png";
		li.appendChild(img);
		hand.appendChild(li);
	}
}

window.onload=function(){
	var view = new GameView();
	view.setup();
	view.displayHand();
};