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

            var classId = Meteor.user().profile.classes[0];
            Session.set('active', classId);
            var group = Classes.findOne({_id: classId});
            Blaze.remove(Blaze.getView(document.getElementById('bubbleContainer')));
            Blaze.renderWithData(Template.bubbles, group, document.getElementById('bubble-canvas'));
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
