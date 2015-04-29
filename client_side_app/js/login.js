Parse.initialize("lRtcO1f1WmMtYzBEpr7OAh2A5HnOTOdkeWRkcKPk", "KrZYA9yZ4u0qvswVop2AWdpTWBAvAzUxyxwJPvyr");

$(document).ready(function() {

    function login(username, password) {
        Parse.User.logIn(username, password, {
              success: function(user) {
                // $('#loginContainer').hide();
                // $('#filterContainer').fadeIn();
                // $('#bubbleContainer').fadeIn();
                // $('.dropdown').fadeIn();

                // Grouper.username = Parse.User.current().attributes.username;
                // Grouper.groups = Parse.User.current().attributes.groups;
                // $('#username_dropdown_label').html(Grouper.username + ' <b class="caret"></b>');

                buildPage();

                $('#login_email').val('');
                $('#login_password').val('');
                $('#login_error_message').html('');
              },
              error: function(user, error) {
                $('#login_error_message').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ' + error.message);
                $('#login_password').val('');
              }
        });
    }

    $('#login_signup_button').click(function(event) {
        var email = $('#login_email').val();
        var password = $('#login_password').val();

        if ($(this).hasClass('login')) {
            login(email.split('@')[0], password);
        } else {
            Parse.User.signUp(email.split('@')[0], password, {
                'email': email,
                'groups': []
            }, {
              success: function(user) {
                login(email.split('@')[0], password)
              },
              error: function(user, error) {
                $('#login_error_message').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ' + error.message);
              }
            });
        }
    });

    $('#logout_button').click(function(event) {
        var logged_out = Parse.User.logOut();
        if (logged_out._resolved) {
            // $('#loginContainer').fadeIn();
            // $('#filterContainer').hide();
            // $('#bubbleContainer').hide();
            // $('.dropdown').hide();
            buildPage()

            Grouper.username = '';
            Grouper.groups = [];
            Grouper.active_group = {};
            Grouper.group_setup = {};
        } 
    });

    $('#login_signup_toggle').click(function(event) {
        if ($(this).html() == 'Or Login') {
            $(this).html('Or Sign Up');
            $('#login_signup_button').html('Login').removeClass('signup').addClass('login');
        } else {
            $(this).html('Or Login');
            $('#login_signup_button').html('Sign Up').removeClass('login').addClass('signup');
        }
    });
});