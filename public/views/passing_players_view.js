var PassingPlayersView = Backbone.View.extend({
  tagName: "ul",

  initialize: function() {
    this.playerViews = [];


    this.listenTo(this.collection, 'add', this.addOne);
    this.listenTo(this.collection, 'remove', this.removeOne);
  },

  attributes: {
    class: "pass-list"
  },

  render: function() {
    this.$el.empty();
    this.addAll();
  },

  addOne: function(player){
    var view = new PassingPlayerView({model: player});
    console.log(view);
    console.log(view.model.get('username'))
    console.log(userData.username)
    if (view.model.get('username') !== "table" | view.model.get('username') !== userData.username) {
      this.playerViews.push(view);
      view.render();
      this.$el.append(view.$el);
    } 
  },

  addAll: function(){
    this.$el.empty();
    this.collection.playersMinusCurrentandTable().forEach(function(player) {
      this.addOne(player);
    }, this);
    return this;
  },

  removeOne: function(player){
    console.log("In removeOne on passingPlayers view");
    var view = _.find(this.playerViews, function(view) {
      return view.model === player;
    })
    this.playerViews = _.filter(this.playerViews, function(view) { return view.model !== player;
    });
    view.remove();
  }
});
