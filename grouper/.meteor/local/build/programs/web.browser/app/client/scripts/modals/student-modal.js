(function(){Template.studentModal.helpers({
    data: function() {
        var curr = Classes.findOne({_id: Session.get('active')});
        var student = curr['data'][Session.get('bubble_index')];
        var data = Object.keys(curr['filters']).map(function(fil) {
            return {
                label: curr['settings']['labels'][fil],
                data: student[fil]
            }
        });
        return data;
    }
});

$(document).on('dblclick', '.bubble', function(evt){
    var id = parseInt($(evt.target).parent()[0].getAttribute('student_id'));
    Session.set('bubble_index', id);
});

})();
