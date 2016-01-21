(function(){
Template.__checkName("step1Modal");
Template["step1Modal"] = new Template("Template.step1Modal", (function() {
  var view = this;
  return HTML.DIV({
    "class": "modal",
    id: "importModal",
    tabindex: "-1",
    role: "dialog",
    "aria-labelledby": "myModalLabel",
    "aria-hidden": "true"
  }, "\n      ", HTML.DIV({
    "class": "modal-dialog"
  }, "\n        ", HTML.DIV({
    "class": "modal-content"
  }, "\n          ", HTML.Raw('<div class="modal-header">\n            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n            <h4 class="modal-title" id="myModalLabel">Step 1: <i>Import Data</i></h4>\n          </div>'), "\n\n          ", HTML.DIV({
    "class": "modal-body"
  }, "\n            ", HTML.DIV("Name Your Class: ", HTML.INPUT({
    type: "text",
    id: "groupName",
    value: function() {
      return Spacebars.mustache(view.lookup("className"));
    }
  })), "\n\n            ", HTML.DIV({
    id: "dropzone"
  }, "\n              ", HTML.Raw("<div>Drag a CSV file here</div>"), "\n              ", HTML.Raw("<p><i>or if you prefer...</i></p>"), "\n              ", HTML.Raw('<input type="file" id="file_select" name="fileselect" size="40">'), "\n              ", HTML.DIV({
    id: "fileInfo"
  }, "\n                ", Blaze.View("lookup:fileInfo", function() {
    return Spacebars.mustache(view.lookup("fileInfo"));
  }), "\n              "), "\n            "), "\n          "), "\n\n          ", HTML.Raw('<ol class="progtrckr" data-progtrckr-steps="4">\n            <li class="progtrckr-done">Import Data</li><li class="progtrckr-todo">Edit Data</li><li class="progtrckr-todo">Prioritize Data</li><li class="progtrckr-todo">Groupify</li>\n          </ol>'), "\n\n          ", HTML.Raw('<div class="modal-footer">\n            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n            <button type="button" class="btn btn-info inactive" id="importModalNext">Next</button>\n          </div>'), "\n        "), "\n      "), "\n    ");
}));

})();
