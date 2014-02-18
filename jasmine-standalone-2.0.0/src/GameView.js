function gameView($scope, $timeout) {
	$scope.game = new Game();
	$scope.game.addPlayer("Jeremy");
	$scope.game.addPlayer("Sam");
	$scope.game.setup();
	$scope.result = "Take your turn!";
	
	$scope.playerNames = function() {
		var playerNames = "";
		for (var i = 0; i < $scope.game.players.length; i++) {
			playerNames += " | " + $scope.game.players[i].name + " | ";
		}
		return playerNames;
	}

	refreshHand($scope);

	$scope.cardSelect = function(card) {
		if ($scope.game.whosTurn() == $scope.game.players[0].name) {
			if ($scope.game.players[0].hand.selectedCards.length < 4) {
				var index = card.class;
				$scope.game.players[0].hand.selectedCards.push($scope.game.players[0].hand.takeCardByDescription(index));
			}
		}
		refreshHand($scope);
	}

	$scope.cancel = function() {
		if ($scope.game.players[0].hand.selectedCards.length > 0) {
			$scope.game.players[0].addCardsToHand($scope.game.players[0].hand.selectedCards);
			$scope.game.players[0].hand.selectedCards = [];
			refreshHand($scope);
		}
	}

	//Needs work
	$scope.play = function() {
		if ($scope.game.players[0].hand.selectedCards.length > 0) {
			$scope.result = $scope.game.whosTurn() + " played " + $scope.game.players[0].hand.selectedCards.length + " " + $scope.game.currentRank() + "'s";
			var playedCards = new Array();
			for (var i = 0; i < $scope.game.players[0].hand.selectedCards.length; i++) {
				playedCards.push($scope.game.players[0].hand.selectedCards[i]);
			}
			$scope.game.discardPile.recieveNewCards($scope.game.currentRank(), playedCards);
			$scope.game.players[0].hand.selectedCards = [];
			$scope.game.changeCurrentRank();
			if(robotWaitForDoubts()) {
				robotPressIDoubtIt($scope);
			}
			$scope.game.changeTurnOrder();
			refreshHand($scope);
			robotTurn($scope);
			console.log($scope.game.currentRank());
			checkWinCondition($scope);

			$timeout(function() {
				$scope.game.changeTurnOrder();
				checkWinCondition($scope);
				refreshHand($scope);
			}, 5000)
		}
	}

	$scope.doubt = function() {
		if($scope.game.whosTurn() != $scope.game.players[0].name){
			if ($scope.game.discardPile.isDiscardPure) {
				$scope.result = "You called I doubt it and were wrong. You picked up the discard pile.";
				$scope.game.players[0].addCardsToHand($scope.game.discardPile.takeCards());
			} else {
				$scope.result = "You called I doubt it and were Right. Robot picked up the discard pile.";
				$scope.game.players[1].addCardsToHand($scope.game.discardPile.takeCards());
			}
		}
	}

	$scope.currentRank = function() {
		return $scope.game.currentRank();
	}

	$scope.results = function() {
		return $scope.result;
	}

}

function checkWinCondition($scope) {
	$scope.game.players.forEach(function(player) {
		if (player.handSize() <= 0) {
			$scope.result = player.name + " Won!";
		}
	});
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function robotTurn($scope) {
	var randomIndex = 0;
	var description = '';
	var card = '';
	var cardsToPlay = new Array();
	for (var i = 0; i < 4; i++) {
		randomIndex = Math.floor(Math.random() * $scope.game.players[1].handSize());
		description = $scope.game.players[1].hand.cards[randomIndex].description();
		card = $scope.game.players[1].hand.takeCardByDescription(description);
		cardsToPlay.push(card);
	}
	$scope.game.discardPile.recieveNewCards($scope.game.currentRank, cardsToPlay);
	$scope.result = "Robot played " + cardsToPlay.length + " " + $scope.game.currentRank() + "'s";
	$scope.game.changeCurrentRank();
	console.log($scope.game.currentRank());
	refreshHand($scope);
}

function robotWaitForDoubts() {
	for (var i = 0; i < 20; i++) {
		var chance = Math.floor(Math.random() * 100);
		if(chance < 5) {
			return true;
		}
	}
}

function robotPressIDoubtIt($scope) {
	if ($scope.game.discardPile.isDiscardPure) {
		$scope.result = "Robot called I doubt it and was wrong. He picked up the discard pile.";
		$scope.game.players[1].addCardsToHand($scope.game.discardPile.takeCards());
	} else {
		$scope.result = "Robot called I doubt it and was Right. You picked up the discard pile.";
		$scope.game.players[0].addCardsToHand($scope.game.discardPile.takeCards());
	}
}

function refreshHand($scope) {
	$scope.cards = [];
	$scope.players = [];
	$scope.selectedCards = [];
	for (var i = 0; i < $scope.game.players[0].handSize(); i++){
		$scope.cards.push({'imageUrl': '../jasmine-standalone-2.0.0/cards/' + $scope.game.players[0].hand.cards[i].description() + '.png', 'class': $scope.game.players[0].hand.cards[i].description()});
	}
	for (var i = 0; i < $scope.game.players[0].hand.selectedCards.length; i++){
		$scope.selectedCards.push({'imageUrl': '../jasmine-standalone-2.0.0/cards/' + $scope.game.players[0].hand.selectedCards[i].description() + '.png', 'class': $scope.game.players[0].hand.selectedCards[i].description()});
	}
	for (var i = 0; i < $scope.game.players.length; i++){
		$scope.players.push({'name': $scope.game.players[i].name, 'cards': $scope.game.players[i].handSize()});
	}
}