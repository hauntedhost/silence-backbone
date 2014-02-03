Silence.Routers.Main = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = $('#content');
  },

  routes: {
    '': 'index'
  },

  index: function () {
    var index = new Silence.Views.Index();
    this.$rootEl.html(index.render().$el);
  }

});
