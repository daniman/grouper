Template.dropDown.onRendered(function() {
  var group = Classes.findOne({_id: Session.get('active')});
  Blaze.renderWithData(Template.bubbles, group, document.getElementById('bubble-canvas'));
});

Template.dropDown.helpers({
  activeClass: function() {
    return Classes.findOne({_id: Session.get('active')})['name'];
  },
  classlist: function() {
    var user = Meteor.users.findOne({_id: Meteor.user()._id});

    if (user && user.profile && user.profile.classes) {
      return user.profile.classes.map(function(classId) {
        return {
          name: Classes.findOne({_id: classId}).name,
          active: classId === Session.get('active')
        };
      });
    }
  }
});

Template.dropDown.events({
  'click .classlist_item': function(event) {
    var name = $(event.target).attr('value');
    var group = Classes.findOne({name: name});
    Session.set('active', group['_id']);
    Session.set('color_index', 0);
    Session.set('label_index', 1);

    Blaze.remove(Blaze.getView(document.getElementById('bubbleContainer')));
    Blaze.renderWithData(Template.bubbles, group, document.getElementById('bubble-canvas'));
  },

  'click .classlist .dropdown-menu': function(event) {
    $('.dropdown-toggle').dropdown();
  }
});
