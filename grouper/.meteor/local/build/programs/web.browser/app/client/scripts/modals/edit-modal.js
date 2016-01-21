(function(){Template.editModal.onRendered(function() {
    $("#edit_data_current_categories").sortable({
        update: function(event, ui) {}
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
                    index: i,
                    label: curr['settings']['labels'][elem]
                }
            }),
            deleted: deleted.map(function(elem, i) {
                return {
                    data: elem,
                    label: curr['settings']['labels'][elem]
                }
            }),
            sizes: {
                people: curr['settings']['sizes']['people'],
                groups: curr['settings']['sizes']['groups'],
                people_selected: curr['settings']['sizes']['pref'] === 'people',
                groups_selected: curr['settings']['sizes']['pref'] === 'groups'
            }
        }
    }
})

Template.editModal.events({
    'click #reGroupify': function() {
        // groupify(Grouper.active_group);
        // Parse.User.current().save(
        //     {'groups': Grouper.groups }, 
        //     { error: function(obj, error) { console.log(error); }
        // });
        // buildPage();
        var priorities = [];
        $('#edit_data_current_categories').children().each(function(i, elem) {
            priorities.push(elem.getAttribute('value'));
        });
        var size = parseInt($('.sizesEdit').val());
        Meteor.call('updatePriorities', Session.get('active'), priorities);
        Meteor.call('updateSize', Session.get('active'), size);
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
        var labels = Classes.findOne({_id: Session.get('active')})['settings']['labels'];
        labels[value] = newName;
        Meteor.call('updateLabels', Session.get('active'), labels);
        //TODO: fix focusing bug...
        Session.set('temp_edit_index', null)
    },

    'click .cancelItem': function(event) {
        Session.set('temp_edit_index', null)
    },

    'click .sizesSelect': function(event) {
        var pref = $(event.target).attr('value');
        Meteor.call('updateSizesPref', Session.get('active'), pref);
    },

    'click .glyphicon-plus.numInc': function(event) {
        var size = parseInt($('.sizesEdit').val());
        $('.sizesEdit').val(size+1);
    },

    'click .glyphicon-minus.numInc': function(event) {
        var size = parseInt($('.sizesEdit').val());
        $('.sizesEdit').val(size-1);
    }
});


})();
