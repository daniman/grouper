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
}