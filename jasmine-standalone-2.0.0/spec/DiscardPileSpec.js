describe("Discard Pile", function() {
	var pile;

	beforeEach(function() {
	   	pile = new DiscardPile();
	});

	it("should have an array of cards", function() {
		expect(pile.cards.prototype).toEqual(Array().prototype);
	});

	it("method size should return cards amount", function() {
	    expect(pile.size()).toEqual(0);
	});

	it("method recieveNewCards should add cards to cards", function() {
	    pile.recieveNewCards("King", [new PlayingCard("King", "Spades"), new PlayingCard("King", "Hearts"), new PlayingCard("King", "Spades"), new PlayingCard("Ace", "Spades")]);
	    expect(pile.isDiscardPure).toEqual(false);
	    expect(pile.cards.length).toEqual(4);
	});

	it("method takeCards should take all the cards out of the discard pile", function() {
	    pile.recieveNewCards("Ace", [new PlayingCard("Ace", "Spades"), new PlayingCard("Ace", "Hearts"), new PlayingCard("Ace", "Spades"), new PlayingCard("Ace", "Spades")]);
	    expect(pile.size()).toEqual(4);
	    var cards = pile.takeCards();
	    expect(pile.size()).toEqual(0);
	    expect(cards.length).toEqual(4);
	    expect(cards[0].rank).toEqual(new PlayingCard("Ace", "Spades").rank);
	});

	it("should create a discard pile just like the first by round-tripping JSON", function() {
      var aceJSON = JSON.stringify(pile);
      var fromJSON = pile.fromJSON(aceJSON);
      expect(pile.cards.prototype).toEqual(fromJSON.cards.prototype);
      expect(fromJSON.__proto__).toEqual(pile.__proto__);
 	 });

});