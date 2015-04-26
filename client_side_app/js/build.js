$(document).ready(function() {

    // TODO: set with localstorage
    Grouper.active_group = Grouper.groups.filter(function(obj) {
        return obj.name == 'my_class_fa14';
    })[0];

    Grouper.colors.color_scheme_pref = 'bright';

    $('#logo').click(function() {
        document.location.href = 'index.html';
    });

    /**
     * Build username dropdown.
     */
    $('#username_dropdown_label').prepend(Grouper.username);

    /**
     * Build classes dropdown.
     */
    var groups_html = '';
    for (var i=0; i<Grouper.groups.length; i++) {
        groups_html += '<li role="presentation"><a class="classlist_item" role="menuitem" tabindex="1" href="#">' + Grouper.groups[i].name + '</a></li>';
    }
    $('#class_dropdown').prepend(groups_html);
    $('#group_dropdown_label').prepend(Grouper.active_group['name'] + ' <b class="caret"></b>');

    /**
     * Build main page.
     */
    var student_dict = buildBubbles(Grouper.active_group);
    buildFilters(Grouper.active_group, student_dict);
});