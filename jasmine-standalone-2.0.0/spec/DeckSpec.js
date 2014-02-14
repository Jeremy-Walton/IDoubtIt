describe("Deck", function() {
	var deck;

	beforeEach(function() {
	   	deck = new Deck();
	});

	it("should have an array of cards", function() {
		expect(deck.cards.prototype).toEqual(Array().prototype);
	});

	it("method size should return cards amount", function() {
	    expect(deck.size()).toEqual(0);
	});

	it("method makeDeck should give the deck 52 cards", function() {
	   	deck.makeDeck();
	    expect(deck.size()).toEqual(52);
	});

	it("method shuffle should shuffle the deck", function() {
	   	deck.makeDeck();
	   	var deck2 = new Deck();
	   	deck2.makeDeck();
	   	deck2.shuffle();
	   	var i = 0;
	   	for (var j = 0; j < deck.size(); j++) {
	   		if ((deck.cards[j].rank == deck2.cards[j].rank) && (deck.cards[j].suit == deck2.cards[j].suit) {

	   		} else {
	   			i++;
	   		}
	   	}
	    expect(i).not.toEqual(52);
	});

	it("method takeTopCard should remove a card from the deck and return it.", function() {
	   	deck.makeDeck();
	    var card = deck.takeTopCard();
	    expect(deck.size()).toEqual(51);
	    expect(card.description()).toEqual("King of Spades");
	});

});