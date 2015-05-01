Parse.initialize("lRtcO1f1WmMtYzBEpr7OAh2A5HnOTOdkeWRkcKPk", "KrZYA9yZ4u0qvswVop2AWdpTWBAvAzUxyxwJPvyr");

$(document).ready(function() {

    function login(email, password) {
        Parse.User.logIn(email, password, {
              success: function(user) {
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

    $('#loginWrapper > input').on('keyup', function(event) {
        if (event.which == 13) {
            $('#login_signup_button').click();
        }
    })

    $('#login_signup_button').click(function(event) {
        var email = $('#login_email').val();
        var password = $('#login_password').val();

        if ($(this).html() == 'Login') {
            login(email, password);
        } else {
            Parse.User.signUp(email, password, {
                'email': email,
                'groups': []
            }, {
              success: function(user) {
                login(email, password)
              },
              error: function(user, error) {
                $('#login_error_message').html('<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ' + error.message);
              }
            });
        }
    });

    $('#logout_button').click(function(event) {

        Parse.User.current().save({
                'groups': Grouper.groups
            }, {
                success: function(obj) {
                },
                error: function(obj, error) {
                    console.log(error);
                }
            });

        var logged_out = Parse.User.logOut();
        if (logged_out._resolved) {
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
            $('#login_signup_button').html('Login')
            // .removeClass('signup').addClass('login');

            $('#login_signup_button').animate({
                'background-color': '#FF9800',
                'border-color': '#FF9800'
            });

        } else {
            $(this).html('Or Login');
            $('#login_signup_button').html('Sign Up')
            // .removeClass('login').addClass('signup');
            $('#login_signup_button').animate({
                'background-color': '#00BCD4',
                'border-color': '#00BCD4'
            });
        }
    });
});
