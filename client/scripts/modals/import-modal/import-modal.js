Template.importModal.created = function() {
  this.state = new ReactiveDict();
}

Template.importModal.helpers({
  state: function() {
    return Template.instance().state;
  }
})
