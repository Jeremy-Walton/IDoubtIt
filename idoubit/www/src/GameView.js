function gameView($scope, $timeout) {
	$scope.game = new Game();
	$scope.game.addPlayer("Jeremy");
	$scope.game.addPlayer("Sam");
	$scope.game.setup();
	$scope.result = "Take your turn!";

	 var client = new Apigee.Client({
          orgName:'jeremy-walton',
          appName:'idoubtit'
      });

      var options = {
          type:'game',
          game:$scope.game
      };

    $scope.saveGame = function() {
	    client.createEntity(options, function (error, response) { 
		    if (error) { // Error - the book was not saved properly
		    	alert("Could not create the book. Did you enter your orgName (username) correctly on line 18 of index.html?");
		    } else {
		    	// alert(JSON.stringify(response.get()));
		    	alert("Game saved");
		    }
	    });
    }

	$scope.refreshHand = function() {
		$scope.cards = [];
		$scope.players = [];
		$scope.selectedCards = [];
		for (var i = 0; i < $scope.game.players[0].handSize(); i++){
			$scope.cards.push({'imageUrl': "cards/" + $scope.game.players[0].hand.cards[i].description() + ".png", 'class': $scope.game.players[0].hand.cards[i].description()});
		}
		for (var i = 0; i < $scope.game.players[0].hand.selectedCards.length; i++){
			$scope.selectedCards.push({'imageUrl': "cards/" + $scope.game.players[0].hand.selectedCards[i].description() + ".png", 'class': $scope.game.players[0].hand.selectedCards[i].description()});
		}
		for (var i = 0; i < $scope.game.players.length; i++){
			$scope.players.push({'name': $scope.game.players[i].name, 'cards': $scope.game.players[i].handSize()});
		}
	}

	$scope.refreshHand();
	
	$scope.playerNames = function() {
		var playerNames = "";
		for (var i = 0; i < $scope.game.players.length; i++) {
			playerNames += " | " + $scope.game.players[i].name + " | ";
		}
		return playerNames;
	}

	$scope.discardPile = function() {
		if ($scope.game.discardPile.size() > 0) {
			return "cards/backs_blue.png";
		} else {
			return "cards/Blank.png";
		}
	}

	$scope.playerTurn = function() {
		return $scope.game.whosTurn();
	}


	$scope.cardSelect = function(card) {
		if ($scope.game.whosTurn() == $scope.game.players[0].name) {
			if ($scope.game.players[0].hand.selectedCards.length < 4) {
				var index = card.class;
				$scope.game.players[0].hand.selectedCards.push($scope.game.players[0].hand.takeCardByDescription(index));
			}
		}
		$scope.refreshHand();
	}

	$scope.cancel = function() {
		if ($scope.game.players[0].hand.selectedCards.length > 0) {
			$scope.game.players[0].addCardsToHand($scope.game.players[0].hand.selectedCards);
			$scope.game.players[0].hand.selectedCards = [];
			$scope.refreshHand();
		}
	}

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
			if($scope.robotWaitForDoubts()) {
				$scope.robotPressIDoubtIt();
			}
			$scope.game.changeTurnOrder();
			$scope.refreshHand();

			$timeout(function() {
				$scope.robotTurn();
				$scope.checkWinCondition();
			}, 1000);

			$timeout(function() {
				$scope.game.changeTurnOrder();
				$scope.checkWinCondition();
				$scope.refreshHand();
			}, 5000);
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

	//All methods after this do not directly change the display. They change the game and the above methods update the view.

	$scope.checkWinCondition = function() {
		$scope.game.players.forEach(function(player) {
			if (player.handSize() <= 0) {
				$scope.result = player.name + " Won!";
			}
		});
	}

	$scope.robotTurn = function() {
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
		$scope.refreshHand();
	}
	
	$scope.robotWaitForDoubts = function() {
		for (var i = 0; i < 20; i++) {
			var chance = Math.floor(Math.random() * 100);
			if(chance < 5) {
				return true;
			}
		}
	}

	$scope.robotPressIDoubtIt = function() {
		if ($scope.game.discardPile.isDiscardPure) {
			$scope.result = "Robot called I doubt it and was wrong. He picked up the discard pile.";
			$scope.game.players[1].addCardsToHand($scope.game.discardPile.takeCards());
		} else {
			$scope.result = "Robot called I doubt it and was Right. You picked up the discard pile.";
			$scope.game.players[0].addCardsToHand($scope.game.discardPile.takeCards());
		}
	}

}