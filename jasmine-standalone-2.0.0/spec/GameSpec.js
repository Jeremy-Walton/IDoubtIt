describe("Game", function() {
  var game;

  beforeEach(function() {
      game = new Game();
  });

  it("should have a deck", function() {
    expect(game.deck.prototype).toEqual(new Deck().prototype);
  });

  it("should have a discard pile", function() {
      expect(game.discardPile.prototype).toEqual(new DiscardPile().prototype);
  });

  it("should have a player array", function() {
      expect(game.players.prototype).toEqual(new Array().prototype);
  });

  it("method addPlayer should add a player to the player array", function() {
      game.addPlayer("Jeremy");
      expect(game.players.length).toEqual(1);
      expect(game.players[0].name).toEqual("Jeremy");
  });

  it("method whosTurn should return name of whos turn it is", function() {
      game.addPlayer("Jeremy");
      game.addPlayer("Sam");
      expect(game.whosTurn()).toEqual("Jeremy");
  });

  it("method changeTurnOrder should rotate the turn order", function() {
      game.addPlayer("Jeremy");
      game.addPlayer("Sam");
      expect(game.whosTurn()).toEqual("Jeremy");
      game.changeTurnOrder();
      expect(game.whosTurn()).toEqual("Sam");
  });

  it("method dealCards deals all the cards to the players", function() {
      game.addPlayer("Jeremy");
      game.addPlayer("Sam");
      game.addPlayer("Bob");
      game.deck.makeDeck();
      game.deck.shuffle();
      game.dealCards();
      expect(game.players[0].handSize()).toEqual(17);
      expect(game.players[1].handSize()).toEqual(17);
      expect(game.players[2].handSize()).toEqual(18);
  });

  it("method setup does the above automagically", function() {
      game.addPlayer("Jeremy");
      game.addPlayer("Sam");
      game.addPlayer("Bob");
      game.setup();
      expect(game.players[0].handSize()).toEqual(17);
      expect(game.players[1].handSize()).toEqual(17);
      expect(game.players[2].handSize()).toEqual(18);
  });

});