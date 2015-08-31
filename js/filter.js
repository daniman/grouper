function buildFilters() {
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
     /*
    var filters_list = Grouper.active_group.settings['priorities'];
    for (var i=0; i<filters_list.length; i++) {
        if (filters_list[i]) {
            $('#filters').append('<li>' +
                    '<input id="' + filters_list[i] + '_filter" class="filter_cat" type="radio" name="filters" value="' + filters_list[i] + '">' +
                    '<label class="filter_cat_label" for="' + filters_list[i] + '_filter">' +
                        Grouper.active_group.settings.labels[filters_list[i]] +
                    '</label><br>' +
                '</li>');
        }
    }
    */
        /*
        } else {
            $('.bubble').each(function() {
                var id = this.getAttribute('student_id');
                $(this).children().html(student_dict[id]['course_number']);
                $(this).children().removeClass('student_name');
                $('.bubble_text').css({
                    // 'margin-top': ($(this).height()-$(this).children().height())/2 + 'px',
                    'margin-top': '0px'
                });
            });
        }
        */
    //});
    
    /**
     * Set the active filter to be the one who ahs the highest priority.
     */

};
