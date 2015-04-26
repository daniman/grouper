function buildFilters(active_group) {

    var students = Grouper.active_group['data'];
    var filters = Grouper.active_group['filters'];
    
    function capitalize(string) {
        string = string.toString();
        if (string.length == 1) {
            return string.toUpperCase();
        } else {
            return string.charAt(0).toUpperCase() + string.slice(1)
        }
    }

    /**
     * Build filter HTML menu.
     */
    var filters_list = Object.keys(active_group['filters']);
    for (var i=0; i<filters_list.length; i++) {
        if (filters_list[i] != 'group') {
            $('#filters').append('<li>' +
                    '<input id="' + filters_list[i] + '_filter" class="filter_cat" type="radio" name="filters" value="' + filters_list[i] + '">' +
                    '<label class="filter_cat_label" for="' + filters_list[i] + '_filter">' +
                        Grouper.active_group.settings.labels[filters_list[i]] +
                    '</label><br>' +
                '</li>');
        }
    }

    $('.filter_cat').click(function(event) {
        var category = event.target.value;
        $('.bubble').each(function(i,bubble) {
            var attr = students[i][category];
            $(bubble).animate({
                'background-color': Grouper.colors.get_color(category, attr, filters)
            }, 1000);
        })

        $('.color_map').remove();
        var color_map = '<ul class="color_map">'; 
        var categories = filters[event.target.value];

        for (var i=0; i<categories.length-1; i++) {
            color_map += '<span style="color: ' + Grouper.colors.get_color(event.target.value, categories[i], filters) + '">' + capitalize(categories[i]) + '</span>, ';
        }
        color_map += '<span style="color: ' + Grouper.colors.get_color(event.target.value, categories[categories.length-1], filters) + '">' + capitalize(categories[categories.length-1]) + '</span></ul>'
        $(this).parent().append(color_map);
    })

    $('.switch').on('click', function(event, state) {
        if (event.target.checked) {
            $('.bubble').each(function() {
                var id = this.id.split('_')[1];
                $(this).children().html(students[id]['name'].split(' ').join('<br>'));
                $(this).children().css({
                    'font-size': '15px',
                    'line-height': '15px',
                    'font-weight': '400'
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
                    'line-height': $('.bubble').height() + 'px',
                    'font-weight': '300'
                });
            });
        }
    });
    
    /**
     * Set the active filter to be the one who ahs the highest priority.
     */
    $('input[value="' + Grouper.active_group.settings.priorities[0] + '"').click();

};
