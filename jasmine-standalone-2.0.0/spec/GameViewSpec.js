describe("Game View", function() {
	var view;

	beforeEach(function() {
	   	view = new GameView();
	});

	it("should be able to setup a game", function() {
		view.setup();
	    expect(view.game.players[0].name).toEqual("Jeremy");
	    expect(view.game.players[0].handSize()).toEqual(26);
	});

	it("Can't really test this class :(", function() {
	});

});