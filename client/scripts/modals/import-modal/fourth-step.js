Template.fourthStep.events({
  'click #groups': function(e, t) {
    var settingsObj = t.data.state.get('settings');
    settingsObj.sizes.pref = 'groups';
    t.data.state.set('settings', settingsObj);
  },

  'click #people': function(e, t) {
    var settingsObj = t.data.state.get('settings');
    settingsObj.sizes.pref = 'people';
    t.data.state.set('settings', settingsObj);
  },

  'keyup, change .sizesEdit': function(e, t) {
    var pref = $(e.currentTarget).attr('pref');
    var settingsObj = t.data.state.get('settings');
    settingsObj.sizes[pref] = e.currentTarget.value;
    t.data.state.set('settings', settingsObj);
  },

  'click .numInc.glyphicon-plus': function(e, t) {
    var size = parseInt($('.sizesEdit').val());
    $('.sizesEdit').val(size+1);
    $('.sizesEdit').trigger('change');
  },

  'click .numInc.glyphicon-minus': function(e, t) {
    var size = parseInt($('.sizesEdit').val());
    $('.sizesEdit').val(size-1);
    $('.sizesEdit').trigger('change');
  }
});

Template.fourthStep.helpers({
  sizes: function() {
    var settingsObj = Template.instance().data.state.get('settings');
    return settingsObj.sizes;
  },

  pref: function(pref) {
    var settingsObj = Template.instance().data.state.get('settings');
    return settingsObj.sizes.pref === pref; 
  }
});