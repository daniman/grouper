Template.filters.helpers({
  filters: function() {
    var group = Classes.findOne({_id: Session.get('active')});
    var color_map = '';

    var filters = group.settings.priorities.map(function(item, index) {
      if (Session.equals('color_index', index)) {
        var students = group['data'];
        var filters = group['filters'];


        $('.bubble').each(function(i, bubble) {
            var attr = students[i][item];
            $(bubble).css({
                'background-color': Grouper.colors.get_color(item, attr, filters)
            });
        })

        var categories = filters[item];
        categories.forEach(function(cat) {
            color_map += '<li>' +
                            '<div class="color_map_color" style="background-color: ' + Grouper.colors.get_color( item, cat, filters) + '"></div>' +
                            '<span style="color:' + Grouper.colors.get_color(item, cat, filters) + '"> ' + cat + '</span>' + 
                        '</li>';
        });
        color_map = '<ul class="color_map">' + color_map + '</ul>'; 
      }

      return {
        'label': item,
        'index': index,
        'color_selected': Session.equals('color_index', index), //default to selecting first in list
        'label_selected': Session.equals('label_index', index), //default to selecting second in list
        'color_map': Spacebars.SafeString(color_map)
      }
    });

    return filters;
  }
});

Template.filters.events({
  'change #labels': function(event) {
    var label = event.target.value;
    var bubbles = Classes.findOne({_id: Session.get('active')})['data'];
    $('.bubble .bubble_text').each(function(i, bubble) {
        $(bubble).html(bubbles[i][label]);
    })
    Session.set('label', label);
  },

  'click .filter_cat': function() {
    var index = event.target.value.split('_')[0];
    Session.set('color_index', parseInt(index));
  }
});