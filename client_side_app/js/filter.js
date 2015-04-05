$(document).ready(function() {
    $("[name='toggle']").bootstrapSwitch({
      size: 'small',
      onText: '',
      offText: '',
      onColor: 'info',
      offColor: 'info'
    });


    // 

    // <div class="filterType">
    //     <input type="checkbox" value="gender"> Gender<br>
    //     <input type="checkbox" value="year"> Year<br>
    //     <input type="checkbox" value="sports_team"> Sports Team<br>
    //     <input type="checkbox" value="living_group"> Living Group<br>
    //     <input type="checkbox" value="greek_affiliation"> Greek Affiliation
    // </div>

    for (var i=0; i<filters.length; i++) {
        if (filters[i] != 'name') {
            $('#filters').append('<li>' +
                '<input class="filter_cat" type="radio" name="filters" value="' + filters[i] + '">' + filters[i] + '<br>' +
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

    $('input[name="toggle"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) {
            $('.bubble').each(function() {
                var id = this.id.split('_')[1];
                $(this).children().html(students[id]['name']);

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

    $('input[value="group"').click();


});

function filter(attr, nodes) {
    // var colors = generateColors(parameters[attr].length);
    nodes.selectAll().forEach(function(d,i) {
        var cat = students[i][attr];
        $(d.parentNode).animate({
            // 'background-color': colors[parameters[attr].indexOf(cat)]
            'background-color': getColor(attr, cat)
        }, 1000);
    });
}

function getColor(attr, cat) {
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

    return colorPool[parameters[attr].indexOf(cat) % colorPool.length];
}