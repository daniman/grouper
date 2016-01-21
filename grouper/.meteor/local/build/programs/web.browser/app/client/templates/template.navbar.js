(function(){
Template.__checkName("navbar");
Template["navbar"] = new Template("Template.navbar", (function() {
  var view = this;
  return HTML.DIV({
    id: "navbar"
  }, HTML.Raw('\n    <span id="logo">\n      Grouper.\n    </span>\n\n    '), HTML.DIV({
    "class": "classlist dropdown"
  }, "\n      ", HTML.A({
    "class": "dropdown-toggle",
    id: "group_dropdown_label",
    role: "button",
    "data-toggle": "dropdown",
    "data-target": "#",
    href: "main.html"
  }, "\n        ", Blaze.View("lookup:activeClass", function() {
    return Spacebars.mustache(view.lookup("activeClass"));
  }), "\n        ", HTML.Raw('<span class="glyphicon glyphicon-menu-down"></span>'), "\n      "), "\n      ", HTML.UL({
    id: "class_dropdown",
    "class": "dropdown-menu",
    role: "menu",
    "aria-labelledby": "dLabel"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("classlist"));
  }, function() {
    return [ "\n          ", HTML.LI({
      role: "presentation"
    }, "\n            ", HTML.A({
      "class": "classlist_item",
      role: "menuitem",
      tabindex: "1",
      href: "#",
      value: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));
      }
    }, "\n              ", Blaze.View("lookup:..name", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "name"));
    }), "\n              ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("."), "active"));
    }, function() {
      return [ "\n                ", HTML.SPAN({
        "class": "glyphicon glyphicon-pushpin"
      }), "\n              " ];
    }), "\n            "), "\n          "), "\n        " ];
  }), "\n\n        ", HTML.Raw('<li role="presentation" class="divider"></li>'), "\n        ", HTML.Raw('<li role="presentation">\n          <a role="menuitem" tabindex="1" href="#" id="importButtonLabel">\n            Add New Class <button type="button" class="btn btn-sm" id="importButton">+</button>\n          </a>\n        </li>'), "\n\n      "), "\n    "), HTML.Raw('\n      \n    <img id="fishImg" src="img/fish.png" height="35" width="58">\n\n    '), Spacebars.include(view.lookupTemplate("loginButtons")), "\n  ");
}));

})();
