Template.editPanel.onRendered(function() {
  $('.help-icon').attr({
    'data-toggle': 'tooltip',
    'data-placement': 'bottom',
    'data-html': true,
    'title': '<span style="text-align: center;"><strong>Tips:</strong></span> <br /> ' +
          '1. Double click circles for more information.<br .> ' +
          '2. Double click hulls for more information.<br /> ' +
          '3. Click two consecutive circles to swap them. <br />' +
          '4. Drag circles to change group arrangements. <br />' +
          '5. Click backspace on selected circle to remove them.'
  });
  $('.help-icon').tooltip();
  $('[data-toggle="tooltip"]').tooltip();
});

Template.editPanel.events({
  'click #resize': function(event) {
    if ($('#resize').hasClass('glyphicon-resize-full')) {
      $('#resize').removeClass('glyphicon-resize-full');
      $('#resize').addClass('glyphicon-resize-small');

      $('#bubble-canvas').animate({
        'height': '100%',
        'width': '100%'
      }, 1000, function() {
        $(window).trigger('resize');
      });
      $('#filterContainer').css('display', 'none');
    } else {
      $('#resize').removeClass('glyphicon-resize-small');
      $('#resize').addClass('glyphicon-resize-full');

      $('#bubble-canvas').css({
        'height': 'calc(100% - 50px)',
        'width': 'calc(100% - 250px)',
        'transition': '1s'
      });
      setTimeout(function() {
        $(window).trigger('resize');
      }, 1000);
      $('#filterContainer').css('display', 'block');
    }
  }
})

Template.bubbles.onRendered(function() {
  var group = Template.instance().data;
  // console.log(Template.instance());
  buildGroup(group);
});

buildGroup = function(group) {
    buildBubbles(group);
    var students = group['data'];
    var filters = group['filters'];

    $('.bubble').each(function(i, bubble) {
      var item = group.settings.priorities[Session.get('color_index')];
      var attr = students[i][item];
      $(bubble).css({
          'background-color': Grouper.colors.get_color(item, attr, filters)
      });
    });

    var label = $('#labels').find(':selected').val();
    $('.bubble .bubble_text').each(function(i, bubble) {
      $(bubble).html(students[i][label]);
    });

    // var curr = Classes.findOne({_id: Session.get('active')});
    // var filter = curr.settings.priorities[Session.get('filter_index')];
    // var categories = curr.filters[filter];
}
