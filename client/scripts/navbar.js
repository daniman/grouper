Template.navbar.helpers({
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

Template.navbar.events({
  'click .classlist_item': function(event) {
    var name = $(event.target).attr('value');
    Session.set('active', Classes.findOne({name: name})['_id']);
    Session.set('color_index', 0);
    Session.set('label_index', 1);
    buildGroup();
  },

  'click .classlist .dropdown-menu': function(event) {
    $('.dropdown-toggle').dropdown();
  }
});
