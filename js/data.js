/********************************** Dummy Data **********************************/

// TODO: upload this from the modals
fa14_students = 
[
    {
        "name": "Resume",
        "group": "0",
        "link": "resume.pdf",
        "img": "content/resume/smallthumbnail.png"
    },
    {
        "name": "About me",
        "group": "0",
        "link": "content/aboutMe/aboutMe.html",
        "img": "content/aboutMe/thumbnail.png"
    },
    {
        "name": "2013 Battlecode",
        "group": "1",
        "link": "content/battlecode2013/battlecode2013.html",
        "img": "content/battlecode2013/thumbnail.png"
    },
    {
        "name": "2014 Battlecode",
        "group": "1",
        "link": "content/battlecode2014/battlecode2014.html",
        "img": "content/battlecode2014/thumbnail.png"
    },
    {
        "name": "2015 Battlecode",
        "group": "1",
        "link": "content/battlecode2015/battlecode2015.html",
        "img": "content/battlecode2015/thumbnail.png"
    },
    {
        "name": "Akamai Leaflet",
        "group": "2",
        "link": "content/akamaiLeaflet/akamaiLeaflet.html",
        "img": "content/akamaiLeaflet/thumbnail.png"
    },
    {
        "name": "Akamai D3",
        "group": "2",
        "link": "content/akamaiD3/akamaiD3.html",
        "img": "content/akamaiD3/thumbnail.png"
    },
    {
        "name": "Addepar Ember Charts",
        "group": "2",
        "link": "content/addepar/addepar.html",
        "img": ""
    },
    {
        "name": "P(arty)set",
        "group": "3",
        "link": "content/partyset/partyset.html",
        "img": "content/partyset/thumbnail.png"
    },
    {
        "name": "Grouper",
        "group": "3",
        "link": "content/grouper/grouper.html",
        "img": ""
    },
    {
        "name": "MIT Overseer",
        "group": "3",
        "link": "content/gameLab/gameLab.html",
        "img": "content/gameLab/NewDeniedRightSize1.gif"
    },
    {
        "name": "Cello",
        "group": "4",
        "link": "content/cello/cello.html",
        "img": ""
    },
    {
        "name": "Melee",
        "group": "4",
        "link": "content/melee/melee.html",
        "img": "content/melee/thumbnail.png"
    },
    {
        "name": "Starcraft 2",
        "group": "4",
        "link": "content/starcraft2/starcraft2.html",
        "img": "content/starcraft2/thumbnail.png"
    },
    {
        "name": "Hearthstone",
        "group": "4",
        "link": "content/hearthstone/hearthstone.html",
        "img": "content/hearthstone/thumbnail.png"
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
