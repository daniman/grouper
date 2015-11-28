Template.editModal.onRendered(function() {
    $("#edit_data_current_categories").sortable({
        update: function(event, ui) {
            var priorities = [];
            $('#edit_data_current_categories').children().each(function(i, elem) {
                priorities.push(elem.getAttribute('value'));
            });
            Meteor.call('updatePriorities', Session.get('active'), priorities);
        }
    });
});

Template.editModal.helpers({
    data: function() {
        var  curr = Classes.findOne({_id: Session.get('active')});
        var deleted = Object.keys(curr['filters']).filter(function(fil) {
           if (curr['settings']['priorities'].indexOf(fil) < 0) {
              return fil
           }
        });

        return {
            name: curr['name'],
            active: curr['settings']['priorities'].map(function(elem, i) {
                return {
                    edit: Session.equals('temp_edit_index', i),
                    data: elem,
                    index: i
                }
            }),
            deleted: deleted
        }
    }
})

Template.editModal.events({
    'click #reGroupify': function() {
        // Grouper.active_group.name = $("#editGroupName").val();
        // groupify(Grouper.active_group);
        // Parse.User.current().save(
        //     {'groups': Grouper.groups }, 
        //     { error: function(obj, error) { console.log(error); }
        // });
        // buildPage();
    },

    'keyup #editGroupName': function() {
        Meteor.call('updateName', Session.get('active'), $("#editGroupName").val());
    },

    'click .clearItem': function(event) {
        var val = $(event.target).parent().parent()[0].getAttribute('value');
        var priorities = Classes.findOne({_id: Session.get('active')})['settings']['priorities'];
        priorities.splice(priorities.indexOf(val), 1);
        Meteor.call('updatePriorities', Session.get('active'), priorities);
    },

    'click .addItem': function(event) {
        var val = $(event.target).parent().parent()[0].getAttribute('value');
        var priorities = Classes.findOne({_id: Session.get('active')})['settings']['priorities'];
        priorities.push(val);
        Meteor.call('updatePriorities', Session.get('active'), priorities);            
    },

    'click .editItem': function(event) {
        var val = $(event.target).parent()[0].getAttribute('index');
        Session.set('temp_edit_index', parseInt(val));
        $('.editText').focus();
    },

    'click .okItem': function(event) {
        var newName = $(event.target).parent().siblings('input').val();
        var value = $(event.target).parent().parent()[0].getAttribute('value');
        //TODO: save new name
        //TODO: fix focusing bug...
        Session.set('temp_edit_index', null)
    },

    'click .cancelItem': function(event) {
        Session.set('temp_edit_index', null)
    }
});

