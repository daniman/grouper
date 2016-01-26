Template.thirdStep.onRendered(function() {
    $("#prioritizeCategories").sortable({
        stop: function(event, ui) {
          var newPriorities = [];
          $('#prioritizeCategories li').each(function(index, elem) {
            newPriorities.push($(elem).attr('value'));
          });
          $('#prioritizeCategories').sortable('cancel');
          var state = Blaze.getData(event.target).state;
          var settingsObj = state.get('settings');
          settingsObj['priorities'] = newPriorities;
          state.set('settings', settingsObj);
        }
    });
});

Template.thirdStep.helpers({
  'priorities': function() {
    var settingsObj = Template.instance().data.state.get('settings');
    if (settingsObj) {
      var labelsObj = settingsObj['labels'];
      return settingsObj['priorities'].map(function(key) {
        return {
          'key': key,
          'value': labelsObj[key]
        };
      });
    } else {
      return []; // no new class yet
    }
  }
});