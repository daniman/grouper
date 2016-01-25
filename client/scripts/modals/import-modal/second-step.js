Template.secondStep.events({
  'click #second-back': function(e, t) {
    $('#importSecondStep').modal('hide');
    $('#importFirstStep').modal('show');
  },

  'click #second-next': function(e, t) {
    $('#importSecondStep').modal('hide');
    $('#importThirdStep').modal('show');
  },

  'keyup .editText': function(e, t) {
    var settingsObj = t.data.state.get('settings');
    settingsObj.labels[e.target.placeholder] = e.target.value;
    t.data.state.set('settings', settingsObj);
  },

  'click .cancelItem': function(e, t) {
    var settingsObj = t.data.state.get('settings');
    var item = $(e.currentTarget).attr('value');
    settingsObj['priorities'].splice(settingsObj['priorities'].indexOf(item), 1);
    t.data.state.set('settings', settingsObj);
  },

  'click .addItem': function(e, t) {
    var settingsObj = t.data.state.get('settings');
    var item = $(e.currentTarget).attr('value');
    settingsObj['priorities'].push(item);
    t.data.state.set('settings', settingsObj);
  }
});

Template.secondStep.helpers({
  'active': function() {
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
  },

  'inactive': function() {
    var settingsObj = Template.instance().data.state.get('settings');
    if (settingsObj) {
      var labelsObj = settingsObj['labels'];
      var inactiveLabels = Object.keys(labelsObj).filter(function(key) {
        if (settingsObj['priorities'].indexOf(key) < 0) {
          return key;
        }
      });
      return inactiveLabels.map(function(key) {
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