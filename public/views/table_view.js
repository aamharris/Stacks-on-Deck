var TableView = Backbone.View.extend({
  initialize: function(cards) {
    this.collection = cards;
    this.$el.className = "table-cards"
    this.listenTo(this.collection, "change", this.render);
  },


  render: function(){
    this.$el.empty();
    this.addAll();
  },

  addOne: function(card){
    var view = new CardView(card);
    view.render();
    this.$el.append(view.$el)
  },

  addAll: function(){
    this.collection.forEach(function(card) {
      this.addOne(card);
    }, this);
    return this;
  }
})