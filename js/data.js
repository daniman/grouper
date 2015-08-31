/********************************** Dummy Data **********************************/

// TODO: upload this from the modals
fa14_students = 
[
    {
        "name": "Resume",
        "group": "0",
        "link": "resume.pdf",
        "img": "accordion/resume/smallthumbnail.png"
    },
    {
        "name": "About me",
        "group": "0",
        "link": "accordion/aboutMe/aboutMe.html",
        "img": "accordion/aboutMe/thumbnail.png"
    },
    {
        "name": "2013 Battlecode",
        "group": "1",
        "link": "accordion/battlecode2013/battlecode2013.html",
        "img": "accordion/battlecode2013/thumbnail.png"
    },
    {
        "name": "2014 Battlecode",
        "group": "1",
        "link": "accordion/battlecode2014/battlecode2014.html",
        "img": "accordion/battlecode2014/thumbnail.png"
    },
    {
        "name": "2015 Battlecode",
        "group": "1",
        "link": "accordion/battlecode2015/battlecode2015.html",
        "img": "accordion/battlecode2015/thumbnail.png"
    },
    {
        "name": "Akamai Leaflet",
        "group": "2",
        "link": "accordion/akamaiLeaflet/akamaiLeaflet.html",
        "img": "accordion/akamaiLeaflet/thumbnail.png"
    },
    {
        "name": "Akamai D3",
        "group": "2",
        "link": "accordion/akamaiD3/akamaiD3.html",
        "img": "accordion/akamaiD3/thumbnail.png"
    },
    {
        "name": "Addepar Ember Charts",
        "group": "2",
        "link": "accordion/addepar/addepar.html",
        "img": ""
    },
    {
        "name": "P(arty)set",
        "group": "3",
        "link": "accordion/partyset/partyset.html",
        "img": "accordion/partyset/thumbnail.png"
    },
    {
        "name": "Grouper",
        "group": "3",
        "link": "accordion/grouper/grouper.html",
        "img": ""
    },
    {
        "name": "MIT Overseer",
        "group": "3",
        "link": "accordion/gameLab/gameLab.html",
        "img": "accordion/gameLab/NewDeniedRightSize1.gif"
    },
    {
        "name": "Cello",
        "group": "4",
        "link": "accordion/cello/cello.html",
        "img": ""
    },
    {
        "name": "Melee",
        "group": "4",
        "link": "accordion/melee/melee.html",
        "img": "accordion/melee/thumbnail.png"
    },
    {
        "name": "Starcraft 2",
        "group": "4",
        "link": "accordion/starcraft2/starcraft2.html",
        "img": "accordion/starcraft2/thumbnail.png"
    },
    {
        "name": "Hearthstone",
        "group": "4",
        "link": "accordion/hearthstone/hearthstone.html",
        "img": "accordion/hearthstone/thumbnail.png"
    },
    {
        "name": "GitHub",
        "group": "5",
        "link": "https://github.com/NicholasMohr",
        "img": "images/sociallinks/github.png",
        "color": "#9cdaf1"
    },
    {
        "name": "Quora",
        "group": "5",
        "link": "http://www.quora.com/Nick-Mohr",
        "img": "images/sociallinks/quora.png",
        "color": "#A82400"
    },
    {
        "name": "Facebook",
        "group": "5",
        "link": "https://www.facebook.com/nicketh",
        "img": "images/sociallinks/facebook.png",
        "color": "#3B5998"
    },
    {
        "name": "8tracks",
        "group": "5",
        "link": "http://8tracks.com/nicketh",
        "img": "images/sociallinks/8tracksWhite.png",
        "color": "#253d61"
    },
    {
        "name": "Spotify",
        "group": "5",
        "link": "https://play.spotify.com/user/nicketh1",
        "img": "images/sociallinks/spotify.png",
        "color": "#b4d600"
    },
    {
        "name": "LinkedIn",
        "group": "5",
        "link": "https://linkedin.com/in/mohrn",
        "img": "images/sociallinks/linkedin.png",
        "color": "#0177b5"
    }
]

/********************************** Dummy Data Setup **********************************/

Grouper.groups.push({
    name: 'my_class_fa14',
    settings: {
        labels: {
            name: 'Name',
            group: 'Group'
        },
        priorities: ['group'],
        group_by: {
            pref: 'num_groups',
            num_groups: '7',
            group_size: ''
        }
    },
    data: fa14_students,
    filters: buildFilterObject(fa14_students)
});

Grouper.groups.push({
    name: 'my_class_spr14',
    settings: {
        labels: {
            name: 'Name',
            group: 'Group'
        },
        priorities: ['group'],
        group_by: {
            pref: 'num_groups',
            num_groups: '7',
            group_size: ''
        }
    },
    data: fa14_students,
    filters: buildFilterObject(fa14_students)
});

Grouper.groups.push({
    name: 'my_class_fa13',
    settings: {
        labels: {
            name: 'Name',
            group: 'Group'
        },
        priorities: ['group'],
        group_by: {
            pref: 'num_groups',
            group: 'Group'
        }
    },
    data: fa14_students,
    filters: buildFilterObject(fa14_students)
});


/**
 * Build parameters object.
 */
function buildFilterObject(data) {
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
