Grouper = {};

Grouper.colors = {
    get_color: function(category, attr, filters) {
        var color_pool = Grouper['colors']['color_schemes']['bright'];
        return color_pool[filters[category].indexOf(attr) % color_pool.length];
    },
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
        ]
    }
}
