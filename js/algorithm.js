function groupify(group) {
    console.log(group);

    var num_groups;
    /*
    if (group.settings.group_by.pref == 'num_groups') {
        num_groups = group.settings.group_by['num_groups'];
        for (var i=0; i<group.data.length; i++) {
            group.data[i]['group'] = i%num_groups; // 0 indexed
        }
    } else {
        var group_size = group.settings.group_by['group_size'];
        var count = 1;
        num_groups = 1;
        for (var i=0; i<group.data.length; i++) {
            group.data[i]['group'] = num_groups-1;
            count ++;
            if (count > group_size) {
                count = 1;
                num_groups ++;
            }
        }
    }

    console.log('num_groups: ' + num_groups);
    
    group.filters['group'] = [];
    for (var i=0; i<num_groups; i++) {
        group.filters['group'][i] = i;
    }

    console.log(group.filters['group']);

    console.log(group);
    */
}