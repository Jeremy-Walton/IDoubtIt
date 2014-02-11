describe("Playing Card", function() {
	var card;

	beforeEach(function() {
	   	card = new PlayingCard("Ace", "Spades");
	});

	it("should have a rank and suit", function() {
	    expect(card.rank).toEqual("Ace");
	    expect(card.suit).toEqual("Spades");
	});

	it("should have a value", function() {
	    expect(card.value).toEqual(0);
	});

	it("should have a description", function() {
	    expect(card.description()).toEqual("Ace of Spades");
	});

});