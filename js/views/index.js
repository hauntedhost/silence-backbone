Silence.Views.Index = Backbone.View.extend({
  template: _.template($('[data-template="index"]').html()),

  events: {
    'click .timer-start': 'startTimer',
    'mouseover .timer-start': 'timerAddHover',
    'mouseout .timer-start': 'timerRemoveHover',
  },

  timerAddHover: function (event) {
    var $el = $(event.target);
    $el.addClass('hover');
  },

  timerRemoveHover: function (event) {
    var $el = $(event.target);
    $el.removeClass('hover');
  },

  startTimer: function (event) {
    event.preventDefault();

    console.log('start timer');

    // unbind events
    $(this.el).off();

    // get + set numMinutes
    $minutesKnob = this.$('input.knob.minute');
    var numMinutes = $minutesKnob.val();

    // new timer with readOnly true
    this.newTimer(90, true);

    // set opacity + visibility for elements
    this.$('canvas').css('opacity', 1);
    this.$('input.knob').css('opacity', 1);
    this.$('div.seconds').show();

    this.startClock(numMinutes);
  },

  startClock: function clock(numMinutes) {
    console.log('clock started');

    var $minutesKnob = this.$('input.knob.minute');
    var $secondsKnob = this.$('input.knob.second');

    $minutesKnob.val(numMinutes).trigger('change');
    $secondsKnob.val(0).trigger('change');

    var updateTimer = function () {
      var second = parseInt($secondsKnob.val());
      var minute = parseInt($minutesKnob.val());

      second++;

      if (second > 60) {
        second = 0;

        minute--;
        $minutesKnob.val(minute).trigger('change');
      }

      $secondsKnob.val(second).trigger('change');

      if (minute <= 0) {
        clearInterval(minutesInterval);
        clearInterval(secondsInterval);
        console.log('timer over');
      };
    }

    var timerInterval = setInterval(updateTimer, 1000);
  },

  newTimer: function (max, readOnly) {
    var timer = new Silence.Views.Timer();

    // render timer html
    this.$('[data-timer]').html(timer.render().$el);

    // minutes timer
    this.$('.knob.minute').knob({
      inputColor: '#8fc323',
      fgColor: '#8fc323',
      bgColor: '#313740',
      min: 0,
      max: max,
      readOnly: readOnly,
    });

    // seconds timer
    this.$('.knob.second').knob({
      fgColor: '#5EEFFF',
      bgColor: '#1B1F24',
      min: 0,
      max: 60,
      readOnly: true,
    });
  },

  render: function () {
    this.$el.html(this.template());

    // add timer
    this.newTimer(90, false);

    // set initial starting value
    var $knob = this.$('.knob');
    $knob.val(30).trigger('change');

    // hide seconds
    this.$('div.seconds').hide();

    return this;
  }
});
