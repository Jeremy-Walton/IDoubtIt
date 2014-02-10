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

	it("method addCards should add the cards you pass it", function() {
		expect(pile.size()).toEqual(0);
	    pile.addCards([new PlayingCard("Ace", "Spades"), new PlayingCard("Ace", "Hearts")]);
	    pile.addCards([new PlayingCard("Ace", "Spades"), new PlayingCard("Ace", "Hearts")]);
	    expect(pile.size()).toEqual(4);
	});

	it("method takeCards should take all the cards out of the discard pile", function() {
	    pile.addCards([new PlayingCard("Ace", "Spades"), new PlayingCard("Ace", "Hearts"), new PlayingCard("Ace", "Spades"), new PlayingCard("Ace", "Spades")]);
	    expect(pile.size()).toEqual(4);
	    var cards = pile.takeCards();
	    expect(pile.size()).toEqual(0);
	    expect(cards.length).toEqual(4);
	    expect(cards[0].rank).toEqual(new PlayingCard("Ace", "Spades").rank);
	});

});