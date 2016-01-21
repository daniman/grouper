(function(){
Template.__checkName("grouper");
Template["grouper"] = new Template("Template.grouper", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("navbar")), "\n  ", Spacebars.include(view.lookupTemplate("filters")), "\n  ", Spacebars.include(view.lookupTemplate("bubbles")), HTML.Raw('\n\n    <!-- <div id="loginContainer">\n      <img id="fishImg" src="assets/img/fish.png" height="35" width="58">\n      <div id="loginWrapper">\n        <span id="login_logo">Grouper.</span>\n        <div id="login_tagline">A simple solution to your group making needs.</div>\n        <div id="login_error_message"></div>\n        <input id="login_email" type="text" placeholder="Email"><br>\n        <input id="login_password" type="password" placeholder="Password"><br>\n        <button class="login" id="login_signup_button" type="button" >Login</button>\n        <a id="login_signup_toggle">Or Sign Up</a>\n      </div>\n    </div> -->\n\n    <!-- <div id="newUser"></div>\n    <div id="newUserStart">\n      <div>Welcome to <span class="logoName">Grouper.</span></div>\n      <div class="welcomeMessage">We can see that you have not started grouping any classes yet. Please <strong>click</strong> the button <strong>below</strong> to get started.</div>\n      <button type="button" class="btn btn-sm" id="new_user_import_button">Import a Class</button>\n    </div> -->\n\n  '), Spacebars.include(view.lookupTemplate("modals")) ];
}));

})();
