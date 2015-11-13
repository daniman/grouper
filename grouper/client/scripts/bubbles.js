Template.bubbles.onRendered(function() {
  var student_dict = buildBubbles(Grouper.active_group);
  var group = Classes.findOne({_id: Session.get('active')});
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
  })

  /** TODO: shell function to complete a later time **/
  Classes.find({}).observe({
    added: function(group) {
      // console.log(group);
    },
    changed: function(newGroup, oldGroup) {
      // console.log('group updated');
    },
    removed: function(group) {
      // console.log(group);
    }
  });

});
