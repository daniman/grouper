$(document).ready(function() {

    if (!(window.File && window.FileList && window.FileReader && window.Blob)) {
        alert('The File APIs are not fully supported in this browser. The Drag and Drop feature is disabled.');
    }

    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
        document.getElementById('dropzone').addEventListener('dragover', csvtools.upload.dragOverHandler, false);
        document.getElementById('dropzone').addEventListener('dragleave', csvtools.upload.dragOverHandler, false);
        document.getElementById('dropzone').addEventListener('drop', FileSelectHandler, false)
        document.getElementById('file_select').addEventListener('change', FileSelectHandler, false)
    }

    // $('#importButtonLabel').click()

});

var FileSelectHandler = function(event) {
  csvtools.upload.dragOverHandler(event);
  var files = event.target.files || event.dataTransfer.files; // fetch File object
  csvtools.upload.readFile(files[0], '#fileInfo');
}