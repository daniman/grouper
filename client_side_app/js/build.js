$(document).ready(function() {
    console.log(navigator.userAgent);
    buildPage();
});

var buildPage = function() {

    if (!Parse.User.current()) {
        $('#newUser').hide();
        $('#bubbleContainer').hide();
        $('#filterContainer').hide();
        $('.dropdown').hide();
        $('#loginContainer').fadeIn();
    } else {
        $('#newUser').hide();
        $('#bubbleContainer').hide();
        $('#filterContainer').hide();
        $('.dropdown').fadeIn();
        $('#loginContainer').hide();

        $('#filters').html('');
        var buttons = $('#bubbleContainer').children('#buttons');
        $('#bubbleContainer').html(buttons);

        $('.switch').children('input')[0].checked = false;

        Grouper.username = Parse.User.current().attributes.username.split('@')[0];
        Grouper.groups = Parse.User.current().attributes.groups;
        $('#username_dropdown_label').html(Grouper.username + ' <b class="caret"></b>');    

        // TODO: set with localstorage
        // Grouper.active_group = Grouper.groups.filter(function(obj) {
        //     return obj.name == 'test';
        // })[0];
        Grouper.active_group = Grouper.groups[0];

        Grouper.colors.color_scheme_pref = 'bright';

        $('#logo').click(function() {
            document.location.href = 'index.html';
        });

        /**
         * Build classes dropdown.
         */
        var groups_html = '';
        for (var i=0; i<Grouper.groups.length; i++) {
            groups_html += '<li role="presentation"><a class="classlist_item" role="menuitem" tabindex="1" href="#">' + Grouper.groups[i].name + '</a></li>';
        }
        groups_html += '<li role="presentation" class="divider"></li>' +
                            '<li role="presentation">' +
                                '<a role="menuitem" tabindex="1" href="#" id="importButtonLabel">' +
                                    'Add New Class' +
                                    '<button type="button" class="btn btn-sm" id="importButton">+</button>' +
                                '</a>' +
                            '</li>';

        if (Grouper.groups.length > 0) {
            $('#bubbleContainer').fadeIn();
            $('#filterContainer').fadeIn();

            $('#class_dropdown').html(groups_html);
            $('#group_dropdown_label').html(Grouper.active_group['name'] + ' <b class="caret"></b>');
            $('#group_dropdown_label').show();

            /**
             * Build main page.
             */
            var student_dict = buildBubbles(Grouper.active_group);
            buildFilters(Grouper.active_group, student_dict);
        } else {
            $('#newUser').fadeIn();
            $('#group_dropdown_label').hide();
        }
    }
    
};