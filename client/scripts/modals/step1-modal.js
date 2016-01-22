Template.step1Modal.events({
    'dragover #dropzone': function() {
        $('#dropzone').addClass('dragover');
    },

    'dragleave #dropzone': function() {
        $('#dropzone').removeClass('dragover');
    },
});

Template.step1Modal.onRendered(function() {
    document.getElementById('dropzone').addEventListener('drop', FileSelectHandler, false);
    document.getElementById('file_select').addEventListener('change', FileSelectHandler, false);
});

Template.step1Modal.helpers({
    className: function() {
        return Session.get('import_class')['name'];
    }
});

var FileSelectHandler = function(event) {
    $('#dropzone').removeClass('dragover');
    var files = event.target.files || event.dataTransfer.files; // fetch File object
    csvtools.upload.readFile(files[0], '#fileInfo');
}

