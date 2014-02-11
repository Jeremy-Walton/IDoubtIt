describe("Hand", function() {
	var hand;

	beforeEach(function() {
	   	hand = new Hand();
	});

	it("should have an array of cards", function() {
		expect(hand.cards.prototype).toEqual(Array().prototype);
	});

	it("method size should return cards amount", function() {
	    expect(hand.size()).toEqual(0);
	});

	it("method addCards should add the cards you pass it", function() {
		expect(hand.size()).toEqual(0);
	    hand.addCards([new PlayingCard("Ace", "Spades"), new PlayingCard("Ace", "Hearts")]);
	    hand.addCards([new PlayingCard("Ace", "Spades"), new PlayingCard("Ace", "Hearts")]);
	    expect(hand.size()).toEqual(4);
	});

	it("method takeCards should take the cards you provided out of the hand", function() {
	    hand.addCards([new PlayingCard("Ace", "Spades"), new PlayingCard("Ace", "Hearts"), new PlayingCard("Ace", "Kings"), new PlayingCard("Ace", "Diamonds")]);
	    expect(hand.size()).toEqual(4);
	    var cards = hand.takeCards([new PlayingCard("Ace", "Spades")]);
	    expect(hand.size()).toEqual(3);
	    expect(cards.length).toEqual(1);
	    expect(cards[0].rank).toEqual(new PlayingCard("Ace", "Spades").rank);
	});

});