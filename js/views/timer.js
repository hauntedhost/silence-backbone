Silence.Views.Timer = Backbone.View.extend({
  template: _.template($('[data-template="timer"]').html()),

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
