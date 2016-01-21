Template.bubbles.onRendered(function() {
  $('#help_tooltip').attr({
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
  $('#help_tooltip').tooltip();

  buildGroup();

  /** TODO: shell function to complete a later time **/
  Classes.find({}).observe({
    added: function(group) {
      console.log(group);
    },
    changed: function(newGroup, oldGroup) {
      if (Session.get('active') == newGroup._id) {
        for (var student in newGroup.data) {
          if (newGroup.data[student].group !== oldGroup.data[student].group) {
            student_dict[student].group = newGroup.data[student].group;
            force.start();
            // force.stop();
          }
        }
      }
    },
    removed: function(group) {
      console.log(group);
    }
  });
});

buildGroup = function() {
    var group = Classes.findOne({_id: Session.get('active')});
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