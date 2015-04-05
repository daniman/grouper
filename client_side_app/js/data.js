/**
 * This object would in theory be made by the algorithm...
 */
var students = [{   
    name: 'Catwoman',
    course_number: 16,
    gender: 'F',
    year: '2016',
    group: 6
}, {
    name: 'Mystique',
    course_number: 6,
    gender: 'F',
    year: '2016',
    group: 6
}, {
    name: 'Bane',
    course_number: 6,
    gender: 'M',
    year: '2016',
    group: 6
}, {
    name: 'The Riddler',
    course_number: 16,
    gender: 'M',
    year: '2016',
    group: 6
}, {
    name: 'Sandman',
    course_number: 2,
    gender: 'M',
    year: '2016',
    group: 6
}, {
    name: 'Joker',
    course_number: 2,
    gender: 'M',
    year: '2015',
    group: 5
}, {
    name: 'Doctor Doom',
    course_number: 6,
    gender: 'M',
    year: '2015',
    group: 5
}, {
    name: 'Lex Luther',
    course_number: 1,
    gender: 'M',
    year: '2016',
    group: 5
}, {
    name: 'Galactus',
    course_number: 16,
    gender: 'M',
    year: '2016',
    group: 5
}, {
    name: 'Loki',
    course_number: 6,
    gender: 'M',
    year: '2015',
    group: 5
}, {
    name: 'Ironman',
    course_number: 7,
    gender: 'M',
    year: '2016',
    group: 4
}, {
    name: 'Aquaman',
    course_number: 8,
    gender: 'M',
    year: '2016',
    group: 4
}, {
    name: 'Hercules',
    course_number: 22,
    gender: 'M',
    year: '2015',
    group: 4
}, {
    name: 'Wolverine',
    course_number: 2,
    gender: 'M',
    year: '2016',
    group: 4
}, {
    name: 'Magneto',
    course_number: 2,
    gender: 'M',
    year: '2016',
    group: 4
}, {
    name: 'Thor',
    course_number: 20,
    gender: 'M',
    year: '2016',
    group: 3
}, {
    name: 'Hal Jordan',
    course_number: 16,
    gender: 'M',
    year: '2017',
    group: 3
}, {
    name: 'Wonder Woman',
    course_number: 6,
    gender: 'F',
    year: '2016',
    group: 3
}, {
    name: 'Captain America',
    course_number: 6,
    gender: 'M',
    year: '2018',
    group: 3
}, {
    name: 'Hulk',
    course_number: 7,
    gender: 'M',
    year: '2016',
    group: 3
}, {
    name: 'Dale',
    course_number: 6,
    gender: 'M',
    year: '2016',
    group: 2
}, {
    name: 'Batman',
    course_number: 3,
    gender: 'M',
    year: '2016',
    group: 2
}, {
    name: 'Robin',
    course_number: 9,
    gender: 'M',
    year: '2016',
    group: 2
}, {
    name: 'Superman',
    course_number: 18,
    gender: 'M',
    year: '2015',
    group: 2
}, {
    name: 'Spiderman',
    course_number: 16,
    gender: 'M',
    year: '2016',
    group: 2
}, {
    name: 'Pluto',
    course_number: 6,
    gender: 'M',
    year: '2016',
    group: 1
}, {
    name: 'Scrooge',
    course_number: 2,
    gender: 'M',
    year: '2017',
    group: 1
}, {
    name: 'Tom',
    course_number: 2,
    gender: 'M',
    year: '2018',
    group: 1
}, {
    name: 'Jerry',
    course_number: 5,
    gender: 'M',
    year: '2016',
    group: 1
}, {
    name: 'Chip',
    course_number: 10,
    gender: 'M',
    year: '2015',
    group: 1
}, {
    name: 'Mickey Mouse',
    course_number: 6,
    gender: 'M',
    year: '2016',
    group: 0
}, {
    name: 'Minnie Mouse',
    course_number: 6,
    gender: 'F',
    year: '2015',
    group: 0
}, {
    name: 'Donald Duck',
    course_number: 2,
    gender: 'M',
    year: '2015',
    group: 0
}, {
    name: 'Daisy Duck',
    course_number: 3,
    gender: 'F',
    year: '2016',
    group: 0
}, {
    name: 'Goofy',
    course_number: 1,
    gender: 'M',
    year: '2017',
    group: 0
}];

/**
 * Build parameters object.
 */
var parameters = {}; // need to guarantee that every student object has the same parameters (in alg output)
var filters = Object.keys(students[0]);
for (var i=0; i<filters.length; i++) {
        parameters[filters[i]] = [];
}
for (var i=0; i<students.length; i++) {
    for (var j=0; j<filters.length; j++) {
        var filter = filters[j];
        var category = students[i][filter];
        if (parameters[filter].indexOf(category) < 0) {
            parameters[filter].push(category);
        }
    }
}

for (i in filters) {
    parameters[filters[i]].sort();
}