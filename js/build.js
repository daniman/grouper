$(document).ready(function() {
    console.log(navigator.userAgent);
    buildPage();
});

var buildPage = function() {
    
    // fancybox JQUERY
    $(".fancybox").fancybox();
    
    $('#newUser').hide();
    $('#newUserStart').hide()
    $('#bubbleContainer').hide();
    $('#filterContainer').hide();
    $('#filters').html('');
    $('#help_tooltip').hide();
    var buttons = $('#bubbleContainer').children('#buttons');
    $('#bubbleContainer').html(buttons);
    /*
    if (!Parse.User.current()) {
        $('#navbar').hide();
        $('#login_error_message').html('');
        $('#loginContainer').fadeIn();
    } else {
    */

    $('#navbar').show();
    $('#loginContainer').hide();

    //$('.switch').children('input')[0].checked = true;

    //Grouper.username = Parse.User.current().attributes.username.split('@')[0];
    //Grouper.groups = Parse.User.current().attributes.groups;
    //$('#username_dropdown_label').html(Grouper.username + ' <b class="caret"></b>');    
    /*
    var active = localStorage.getItem('active_group');
    if (active) {
        Grouper.active_group = Grouper.groups.filter(function(obj) {
            return obj.name === active;
        })[0];
        if (!Grouper.active_group) {
            Grouper.active_group = Grouper.groups[0];
        }
    } else { // user doesn't have cookie yet
    } 
    */       
    Grouper.active_group = Grouper.groups[0];

    Grouper.colors.color_scheme_pref = 'bright';

    /*
    $('#logo').click(function() {
        document.location.href = 'index.html';
    });
    */

        /**
         * Build classes dropdown.
         */
        /*
        var groups_html = '';
        for (var i=0; i<Grouper.groups.length; i++) {
            groups_html += '<li role="presentation">' +
                                '<a class="classlist_item" role="menuitem" tabindex="1" href="#">' +
                                    '<span class="name">' + Grouper.groups[i].name + '</span>' +
                                    (Grouper.groups[i]['name'] == Grouper.active_group['name'] ? '   <span class="glyphicon glyphicon-ok classlist_glyphicon" aria-hidden="true"></span>' : '' )
                                '</a>' +
                            '</li>';
        }
        groups_html += '<li role="presentation" class="divider"></li>' +
                            '<li role="presentation">' +
                                '<a role="menuitem" tabindex="1" href="#" id="importButtonLabel">' +
                                    'Add New Class' +
                                    '<button type="button" class="btn btn-sm" id="importButton">+</button>' +
                                '</a>' +
                            '</li>';
        */
        //if (Grouper.groups.length > 0) {
    $('#bubbleContainer').show();
    $('#filterContainer').show();

        //$('#class_dropdown').html(groups_html);
        //$('#group_dropdown_label').html(Grouper.active_group['name'] + ' <b class="caret"></b>');
        //$('#group_dropdown_label').show();

        /**
         * Build main page.
         */
    var student_dict = buildBubbles(Grouper.active_group);
    buildFilters(Grouper.active_group, student_dict);
    //$('#help_tooltip').show();
    console.log('building page');
        /*
        } else {
            $('#newUser').show();
            $('#newUserStart').fadeIn();
            $('#group_dropdown_label').hide();
        }
        */
};