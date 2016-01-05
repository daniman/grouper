/* startup.js
 * Create initial data for demo
 * The important thing is that the users object has at least one Classes object ID in it’s list :)
 */

Meteor.startup(function(){
  if ( !Classes.find().count() ){
    Classes.insert({
      "data": [
        {
          "name": "Catwoman",
          "course_number": 16,
          "gender": "F",
          "year": "2016",
          "group": 0,
          "sports_team": "villain"
        },
        {
          "name": "Mystique",
          "course_number": 6,
          "gender": "F",
          "year": "2016",
          "group": 5,
          "sports_team": "villain"
        },
        {
          "name": "Bane",
          "course_number": 6,
          "gender": "M",
          "year": "2016",
          "group": 6,
          "sports_team": "villain"
        },
        {
          "name": "The Riddler",
          "course_number": 16,
          "gender": "M",
          "year": "2016",
          "group": 0,
          "sports_team": "villain"
        },
        {
          "name": "Sandman",
          "course_number": 2,
          "gender": "M",
          "year": "2016",
          "group": 2,
          "sports_team": "villain"
        },
        {
          "name": "Joker",
          "course_number": 2,
          "gender": "M",
          "year": "2015",
          "group": 0,
          "sports_team": "villain"
        },
        {
          "name": "Doctor Doom",
          "course_number": 6,
          "gender": "M",
          "year": "2015",
          "group": 5,
          "sports_team": "villain"
        },
        {
          "name": "Lex Luther",
          "course_number": 1,
          "gender": "M",
          "year": "2016",
          "group": 2,
          "sports_team": "villain"
        },
        {
          "name": "Galactus",
          "course_number": 16,
          "gender": "M",
          "year": "2016",
          "group": 1,
          "sports_team": "villain"
        },
        {
          "name": "Loki",
          "course_number": 6,
          "gender": "M",
          "year": "2015",
          "group": 5,
          "sports_team": "villain"
        },
        {
          "name": "Ironman",
          "course_number": 7,
          "gender": "M",
          "year": "2016",
          "group": 6,
          "sports_team": "hero"
        },
        {
          "name": "Aquaman",
          "course_number": 8,
          "gender": "M",
          "year": "2016",
          "group": 3,
          "sports_team": "hero"
        },
        {
          "name": "Hercules",
          "course_number": 22,
          "gender": "M",
          "year": "2015",
          "group": 2,
          "sports_team": "hero"
        },
        {
          "name": "Wolverine",
          "course_number": 2,
          "gender": "M",
          "year": "2016",
          "group": 2,
          "sports_team": "hero"
        },
        {
          "name": "Magneto",
          "course_number": 2,
          "gender": "M",
          "year": "2016",
          "group": 4,
          "sports_team": "villain"
        },
        {
          "name": "Thor",
          "course_number": 20,
          "gender": "M",
          "year": "2016",
          "group": 4,
          "sports_team": "hero"
        },
        {
          "name": "Hal Jordan",
          "course_number": 16,
          "gender": "M",
          "year": "2017",
          "group": 3,
          "sports_team": "hero"
        },
        {
          "name": "Wonder Woman",
          "course_number": 6,
          "gender": "F",
          "year": "2016",
          "group": 3,
          "sports_team": "hero"
        },
        {
          "name": "Captain America",
          "course_number": 6,
          "gender": "M",
          "year": "2018",
          "group": 3,
          "sports_team": "hero"
        },
        {
          "name": "Hulk",
          "course_number": 7,
          "gender": "M",
          "year": "2016",
          "group": 6,
          "sports_team": "hero"
        },
        {
          "name": "Dale",
          "course_number": 6,
          "gender": "M",
          "year": "2016",
          "group": 0,
          "sports_team": "disney"
        },
        {
          "name": "Batman",
          "course_number": 3,
          "gender": "M",
          "year": "2016",
          "group": 2,
          "sports_team": "hero"
        },
        {
          "name": "Robin",
          "course_number": 9,
          "gender": "M",
          "year": "2016",
          "group": 6,
          "sports_team": "hero"
        },
        {
          "name": "Superman",
          "course_number": 18,
          "gender": "M",
          "year": "2015",
          "group": 4,
          "sports_team": "hero"
        },
        {
          "name": "Spiderman",
          "course_number": 16,
          "gender": "M",
          "year": "2016",
          "group": 6,
          "sports_team": "hero"
        },
        {
          "name": "Pluto",
          "course_number": 6,
          "gender": "M",
          "year": "2016",
          "group": 3,
          "sports_team": "disney"
        },
        {
          "name": "Scrooge Matt",
          "course_number": 2,
          "gender": "M",
          "year": "2017",
          "group": 1,
          "sports_team": "disney"
        },
        {
          "name": "Tom",
          "course_number": 2,
          "gender": "M",
          "year": "2018",
          "group": 4,
          "sports_team": "disney"
        },
        {
          "name": "Jerry",
          "course_number": 5,
          "gender": "M",
          "year": "2016",
          "group": 4,
          "sports_team": "disney"
        },
        {
          "name": "Chip",
          "course_number": 10,
          "gender": "M",
          "year": "2015",
          "group": 1,
          "sports_team": "disney"
        },
        {
          "name": "Mickey Mouse",
          "course_number": 6,
          "gender": "M",
          "year": "2016",
          "group": 5,
          "sports_team": "disney"
        },
        {
          "name": "Minnie Mouse",
          "course_number": 6,
          "gender": "F",
          "year": "2015",
          "group": 6,
          "sports_team": "disney"
        },
        {
          "name": "Donald Duck",
          "course_number": 2,
          "gender": "M",
          "year": "2015",
          "group": 1,
          "sports_team": "disney"
        },
        {
          "name": "Daisy Duck",
          "course_number": 3,
          "gender": "F",
          "year": "2016",
          "group": 2,
          "sports_team": "disney"
        },
        {
          "name": "Goofy",
          "course_number": 1,
          "gender": "M",
          "year": "2017",
          "group": 5,
          "sports_team": "disney"
        }
      ],
      "settings": {
        "priorities": [
          "gender",
          "course_number",
          "year",
          "sports_team",
          "name"
        ],
        "labels": {
          "gender": "Gender",
          "course_number": "Major",
          "year": "Year",
          "sports_team": "Sports Team",
          "group": "Group",
          "name": "Name"
        },
        "sizes": {
          "pref": "people",
          "people": 11,
          "groups": 5
        }
      },
      "name": "test-group",
      "filterObj": null,
      "filters": {
        "name": [
          "Catwoman",
          "Goofy",
          "Bane",
          "The Riddler",
          "Sandman",
          "Joker",
          "Doctor Doom",
          "Lex Luther",
          "Galactus",
          "Loki",
          "Ironman",
          "Aquaman",
          "Hercules",
          "Wolverine",
          "Magneto",
          "Thor",
          "Hal Jordan",
          "Mystique",
          "Captain America",
          "Hulk",
          "Dale",
          "Batman",
          "Robin",
          "Superman",
          "Spiderman",
          "Pluto",
          "Scrooge Matt",
          "Tom",
          "Jerry",
          "Chip",
          "Mickey Mouse",
          "Minnie Mouse",
          "Donald Duck",
          "Daisy Duck",
          "Wonder Woman"
        ],
        "course_number": [
          1,
          2,
          3,
          5,
          6,
          7,
          8,
          9,
          10,
          16,
          18,
          20,
          22
        ],
        "gender": [
          "F",
          "M"
        ],
        "year": [
          "2015",
          "2016",
          "2017",
          "2018"
        ],
        "group": [
          0,
          1,
          2,
          3,
          4,
          5,
          6
        ],
        "sports_team": [
          "villain",
          "hero",
          "disney"
        ]
      }
    });
  }
  var user = Meteor.users.findOne();
  if ( user && !user.profile ){
    var classId = Classes.findOne()._id;
    Meteor.users.update({ _id: user._id },{ $set: { profile: { classes: [ classId ] }}});
  }
});
