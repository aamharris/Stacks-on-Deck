var MessageView = Backbone.View.extend({
  initialize: function(){
    $.notifyDefaults({
      type: "yoonify",
      delay: 1500,
      placement:{from: "top",align: "center"}
    });
    // listening
    this.listenTo(socket, 'newPlayer', this.playerJoin.bind(this));
    this.listenTo(socket, 'cardDrawMessage', this.cardDraw);
    this.listenTo(socket, 'cardDrawToTableMessage', this.cardDrawToTable);
    this.listenTo(socket, 'cardsDealMessage', this.cardsDeal);
    this.listenTo(socket, 'cardPlayToTableMessage', this.cardPlayToTable);
    this.listenTo(socket, 'cardPassMessage', this.cardPass);
    this.listenTo(socket, 'playerLeaveMessage', this.playerLeave);
    this.listenTo(socket, 'deckEmptyMessage', this.deckEmpty);
  },

  playerJoin: function(username){
    if (username === "table") {
      this.tableJoin();
    } else {
      $.notify({
        icon: "glyphicon glyphicon-user",
        title: "Player Join:",
        message: username + " has entered the room."
      });
    }
  },

  tableJoin: function() {
    $.notify({
        icon: "glyphicon glyphicon-phone",
        title: "Device Connect: ",
        message: "A device has connected to the game to serve as a table."
      });
  },

  cardDraw: function(username){
    $.notify({
      icon: "glyphicon glyphicon-plus",
      title: "Card Draw:",
      message: username + " has drawn a card."
    });
  },

  cardDrawToTable: function(username){
    $.notify({
      icon: "glyphicon glyphicon-plus",
      title: "Card Draw:",
      message: username + " has drawn a card to the table."
    });
  },

  cardPlay: function(username){
    $.notify({
      icon: "glyphicon glyphicon-plus",
      title: "Card Played:",
      message: username + " has played a card to the table."
    });
  },

  cardsDeal: function(username, quantity){
    var message = username + " has dealt "+ quantity +" card";
    if (parseInt(quantity) > 1) {
      message +="s to each player in the room.";
    } else if(parseInt(quantity) === 0) {
      message = username + " has started the game.";
    } else {
      message += " to each player in the room."
    }
    $.notify({
      icon: "glyphicon glyphicon-play",
      title: "Game Start:",
      message: message
    });
  },

  cardPlayToTable: function(username){
    $.notify({
      icon: "glyphicon glyphicon-plus",
      title: "Card Played:",
      message: username + " has played a card to the table."
    });
  },

  cardPass: function(usernameFrom, usernameTo){
    $.notify({
      icon: "glyphicon glyphicon-plus",
      title: "Cards Dealt:",
      message: usernameFrom + " has passed a card to " + usernameTo + "."
    });
  },

  playerLeave: function(username) {
    $.notify({
      icon: "glyphicon glyphicon-warning-sign",
      title: "Player Leave:",
      message: username + " has left the room. Their cards have been forfeited."
    });
  },

  deckEmpty: function() {
    $.notify({
      icon: "glyphicon glyphicon-warning-sign",
      title: "Deck Empty:",
      message: " There are no more cards in the deck."
    });
  }
})