Template.deleteGroupModal.created = function() {
    this.name = Classes.findOne({_id: Session.get('active')}).name;
    this.confirmed = new ReactiveVar(false);
};

Template.deleteGroupModal.events({
    'keyup #confirm-class': function(e, t) {
        if (e.currentTarget.value === t.name) {
            t.confirmed.set(true);
        } else {
            t.confirmed.set(false);
        }
    },

    'click #delete-group-final': function(e, f) {
        Meteor.call('deleteClass', Meteor.userId(), Session.get('active'), function() {
            $('#deleteGroupModal').modal('hide');
            $('#editModal').modal('hide');
            Session.set('active', Meteor.user().profile.classes[0]);
        });
    }
});

Template.deleteGroupModal.helpers({
    name: function() {
        var curr = Classes.findOne({_id: Session.get('active')});
        return curr.name;
    },

    confirmed: function() {
        return Template.instance().confirmed.get();
    }
});
