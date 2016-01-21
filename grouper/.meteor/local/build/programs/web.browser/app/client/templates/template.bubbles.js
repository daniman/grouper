(function(){
Template.__checkName("bubbles");
Template["bubbles"] = new Template("Template.bubbles", (function() {
  var view = this;
  return HTML.Raw('<div id="help_tooltip"><span class="glyphicon glyphicon-question-sign" aria-hidden="true"></span></div>\n\n    <div id="bubbleContainer"></div>\n    <div id="buttons">\n        <button id="edit" type="button" class="btn btn-sm mainButton" style="background-color: rgb(0, 188, 212);">Edit</button>\n        <button id="export" type="button" class="btn btn-md mainButton">Export</button>\n    </div>');
}));

})();
