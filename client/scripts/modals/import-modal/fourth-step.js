Template.fourthStep.events({
  'click #fourth-back': function(e, t) {
    $('#importFourthStep').modal('hide');
    $('#importThirdStep').modal('show');
  },

  'click #fourth-next': function(e, t) {
    $('#importFourthStep').modal('hide');

    var group = {};
    group['data'] = t.data.state.get('data');
    group['filters'] = t.data.state.get('filters');
    group['settings'] = t.data.state.get('settings');
    group['name'] = t.data.state.get('name');

    var groupified = helpers.groupify(group);

    var newClassId = Meteor.call('insertClass', Meteor.userId(), groupified);
    Session.set('active', newClassId);
    t.data.state = new ReactiveDict();
  },

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
  },

  'click .numInc.glyphicon-minus': function(e, t) {
    var size = parseInt($('.sizesEdit').val());
    $('.sizesEdit').val(size-1)
  }
});

Template.fourthStep.helpers({
  sizes: function() {
    var settingsObj = Template.instance().data.state.get('settings');
    if (settingsObj) return settingsObj.sizes;
  },

  people: function() {
    var settingsObj = Template.instance().data.state.get('settings');
    if (settingsObj) return settingsObj.sizes.pref === 'people';
  },

  groups: function() {
    var settingsObj = Template.instance().data.state.get('settings');
    if (settingsObj) return settingsObj.sizes.pref === 'groups';
  }
});