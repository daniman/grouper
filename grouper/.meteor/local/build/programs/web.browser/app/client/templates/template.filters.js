(function(){
Template.__checkName("filters");
Template["filters"] = new Template("Template.filters", (function() {
  var view = this;
  return HTML.DIV({
    id: "filterContainer"
  }, "\n      ", HTML.DIV({
    "class": "filterTypeTitle"
  }, "\n        Labels:\n        ", HTML.SELECT({
    name: "labels",
    id: "labels"
  }, "\n          ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("filters"));
  }, function() {
    return [ "\n            ", HTML.OPTION({
      value: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "data"));
      },
      selected: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label_selected"));
      }
    }, Blaze.View("lookup:..label", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));
    })), "\n          " ];
  }), "\n        "), "\n      "), HTML.Raw('\n\n      <div class="filterTypeTitle">\n        Color Filters:\n      </div>\n      '), HTML.UL({
    id: "filters"
  }, "\n        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("filters"));
  }, function() {
    return [ "\n          ", HTML.LI("\n            ", HTML.INPUT({
      id: function() {
        return [ Spacebars.mustache(Spacebars.dot(view.lookup("."), "data")), "_filter" ];
      },
      "class": "filter_cat",
      type: "radio",
      name: "filters",
      value: function() {
        return [ Spacebars.mustache(Spacebars.dot(view.lookup("."), "index")), "_", Spacebars.mustache(Spacebars.dot(view.lookup("."), "data")) ];
      },
      checked: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "color_selected"));
      }
    }), "\n            ", HTML.LABEL({
      "class": "filter_cat_label",
      "for": function() {
        return [ Spacebars.mustache(Spacebars.dot(view.lookup("."), "data")), "_filter" ];
      }
    }, "\n                ", Blaze.View("lookup:..label", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));
    }), "\n            "), HTML.BR(), "\n            ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("."), "color_selected"));
    }, function() {
      return [ "\n              ", Blaze.View("lookup:..color_map", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "color_map"));
      }), "\n            " ];
    }), "\n          "), "\n        " ];
  }), "\n      "), "\n    ");
}));

})();
