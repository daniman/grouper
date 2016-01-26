Template.firstStep.events({
  'keyup #groupName': function(e, t) {
    t.data.state.set('name', e.currentTarget.value);
  },

  'dragover #dropzone': function(e, t) {
    e.preventDefault();
    $(e.currentTarget).addClass('dragover');
  },

  'dragleave #dropzone': function(e, t) {
    $(e.currentTarget).removeClass('dragover');
  },

  'drop, change #dropzone': function(e, t) {
    e.preventDefault();
    $(e.currentTarget).removeClass('dragover');
    var files = event.target.files || event.dataTransfer.files; // fetch File object

    Papa.parse(files[0], {
      header: true,
      complete: function(results) {
        // TODO: run the magic grouping algorithm
        t.data.state.set('data', results.data);

        // TODO: creation of filters is messy
        var filters = helpers.buildFilters(results.data)
        t.data.state.set('filters', filters);
        t.data.state.set('settings', helpers.defaultSettings(filters));

        var file = files[0];
        t.data.state.set('file', {
          'name': file.name,
          'type': file.type,
          'size': helpers.bytesToSize(file.size, 2),
          'modified': file.lastModifiedDate.toLocaleDateString()
        });

        $('#import-next').removeClass('inactive');
        if (!t.data.state.get('name')) {
          t.data.state.set('name', file.name);
        };
      },
      error: function(err, file) {
        console.log(err); // TODO: proper error handling
      }
    });
  }
});

Template.firstStep.helpers({
  name: function() {
    return Template.instance().data.state.get('name');
  },

  filename: function() {
    var file = Template.instance().data.state.get('file');
    if (file) {
      return file;
    } else {
      return false;
    }
  }
});
