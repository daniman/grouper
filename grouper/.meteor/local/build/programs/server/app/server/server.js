(function(){if (Meteor.isServer) {

  Meteor.methods({

    // TODO: send deltas...
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
        }, {$set: {'settings.priorities': newPriorities}});
    },

    'updateLabels': function(class_id, newLabels) {
        Classes.update({
            _id: class_id
        }, {$set: {'settings.labels': newLabels}});
    },

    'updateSizesPref': function(class_id, newPref) {
        Classes.update({
            _id: class_id
        }, {$set: {'settings.sizes.pref': newPref}})
    },

    'updateSize': function(class_id, newSize) {
        var pref = Classes.findOne({_id: class_id})['settings']['sizes']['pref'];
        var obj = {};
        obj['settings.sizes.' + pref] = newSize;
        Classes.update({
            _id: class_id
        }, {$set: obj});
    }

  });

}

})();
