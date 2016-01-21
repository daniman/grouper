(function(){
Template.__checkName("studentModal");
Template["studentModal"] = new Template("Template.studentModal", (function() {
  var view = this;
  return HTML.DIV({
    "class": "modal fade",
    id: "studentModal",
    tabindex: "-1",
    role: "dialog",
    "aria-labelledby": "myModalLabel",
    "aria-hidden": "true"
  }, "\n    ", HTML.DIV({
    "class": "modal-dialog modal-sm"
  }, "\n      ", HTML.DIV({
    "class": "modal-content"
  }, "\n        ", HTML.Raw('<div class="modal-header">\n          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n          <h4 class="modal-title">Student Information</h4>\n        </div>'), "\n\n        ", HTML.DIV({
    "class": "modal-body"
  }, "\n          ", HTML.TABLE({
    "class": "table table-condensed table-striped table-bordered"
  }, "\n            ", HTML.TBODY("\n              ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("data"));
  }, function() {
    return [ "\n                ", HTML.TR("\n                  ", HTML.TD(HTML.B(Blaze.View("lookup:..label", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "label"));
    }), ":")), "\n                  ", HTML.TD(Blaze.View("lookup:..data", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("."), "data"));
    })), "\n                "), "\n              " ];
  }), "\n            "), "\n          "), "\n        "), "\n\n        ", HTML.Raw('<div class="modal-footer">\n          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        </div>'), "\n      "), "\n    "), "\n  ");
}));

})();
