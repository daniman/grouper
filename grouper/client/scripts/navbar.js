if (Meteor.isClient) {
  
  Template.navbar.helpers({
    activeClass: function() {
      console.log('session changed?');
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

  Template.navbar.onCreated(function() {
    if (Meteor.user()) {
      var user = Meteor.users.findOne({_id: Meteor.user()._id});
      if (!Session.get('active')) {
        Session.set('active', user.profile.classes[0]);
      }
      if (!Session.get('color_index')) {
        Session.set('color_index', 0);
      }
      if (!Session.get('label_index')) {
        Session.set('label_index', 1);
      }
    }
  });

  Template.navbar.events({
    'click .classlist_item': function(event) {
      var name = $(event.target).attr('value');
      Session.set('active', Classes.findOne({name: name})['_id'])
        // $('#undo').hide();
        // $('#redo').hide();
        // buildPage();
    },
    'click .classlist .dropdown-menu': function(event) {
      $('.dropdown-toggle').dropdown();
    }
  });

}