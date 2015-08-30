var Grouper = {};

Grouper.username = '';
Grouper.groups = [];
Grouper.active_group = {};
Grouper.group_setup = {}; // for holding variables while you set up a group in the modal

GroupMapping = {
    '0': "Me!",
    '1': "Battlecode",
    '2': "Internships",
    '3': "Projects",
    '4': "Interests",
    '5': "Social Media"
}


Grouper.colors = {
    get_color: function(category, attr, filters) {
        debugger
        var color_pool = Grouper['colors']['color_schemes'][Grouper['colors']['color_scheme_pref']];
        return color_pool[filters[category].indexOf(attr) % color_pool.length];
    },
    color_scheme_pref: 'bright',
    color_schemes: {
        bright: [
            '#FFC107', // amber
            '#00BCD4', // cyan
            '#F44336', // red
            '#3F51B5', // indigo
            '#673AB7', // deep purple
            '#E91E63', // pink
            '#4CAF50', // green
            '#FF9800', // orange
            '#CDDC39', // lime
            '#FF5722', // deep orange
            '#9C27B0', // purple
            '#03A9F4', // light blue
            '#FFEB3B', // yellow
            '#2196F3', // blue
            '#8BC34A', // light green
            '#009688', // teal
            '#607D8B', // blue grey
            '#795548' // brown
        ],
        light: [
            '#ffca28', // amber
            '#4ecdc4', // cyan
            '#ff6b6b', // red
            '#5c6bc0', // indigo
            '#7e57c2', // deep purple
            '#ec407a', // pink
            '#66bb6a', // green
            '#f2b04d', // orange
            '#c7f46f', // lime
            '#ff7043', // deep orange
            '#ab47bc', // purple
            '#29b6f6', // light blue
            '#ffee58', // yellow
            '#42a5f5', // blue
            '#9ccc65', // light green
            '#26a69a', // teal
            '#78909c', // blue grey
            '#8d6e63' // brown
        ]
    }
}
