(function(){
Template.__checkName("editModal");
Template["editModal"] = new Template("Template.editModal", (function() {
  var view = this;
  return HTML.DIV({
    "class": "modal fade",
    id: "editModal",
    tabindex: "-1",
    role: "dialog",
    "aria-labelledby": "myModalLabel",
    "aria-hidden": "true"
  }, "\n      ", HTML.DIV({
    "class": "modal-dialog"
  }, "\n        ", HTML.DIV({
    "class": "modal-content"
  }, "\n          ", HTML.Raw('<div class="modal-header">\n            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n            <h4 class="modal-title">Edit Groupify Settings</h4>\n          </div>'), "\n          \n          ", HTML.DIV({
    "class": "modal-body"
  }, "\n            ", HTML.Raw("<b>Edit Name:</b>"), HTML.INPUT({
    type: "text",
    id: "editGroupName",
    value: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("data"), "name"));
    }
  }), "\n\n            ", HTML.Raw("<b>Edit Labels:</b>"), "\n            ", HTML.DIV({
    "class": "edit-col-container"
  }, "\n              ", HTML.DIV({
    "class": "edit-col"
  }, "\n                ", HTML.Raw('<div class="edit-col-title">Active</div>'), "\n                ", HTML.UL({
    id: "edit_data_current_categories"
  }, "\n                    ", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("data"), "active"));
  }, function() {
    return [ "\n                        ", HTML.LI({
      "class": "category",
      value: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "data"));
      }
    }, "\n                            ", Blaze.If(function() {
      return Spacebars.call(Spacebars.dot(view.lookup("."), "edit"));
    }, function() {
      return [ "\n                                ", HTML.SPAN({
        "class": "cancelItem"
      }, "\n                                    ", HTML.SPAN({
        "class": "glyphicon glyphicon-remove"
      }), "\n                                "), "\n                                ", HTML.SPAN({
        "class": "okItem"
      }, "\n                                   ", HTML.SPAN({
        "class": "glyphicon glyphicon-ok"
      }), "\n                                "), "\n                                ", HTML.INPUT({
        "class": "editText",
        type: "text",
        value: function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));
        },
        autofocus: ""
      }), "\n                            " ];
    }, function() {
      return [ "\n                                ", HTML.SPAN({
        "class": "clearItem"
      }, "\n                                    ", HTML.SPAN({
        "class": "glyphicon glyphicon-trash"
      }), "\n                                "), "\n                                ", HTML.SPAN({
        "class": "editItem",
        index: function() {
          return Spacebars.mustache(Spacebars.dot(view.lookup("."), "index"));
        }
      }, "\n                                    ", HTML.SPAN({
        "class": "glyphicon glyphicon-pencil"
      }), "\n                                "), "\n                                ", Blaze.View("lookup:..label", function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));
      }), "\n                            " ];
    }), "\n                        "), "\n                    " ];
  }), "\n                "), "\n              "), "\n              ", HTML.DIV({
    "class": "edit-col"
  }, "\n                ", HTML.Raw('<div class="edit-col-title">Inactive</div>'), "\n                ", HTML.UL({
    id: "edit_data_current_categories_deleted"
  }, "\n                    ", Blaze.Each(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("data"), "deleted"));
  }, function() {
    return [ "\n                        ", HTML.LI({
      "class": "category",
      value: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("."), "data"));
      }
    }, "\n                            ", HTML.SPAN({
      "class": "addItem"
    }, "\n                                ", HTML.SPAN({
      "class": "glyphicon glyphicon-plus add"
    }), "\n                            "), "\n                            ", Blaze.View("lookup:..label", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));
    }), "\n                        "), "\n                    " ];
  }), "\n                "), "\n              "), "\n            "), "\n\n            ", HTML.Raw("<b>Edit Group Sizing:</b>"), HTML.Raw('<span class="edit_error_message"></span>'), "\n            ", HTML.DIV({
    "class": "edit-col-container sizesInput"
  }, "\n                ", HTML.DIV({
    "class": "edit-col"
  }, "\n                    ", HTML.Raw('<div class="sizesLabel">Group By</div>'), "\n                    ", HTML.DIV({
    "class": "sizesChoose"
  }, "\n                        ", HTML.INPUT({
    type: "radio",
    id: "people",
    name: "max",
    "class": "sizesSelect",
    value: "people",
    checked: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("data"), "sizes", "people_selected"));
    }
  }), HTML.Raw('<label for="people">People per Group</label>'), "\n                        ", HTML.Raw("<br>"), "\n                        ", HTML.INPUT({
    type: "radio",
    id: "groups",
    name: "max",
    "class": "sizesSelect",
    value: "groups",
    checked: function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("data"), "sizes", "groups_selected"));
    }
  }), HTML.Raw('<label for="groups">No. Groups</label>'), "\n                    "), "\n                "), "\n                ", HTML.DIV({
    "class": "edit-col"
  }, "\n                    ", Blaze.If(function() {
    return Spacebars.call(Spacebars.dot(view.lookup("data"), "sizes", "people_selected"));
  }, function() {
    return [ "\n                        ", HTML.DIV({
      "class": "sizesLabel"
    }, "Max Number of People per Group"), "\n                        ", HTML.INPUT({
      type: "number",
      min: "1",
      "class": "sizesEdit",
      value: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("data"), "sizes", "people"));
      }
    }), "\n                    " ];
  }, function() {
    return [ "\n                        ", HTML.DIV({
      "class": "sizesLabel"
    }, "Max Number of Groups"), "\n                        ", HTML.INPUT({
      type: "number",
      min: "1",
      "class": "sizesEdit",
      value: function() {
        return Spacebars.mustache(Spacebars.dot(view.lookup("data"), "sizes", "groups"));
      }
    }), "\n                    " ];
  }), "\n                    ", HTML.Raw('<span class="glyphicon glyphicon-plus numInc" aria-hidden="true"></span>'), "\n                    ", HTML.Raw('<span class="glyphicon glyphicon-minus numInc" aria-hidden="true"></span>'), "\n                "), "\n            "), "\n          "), "\n\n          ", HTML.Raw('<div class="modal-footer">\n            <button id="delete_group" type="button" class="btn btn-danger">Delete Group</button>\n            <button id="reGroupify" type="button" class="btn btn-info" data-dismiss="modal">Re-Groupify</button>\n          </div>'), "\n        "), "\n      "), "\n    ");
}));

})();
