(function(){Template.groupModal.helpers({
    rows: function() {
        var curr = Classes.findOne({_id: Session.get('active')});
        var groupMems = curr['data'].filter(function(item) {
            if (Session.equals('hull_index', item['group'])) {
                return item
            }
        });
        return groupMems;
    },
    cols: function() {
        var curr = Classes.findOne({_id: Session.get('active')});
        return Object.keys(curr['filters']);
    },
    hullIndex: function() {
        return Session.get('hull_index') + 1;
    },
    // pieChart: function() {
    //     return {
    //         chart: {
    //             type: 'pie'
    //         },
    //         title: {
    //             text: 'title'
    //         },
    //         tooltip: {
    //             pointFormat: '{series.name}: <i>{point.percentage:.1f}%</i>'
    //         },
    //         plotOptions: {
    //             pie: {
    //                 allowPointSelect: true,
    //                 cursor: 'pointer',
    //                 dataLabels: {
    //                     enabled: false,
    //                 }
    //             }
    //         },
    //         series: [{
    //             name: 'Brands',
    //             colorByPoint: true,
    //             data: [{
    //                 name: 'Microsoft Internet Explorer',
    //                 y: 5
    //             }, {
    //                 y: 1,
    //             }, {
    //                 name: 'Proprietary or Undetectable',
    //                 y: 3
    //             }]
    //         }]
    //     };
    // }
});

$(document).on('dblclick', '.hull', function(evt){
    var id = parseInt($(evt.target).attr('group'));
    Session.set('hull_index', id);
});

})();
