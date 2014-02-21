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

	it("should be selected or not.", function() {
	    expect(card.selected).toEqual(false);
	    card.selected = true;
	    expect(card.selected).toEqual(true);
	});

	it("should have a description", function() {
	    expect(card.description()).toEqual("Ace of Spades");
	});

	it("should create a card just like the first by round-tripping JSON", function() {
	    var aceJSON = JSON.stringify(card);
	    var fromJSON = card.fromJSON(aceJSON);
	    expect(fromJSON.rank).toEqual(card.rank);
	    expect(fromJSON.suit).toEqual(card.suit);
	    expect(fromJSON.value).toEqual(card.value);
	    expect(fromJSON.__proto__).toEqual(card.__proto__);
	});

});