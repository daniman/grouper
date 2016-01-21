(function(){Template.exportCols.helpers({
    cols: function(ctx) {
        var curr = Classes.findOne({_id: Session.get('active')});
        var row = Object.keys(curr['filters']).map(function(fil) {
            return ctx[fil];
        });
        return row;
    }
});

Template.exportModal.helpers({
    rows: function() {
        var curr = Classes.findOne({_id: Session.get('active')});
        return curr['data'];
    },
    cols: function() {
        var curr = Classes.findOne({_id: Session.get('active')});
        return Object.keys(curr['filters']);
    }
});

Template.exportModal.events({
    'click #export_data': function(event) {
        var curr = Classes.findOne({_id: Session.get('active')});
        var filename = curr['name'] + '.csv';

        var keys = Object.keys(curr['filters']);
        var data = curr['data'].map(function(student) {
            var datum = [];
            for (var i=0; i<keys.length; i++) {
                datum.push(student[keys[i]]);
            }
            return datum
        });
        data.unshift(Object.keys(curr['filters']));

        if (filename !== null) {
            var csv = data.join('\r\n');
            var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
            $(event.target).attr({
                'download': filename,
                'href': csvData,
                'target': '_blank'
            });
        }
    }
});

})();
