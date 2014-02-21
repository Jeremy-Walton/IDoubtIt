describe("Hand", function() {
	var hand;

	beforeEach(function() {
	   	hand = new Hand();
	});

	it("should have an array of cards and an array of selected cards", function() {
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

	it("method selectedCards should return cards that are selected.", function() {
	    var card1 = new PlayingCard("Ace", "Spades");
	    card1.selected = true;
	    hand.addCards([card1, card1]);
	    hand.addCards([new PlayingCard("Ace", "Spades"), new PlayingCard("Ace", "Hearts")]);
	    expect(hand.size()).toEqual(4);
	    var selectedCards = hand.selectedCards();
	    expect(selectedCards.length).toEqual(2);
	});

	it("method takeCards should take the cards you provided out of the hand", function() {
	    hand.addCards([new PlayingCard("Ace", "Spades"), new PlayingCard("Ace", "Hearts"), new PlayingCard("Ace", "Kings"), new PlayingCard("Ace", "Diamonds")]);
	    expect(hand.size()).toEqual(4);
	    var cards = hand.takeCards([new PlayingCard("Ace", "Spades")]);
	    expect(hand.size()).toEqual(3);
	    expect(cards.length).toEqual(1);
	    expect(cards[0].rank).toEqual(new PlayingCard("Ace", "Spades").rank);
	});

	it("method sortCards should sort the cards", function() {
	    hand.addCards([new PlayingCard("2", "Spades"), new PlayingCard("King", "Hearts"), new PlayingCard("9", "Clubs"), new PlayingCard("Ace", "Spades")]);
	    hand.sortCards();
	    var card = hand.cards[0];
	    expect(card.rank).toEqual("Ace");

	});

	it("method takeCardByDescription", function() {
	    hand.addCards([new PlayingCard("2", "Spades"), new PlayingCard("King", "Hearts"), new PlayingCard("9", "Clubs"), new PlayingCard("Ace", "Spades")]);
	    var card = hand.takeCardByDescription("Ace of Spades");
	    expect(card.rank).toEqual("Ace");

	});

	it("should create a hand just like the first by round-tripping JSON", function() {
      var aceJSON = JSON.stringify(hand);
      var fromJSON = hand.fromJSON(aceJSON);
      expect(hand.cards.prototype).toEqual(fromJSON.cards.prototype);
      expect(fromJSON.__proto__).toEqual(hand.__proto__);
  });

});