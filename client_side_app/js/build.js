$(document).ready(function() {

    // TODO: set with localstorage
    Grouper.active_group = $.grep(Grouper.groups, function(e) {
        return e.name == 'my_class_fa14';
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
        groups_html += '<li role="presentation"><a role="menuitem" tabindex="1" href="#">' + Grouper.groups[i].name + '</a></li>';
    }
    $('#class_dropdown').prepend(groups_html);
    $('#group_dropdown_label').prepend(Grouper.active_group['name']);

    buildBubbles(Grouper.active_group);
    buildFilters(Grouper.active_group);
});