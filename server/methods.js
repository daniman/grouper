Meteor.methods({

  'moveBubble': function(data) {
    var update = {}
    update['data.' + data.bubble_index + '.group'] = data.new_group;
    Classes.update({
      _id: data.class_id
    }, {$set: update});
  },

  'saveFilters': function(class_id, filters) {
    Classes.update({
      _id: class_id
    }, {$set: {filters: filters}});
  },

  'updateName': function(class_id, newName) {
    Classes.update({
      _id: class_id
    }, {$set: {name: newName}});
  },

  'updatePriorities': function(class_id, newPriorities) {
    Classes.update({
      _id: class_id
    }, {$set: {'settings.priorities': newPriorities}})
  }

});
