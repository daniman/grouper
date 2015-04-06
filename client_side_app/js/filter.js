$(document).ready(function() {
    for (var i=0; i<filters.length; i++) {
        if (filters[i] != 'name' && filters[i] != 'group') {
            $('#filters').append('<li>' +
                '<input class="filter_cat" type="radio" name="filters" value="' + filters[i] + '">' + filters[i].split('_').map(function(elem) {return capitalize(elem)}).join(' ') + '<br>' +
                '</li>');
        }
    }

    $('.filter_cat').click(function(event) {
        filter(event.target.value, nodes);
        console.log($(this));
        $('.color_map').remove();
        var color_map = '<ul class="color_map">'; 
        var categories = parameters[event.target.value];

        for (var i=0; i<categories.length-1; i++) {
            color_map += '<span style="color: ' + getColor(event.target.value, categories[i]) + '">' + categories[i] + '</span>, ';
        }
        color_map += '<span style="color: ' + getColor(event.target.value, categories[categories.length-1]) + '">' + categories[categories.length-1] + '</span></ul>'
        $(this).parent().append(color_map);
    })

    $('.switch').on('click', function(event, state) {
        if (event.target.checked) {
            $('.bubble').each(function() {
                var id = this.id.split('_')[1];
                $(this).children().html(students[id]['name'].split(' ').join('<br>'));
                $(this).children().css({
                    'font-size': '15px',
                    'line-height': '15px'
                });
                // Don't combine these, they're separate on purpose for timing
                $(this).children().css({
                    'margin-top': ($(this).height()-$(this).children().height())/2 + 'px'
                });
            });
        } else {
            $('.bubble').each(function() {
                var id = this.id.split('_')[1];
                $(this).children().html(students[id]['course_number']);
                $('.bubble_text').css({
                    'font-size': '30px',
                    'margin-top': ($(this).height()-$(this).children().height())/2 + 'px',
                    'line-height': $('.bubble').height() + 'px'
                });
            });
        }
    });

    $('input[value="sports_team"').click();

});

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function filter(category, nodes) {
    nodes.selectAll().forEach(function(d,i) {
        var attr = students[i][category];
        $(d.parentNode).animate({
            'background-color': getColor(category, attr)
        }, 1000);
    });
}

function getColor(category, attr) {
    var colorPool = [
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
    ];
    var colorPoolLight = [
        '#FFD54F', // amber
        '#4DD0E1', // cyan
        '#E57373', // red
        '#7986CB', // indigo
        '#BA68C8', // deep purple
        '#7986CB', // pink
        '#81C784', // green
        '#FFB74D', // orange
        '#DCE775', // lime
        '#DCE775', // deep orange
        '#BA68C8', // purple
        '#4FC3F7', // light blue
        '#FFF176', // yellow
        '#64B5F6', // blue
        '#AED581', // light green
        '#4DB6AC', // teal
        '#90A4AE', // blue grey
        '#A1887F' // brown
    ];
    return colorPool[parameters[category].indexOf(attr) % colorPool.length];
}