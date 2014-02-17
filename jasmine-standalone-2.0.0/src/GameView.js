function GameView() {
	this.game = new Game()
}

GameView.prototype.setup = function() {
	this.game.addPlayer("Jeremy");
	this.game.addPlayer("Sam");
	this.game.setup();
}

GameView.prototype.displayHand = function(player) {
	var hand = $("#Hand").find("#cards");
	var items = "";
	hand.empty();
	this.game.players[player].hand.cards.forEach(function(card) {
		var img = '<img src="../jasmine-standalone-2.0.0/cards/' + card.description() + '.png">';
		var li = '<li class="' + card.description() + '">' + img + '</li>';
		items += li;
	});
	hand.append(items);
}

GameView.prototype.displaySelectedCards = function(player) {
	var hand = $("#Hand").find("#selected");
	var items = "";
	hand.empty();
	this.game.players[player].hand.selectedCards.forEach(function(card) {
		var img = '<img src="../jasmine-standalone-2.0.0/cards/' + card.description() + '.png">';
		var li = '<li class="' + card.description() + '">' + img + '</li>';
		items += li;
	});
	hand.append(items);
}

GameView.prototype.displayPlayers = function() {
	var text = $(".Subheader h1");
	var playerNames = new Array();
	for (var i = 0; i < this.game.players.length; i++) {
		playerNames.push(" " + this.game.players[i].name);
	}
	text.text(playerNames);
}

GameView.prototype.selectCard = function(player, card) {
	this.game.players[player].hand.selectedCards.push(card);
}

GameView.prototype.displayInterface = function(player) {
	var Interface = $("#Interface").find("p");
	if(this.game.whosTurn() != this.game.players[player].name) {
		Interface.empty();
		Interface.html('<span id="doubt">I doubt it!</span>');
	} else {
		Interface.empty();
		Interface.html('<span id="play">Play Cards</span>  <span id="cancel">Cancel</span>');
	}
}

GameView.prototype.refreshPage = function(player) {
	$("#Books").find("h6").text("Current rank: "+this.game.currentRank());
	this.displayInterface(player);
	this.displayHand(player);
	this.displayPlayers();
	this.displayHand(player);
	this.displaySelectedCards(player);
	this.displayDiscardPile();
	this.displayGameInfo();
}

GameView.prototype.robotPressIDoubtIt = function(player) {
	var results = $("#Results").find("p");
	if (this.game.discardPile.isDiscardPure) {
		results.text("Robot called I doubt it and was wrong. He picked up the discard pile.");
		this.game.players[player].addCardsToHand(this.game.discardPile.takeCards());
	} else {
		results.text("Robot called I doubt it and was Right. You picked up the discard pile.");
		this.game.players[0].addCardsToHand(this.game.discardPile.takeCards());
	}
}

GameView.prototype.pressIDoubtIt = function(player) {
	var results = $("#Results").find("p");
	if (this.game.discardPile.isDiscardPure) {
		results.text("You called I doubt it and were wrong. You picked up the discard pile.");
		this.game.players[player].addCardsToHand(this.game.discardPile.takeCards());
	} else {
		results.text("You called I doubt it and were Right. Robot picked up the discard pile.");
		this.game.players[1].addCardsToHand(this.game.discardPile.takeCards());
	}
}

GameView.prototype.robotWaitForDoubts = function(player) {
	for (var i = 0; i < 20; i++) {
		var chance = Math.floor(Math.random() * 100);
		if(chance < 5) {
			return true;
		}
	}
}

GameView.prototype.robotTurn = function(player) {
	var randomIndex = 0;
	var description = '';
	var card = '';
	var cardsToPlay = new Array();
	for (var i = 0; i < 4; i++) {
		randomIndex = Math.floor(Math.random() * this.game.players[player].handSize());
		description = this.game.players[player].hand.cards[randomIndex].description();
		card = this.game.players[player].hand.takeCardByDescription(description);
		cardsToPlay.push(card);
	}
	this.game.discardPile.recieveNewCards(this.game.currentRank, cardsToPlay);
	var results = $("#Results").find("p");
	results.text("Robot played " + cardsToPlay.length + " " + this.game.currentRank() + "'s");
	this.game.changeCurrentRank();
	this.game.discardPile.transferCards();
	this.refreshPage(0);
}

GameView.prototype.checkWinCondition = function() {
	var Interface = $("#Interface").find("p");
	var results = $("#Results").find("p");
	this.game.players.forEach(function(player) {
		if (player.handSize() <= 0) {
			results.text(player.name + " Won!");
			Interface.empty();
			Interface.html('<span>' + player.name + " Won!" + '</span>');
		}
	});
}

GameView.prototype.displayDiscardPile = function() {
	var pile = $("#Books").find("#Pile");
	if (this.game.discardPile.size() > 0) {
		pile.empty();
		var img = '<img src="../jasmine-standalone-2.0.0/cards/backs_blue.png">';
		var li = '<li class="">' + img + '</li>';
		pile.append(li);
	} else {
		pile.empty();
	}
}

GameView.prototype.displayGameInfo = function() {
	var info = $("#Opponent_Info").find("ul");
	info.empty();
	var stuff = "";
	this.game.players.forEach(function(player) {
		stuff += "<li>" + player.name + " cards: " + (player.handSize() + player.hand.selectedCards.length) + "</li>";
	});
	info.append(stuff);
}

$(document).ready(function () {
  var view = new GameView();
	view.setup();
	view.refreshPage(0);

	$("#Hand").find("#cards").on('click', 'li', function() {
		if (view.game.whosTurn() == view.game.players[0].name) {
			if (view.game.players[0].hand.selectedCards.length < 4) {
				var index = $(this).attr("class");
				view.selectCard(0, view.game.players[0].hand.takeCardByDescription(index));
				view.refreshPage(0);
			}
		}
	});

	$("#Interface").on('click', '#doubt', function() {
		view.pressIDoubtIt(0);
	});

	$("#Interface").on('click', '#play', function() {
		if (view.game.players[0].hand.selectedCards.length > 0) {
			var results = $("#Results").find("p");
			//maybe put an if check to fix the 's if there is one card.
			results.text(view.game.whosTurn() + " played " + view.game.players[0].hand.selectedCards.length + " " + view.game.currentRank() + "'s");
			var playedCards = new Array();
			for (var i = 0; i < view.game.players[0].hand.selectedCards.length; i++) {
				playedCards.push(view.game.players[0].hand.selectedCards[i]);
			}
			view.game.discardPile.recieveNewCards(view.game.currentRank(), playedCards);
			view.game.players[0].hand.selectedCards = [];
			view.game.changeCurrentRank();
			if(view.robotWaitForDoubts(1)) {
				view.robotPressIDoubtIt(1);
			}
			view.game.changeTurnOrder();
			view.refreshPage(0);
			setTimeout(function() {
				view.robotTurn(1);
				view.checkWinCondition();
			}, 1000);
			setTimeout(function() {
				view.game.changeTurnOrder();
				view.checkWinCondition();
				view.refreshPage(0);
			}, 5000);
		}
	});

	$("#Interface").on('click', '#cancel', function() {
		if (view.game.players[0].hand.selectedCards.length > 0) {
			view.game.players[0].addCardsToHand(view.game.players[0].hand.selectedCards);
			view.game.players[0].hand.selectedCards = [];
			view.refreshPage(0);
		}
	});

	$("#Interface").on('mouseenter', '#play', function() {
		$(this).addClass('Hover');
	});

	$("#Interface").on('mouseleave', '#play', function() {
		$(this).removeAttr('class');
	});

	$("#Interface").on('mouseenter', '#cancel', function() {
		$(this).addClass('Hover');
	});

	$("#Interface").on('mouseleave', '#cancel', function() {
		$(this).removeAttr('class');
	});

	$("#Interface").on('mouseenter', '#doubt', function() {
		$(this).addClass('Hover');
	});

	$("#Interface").on('mouseleave', '#doubt', function() {
		$(this).removeAttr('class');
	});

	$("#Hand").find("#cards").on('mouseenter', 'li', function() {
		$(this).attr('id', 'Highlight');
	});

	$("#Hand").find("#cards").on('mouseleave', 'li', function() {
		$(this).removeAttr('id');
	});

	$("header").on('mouseenter', 'li', function() {
		$(this).addClass('Links');
	});

	$("header").on('mouseleave', 'li', function() {
		$(this).removeAttr('class');
	});
});