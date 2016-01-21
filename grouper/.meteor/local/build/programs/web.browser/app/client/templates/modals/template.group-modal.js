(function(){
Template.__checkName("groupModal");
Template["groupModal"] = new Template("Template.groupModal", (function() {
  var view = this;
  return HTML.DIV({
    "class": "modal fade",
    id: "groupModal",
    tabindex: "-1",
    role: "dialog",
    "aria-labelledby": "myModalLabel",
    "aria-hidden": "true"
  }, "\n      ", HTML.DIV({
    "class": "modal-dialog"
  }, "\n        ", HTML.DIV({
    "class": "modal-content"
  }, "\n          ", HTML.Raw('<div class="modal-header">\n            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n            <h4 class="modal-title">Group Information</h4>\n          </div>'), "\n\n          ", HTML.DIV({
    "class": "modal-body"
  }, "\n            ", HTML.DIV({
    "class": "container-fluid"
  }, "\n              ", HTML.DIV({
    "class": "hullTitle"
  }, "\n                ", HTML.U("Group ", Blaze.View("lookup:hullIndex", function() {
    return Spacebars.mustache(view.lookup("hullIndex"));
  })), "\n                ", HTML.I("(", Blaze.View("lookup:rows.length", function() {
    return Spacebars.mustache(Spacebars.dot(view.lookup("rows"), "length"));
  }), " people)"), "\n              "), "\n                      \n              ", HTML.TABLE({
    "class": "table table-striped table-condensed table-bordered"
  }, "\n                ", HTML.THEAD("\n                  ", HTML.TR("\n                    ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("cols"));
  }, function() {
    return [ "\n                      ", HTML.TH(Blaze.View("lookup:.", function() {
      return Spacebars.mustache(view.lookup("."));
    })), "\n                    " ];
  }), "\n                  "), "\n                "), "\n                ", HTML.TBODY("\n                  ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("rows"));
  }, function() {
    return [ "\n                    ", Blaze._TemplateWith(function() {
      return Spacebars.call(view.lookup("."));
    }, function() {
      return Spacebars.include(view.lookupTemplate("exportCols"));
    }), "\n                  " ];
  }), "\n                "), "\n              "), "\n\n              ", HTML.Raw('<!-- {{> highchartsHelper chartId="test" chartWidth="150px" chartHeight="200px" chartObject=pieChart data="this"}} -->'), "\n            "), "\n          "), "\n\n          ", HTML.Raw('<div class="modal-footer">\n            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n          </div>'), "\n        "), "\n      "), "\n    ");
}));

})();
