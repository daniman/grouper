var groups = parameters['group'].map(function(obj) {
    var s = [];
    for (var i=0; i<students.length; i++) {
        if (students[i]['group'] == obj) {s.push(students[i])}
    }
    return s;
})

var getHullColor = function(group_num) {
    var group = groups[group_num];
    var group_size = group.length;
    var possible_pts = (parameters['course_number'].length * Math.pow(group_size,2)) + (parameters['gender'].length * Math.pow(group_size,2)) + (parameters['year'].length * Math.pow(group_size,2)) + (parameters['sports_team'].length * Math.pow(group_size,2))
    var pts = 0;
    for (var i=0; i<group_size; i++) {
        for (var j=0; j<group_size; j++) {
            if (group[i]['course_number'] == group[j]['course_number']) { pts ++; }
            if (group[i]['gender'] == group[j]['gender']) { pts ++; }
            if (group[i]['year'] == group[j]['year']) { pts ++; }
            if (group[i]['sports_team'] == group[j]['sports_team']) { pts ++; }
        }
    }
    console.log(group_size*pts/possible_pts);
    return getColorForPercentage(group_size*pts/possible_pts);
}

var percentColors = [
    { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];

var getColorForPercentage = function(pct) {
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    // or output as hex if preferred
}