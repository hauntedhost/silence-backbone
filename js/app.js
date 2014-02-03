var Silence = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Silence.Routers.Main();
    Backbone.history.start();
  }
};
