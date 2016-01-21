(function(){if (Meteor.isClient) {
  
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
      if (!Session.get('bubble_index')) {
        Session.set('bubble_index', 0);
      }
      if (!Session.get('hull_index')) {
        Session.set('hull_index', 0);
      }
      if (!Session.get('import_class')) {
        Session.set('import_class', {
          'name': 'hello world'
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

}

})();
