$(document).ready(function(){
  var toUser = "";

  $(document).on("click", ".show-passing-player-list", function(e){
    e.preventDefault();
    $(".pass-list").slideDown(300);
  });

  //Table Buttons
  $(document).on("click", "#table-draw-card", function(){
    $(".pass-list").hide();
    socket.emit("tableDeckDraw")
  });

  $(document).on("click", "#table-discard-card", function(e){
    e.preventDefault;
    cardId = table.activeCard.attributes.id
    $(".pass-list").hide();
    socket.emit("discardTableCard", cardId);
  });

  $(document).on("click", "#table-get-card", function(e){
    e.preventDefault;
    cardId = table.activeCard.attributes.id
    $(".pass-list").hide();
    socket.emit("getTableCard", cardId);
  });

  $(document).on("click", "#collect-table-cards", function(e){
    e.preventDefault;
    $(".pass-list").hide();
    socket.emit("userCollectsTable");
  });

  //Hand Buttons
  $(document).on("click", "#draw-card", function(){
    $(".pass-list").hide();
    socket.emit("drawCard")
  });

  $(document).on("click", "#hand-discard-button", function(){
    $(".pass-list").hide();
    hand.discard();
  });

  $(document).on("click", "#hand-play-button", function(){
    $(".pass-list").hide();
    hand.playCard();
  });

  $(document).on("click", ".pass-to", function(e){
    e.preventDefault();
    var id = hand.activeCard.id;
    hand.unsetActiveCard();
    toUser = $(this).attr("id")
    $(".pass-list").hide();
    socket.emit("passCard", {toUser: toUser, cardId: id})
  });

  $(document).on("click", "#down-arrow", function(){
    var count = parseInt($("#count").text())
    if (count > 0) {
      $("#count" ).html(count - 1)
    }
  });

  $(document).on("click", "#up-arrow", function(){
    var count = parseInt($("#count").text())
    var numPlayers = playerList.length
    for(var i = 0; i < playerList.length; i++) {
      if (playerList.models[i].get('username') === 'table') {
        numPlayers = numPlayers-1;
      }
    }
    var maxNum = (52/numPlayers)

    if (count < maxNum) {
      $("#count").html(count + 1)
    }
  });

  $(document).on("click", "#start-game-btn", function() {
    var dealingCount = parseInt($("#count").text())
    dealCards({dealingCount: dealingCount});
  });

  $(document).on("click", ".table-buttons", function(){
    $(".table-buttons div").hide();
  });

  // Help button
  $(document).on("click", ".help-button", function(e) {
    e.preventDefault();
    $("body").find(".help-menu").slideToggle("fast");
  })

});
