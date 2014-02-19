describe("Player", function() {
  var player;

  beforeEach(function() {
      player = new Player("Jeremy");
  });

  it("should have a name", function() {
    expect(player.name).toEqual("Jeremy");
  });

  it("should have a hand", function() {
      expect(player.hand.prototype).toEqual(new Hand().prototype);
  });

  it("method handSize should return size of hand", function() {
      expect(player.handSize()).toEqual(0);
  });

  it("method addCardsToHand should add the cards you pass it to the hand", function() {
      expect(player.handSize()).toEqual(0);
      player.addCardsToHand([new PlayingCard("Ace", "Spades"), new PlayingCard("Ace", "Hearts"), new PlayingCard("Ace", "Kings"), new PlayingCard("Ace", "Diamonds")]);
      expect(player.handSize()).toEqual(4);
  });

  it("method takeCardsFromHand should take the cards you pass it from the hand", function() {
      expect(player.handSize()).toEqual(0);
      player.addCardsToHand([new PlayingCard("Ace", "Spades"), new PlayingCard("Ace", "Hearts"), new PlayingCard("Ace", "Kings"), new PlayingCard("Ace", "Diamonds")]);
      expect(player.handSize()).toEqual(4);
      var cards = player.takeCardsFromHand([new PlayingCard("Ace", "Spades"), new PlayingCard("Ace", "Hearts")]);
      expect(player.handSize()).toEqual(2);
      expect(cards.length).toEqual(2);
      expect(cards[0].rank).toEqual(new PlayingCard("Ace", "Spades").rank);
  });

  it("should create a player just like the first by round-tripping JSON", function() {
      var aceJSON = JSON.stringify(player);
      var fromJSON = player.fromJSON(aceJSON);
      expect(player.hand.prototype).toEqual(fromJSON.hand.prototype);
      expect(fromJSON.__proto__).toEqual(player.__proto__);
  });

});