Template.importModal.created = function() {
  this.state = new ReactiveDict();
  this.step = new ReactiveVar(1);
};

Template.importModal.helpers({
  state: function() {
    return Template.instance().state;
  },

  step: function(num) {
    return Template.instance().step.get() === num;
  }
});

Template.importModal.events({
  'click #import-close': function(e, t) {
    $('#importModal').modal('hide');
  },

  'click #import-back': function(e, t) {
    t.step.set(t.step.get() - 1);
  },

  'click #import-next': function(e, t) {
    if (! $(e.currentTarget).hasClass('inactive')) {
      t.step.set(t.step.get() + 1);
    }
  },

  'click #import-finish': function(e, t) {
    var group = {};
    group['data'] = t.state.get('data');
    group['filters'] = t.state.get('filters');
    group['settings'] = t.state.get('settings');
    group['name'] = t.state.get('name');

    var groupified = helpers.groupify(group);
    Meteor.call('insertClass', Meteor.userId(), groupified, function(err, classId) {
      if (err) console.log(err);
      if (!err) {
        Session.set('active', classId);
        var group = Classes.findOne({_id: classId});
        Blaze.remove(Blaze.getView(document.getElementById('bubbleContainer')));
        Blaze.renderWithData(Template.bubbles, group, document.getElementById('bubble-canvas'));
      };
    });

    $('#importModal').modal('hide');
  }
});
