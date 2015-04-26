/********************************** Dummy Data **********************************/

// TODO: remove this, create settings dynamically in modal
var placeholder_settings = {
    labels: {},
    priorities: [],
    group_by: {
        pref: '',
        num_groups: '',
        group_size: ''
    }
};

// TODO: upload this from the modals
fa14_students = [{   
    name: 'Catwoman',
    course_number: 16,
    gender: 'F',
    year: '2016',
    group: 6,
    sports_team: 'villain',
}, {
    name: 'Mystique',
    course_number: 6,
    gender: 'F',
    year: '2016',
    group: 6,
    sports_team: 'villain',
}, {
    name: 'Bane',
    course_number: 6,
    gender: 'M',
    year: '2016',
    group: 6,
    sports_team: 'villain',
}, {
    name: 'The Riddler',
    course_number: 16,
    gender: 'M',
    year: '2016',
    group: 6,
    sports_team: 'villain',
}, {
    name: 'Sandman',
    course_number: 2,
    gender: 'M',
    year: '2016',
    group: 6,
    sports_team: 'villain',
}, {
    name: 'Joker',
    course_number: 2,
    gender: 'M',
    year: '2015',
    group: 5,
    sports_team: 'villain',
}, {
    name: 'Doctor Doom',
    course_number: 6,
    gender: 'M',
    year: '2015',
    group: 5,
    sports_team: 'villain',
}, {
    name: 'Lex Luther',
    course_number: 1,
    gender: 'M',
    year: '2016',
    group: 5,
    sports_team: 'villain',
}, {
    name: 'Galactus',
    course_number: 16,
    gender: 'M',
    year: '2016',
    group: 5,
    sports_team: 'villain',
}, {
    name: 'Loki',
    course_number: 6,
    gender: 'M',
    year: '2015',
    group: 5,
    sports_team: 'villain',
}, {
    name: 'Ironman',
    course_number: 7,
    gender: 'M',
    year: '2016',
    group: 4,
    sports_team: 'hero',
}, {
    name: 'Aquaman',
    course_number: 8,
    gender: 'M',
    year: '2016',
    group: 4,
    sports_team: 'hero',
}, {
    name: 'Hercules',
    course_number: 22,
    gender: 'M',
    year: '2015',
    group: 4,
    sports_team: 'hero',
}, {
    name: 'Wolverine',
    course_number: 2,
    gender: 'M',
    year: '2016',
    group: 4,
    sports_team: 'hero',
}, {
    name: 'Magneto',
    course_number: 2,
    gender: 'M',
    year: '2016',
    group: 4,
    sports_team: 'villain',
}, {
    name: 'Thor',
    course_number: 20,
    gender: 'M',
    year: '2016',
    group: 3,
    sports_team: 'hero',
}, {
    name: 'Hal Jordan',
    course_number: 16,
    gender: 'M',
    year: '2017',
    group: 3,
    sports_team: 'hero',
}, {
    name: 'Wonder Woman',
    course_number: 6,
    gender: 'F',
    year: '2016',
    group: 3,
    sports_team: 'hero',
}, {
    name: 'Captain America',
    course_number: 6,
    gender: 'M',
    year: '2018',
    group: 3,
    sports_team: 'hero',
}, {
    name: 'Hulk',
    course_number: 7,
    gender: 'M',
    year: '2016',
    group: 3,
    sports_team: 'hero',
}, {
    name: 'Dale',
    course_number: 6,
    gender: 'M',
    year: '2016',
    group: 2,
    sports_team: 'disney',
}, {
    name: 'Batman',
    course_number: 3,
    gender: 'M',
    year: '2016',
    group: 2,
    sports_team: 'hero',
}, {
    name: 'Robin',
    course_number: 9,
    gender: 'M',
    year: '2016',
    group: 2,
    sports_team: 'hero',
}, {
    name: 'Superman',
    course_number: 18,
    gender: 'M',
    year: '2015',
    group: 2,
    sports_team: 'hero',
}, {
    name: 'Spiderman',
    course_number: 16,
    gender: 'M',
    year: '2016',
    group: 2,
    sports_team: 'hero',
}, {
    name: 'Pluto',
    course_number: 6,
    gender: 'M',
    year: '2016',
    group: 1,
    sports_team: 'disney',
}, {
    name: 'Scrooge Matt',
    course_number: 2,
    gender: 'M',
    year: '2017',
    group: 1,
    sports_team: 'disney',
}, {
    name: 'Tom',
    course_number: 2,
    gender: 'M',
    year: '2018',
    group: 1,
    sports_team: 'disney',
}, {
    name: 'Jerry',
    course_number: 5,
    gender: 'M',
    year: '2016',
    group: 1,
    sports_team: 'disney',
}, {
    name: 'Chip',
    course_number: 10,
    gender: 'M',
    year: '2015',
    group: 1,
    sports_team: 'disney',
}, {
    name: 'Mickey Mouse',
    course_number: 6,
    gender: 'M',
    year: '2016',
    group: 0,
    sports_team: 'disney',
}, {
    name: 'Minnie Mouse',
    course_number: 6,
    gender: 'F',
    year: '2015',
    group: 0,
    sports_team: 'disney',
}, {
    name: 'Donald Duck',
    course_number: 2,
    gender: 'M',
    year: '2015',
    group: 0,
    sports_team: 'disney',
}, {
    name: 'Daisy Duck',
    course_number: 3,
    gender: 'F',
    year: '2016',
    group: 0,
    sports_team: 'disney',
}, {
    name: 'Goofy',
    course_number: 1,
    gender: 'M',
    year: '2017',
    group: 0,
    sports_team: 'disney',
}];

/********************************** Dummy Data Setup **********************************/

Grouper.username = 'my_username';
// Grouper.groups.push({
//     name: 'my_class_spr15',
//     settings: placeholder_settings,
//     data: students,
//     filters: buildFilters(students)
// });

Grouper.groups.push({
    name: 'my_class_fa14',
    settings: {
        labels: {
            name: 'Name',
            course_number: 'Course Number',
            gender: 'Gender',
            year: 'Year',
            group: 'Group',
            sports_team: 'Sports Team'
        },
        priorities: ['course_number', 'gender', 'year', 'sports_team'],
        group_by: {
            pref: 'num_groups',
            num_groups: '7',
            group_size: ''
        }
    },
    data: fa14_students,
    filters: buildFilters(fa14_students)
});

Grouper.groups.push({
    name: 'my_class_spr14',
    settings: placeholder_settings,
    data: [],
    filters: []
});

Grouper.groups.push({
    name: 'my_class_fa13',
    settings: placeholder_settings,
    data: [],
    filters: []
});


/**
 * Build parameters object.
 */
function buildFilters(data) {
    var parameters = {};
    var filters = Object.keys(data[0]);
    for (var i=0; i<filters.length; i++) {
            parameters[filters[i]] = [];
    }
    for (var i=0; i<data.length; i++) {
        for (var j=0; j<filters.length; j++) {
            var filter = filters[j];
            var category = data[i][filter];
            if (parameters[filter].indexOf(category) < 0) {
                parameters[filter].push(category);
            }
        }
    }
    for (i in filters) {
        parameters[filters[i]].sort(function(a, b){return a-b});
    }
    return parameters;
}
