$(document).ready(function() {

// defined as an empty array for the case where the user clicks the format button without dragging a file or pasting any data in the textbox
    uploadArray = []

    if (window.File && window.FileList && window.FileReader && window.Blob) {
        Init();
    } else {
        alert('The File APIs are not fully supported in this browser. The Drag and Drop feature is disabled.');
    }

});

// initialize
function Init() {
    // is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
        // file drop
        document.getElementById("dropzone").addEventListener("dragover", CSVTools.Upload.DragOverHandler, false);
        document.getElementById("dropzone").addEventListener("dragleave", CSVTools.Upload.DragOverHandler, false);
        document.getElementById("dropzone").addEventListener("drop", FileSelectHandler, false);
    }
}

function addRowToTable(array, rowNumber) {
    var content = '';
    for (var i=0; i<array.length; i++) {
        content += '<td>' + array[i] + '</td>';
    }
    $('#content').append('<tr>' + content + '</tr>');
}

// once file is selected
function FileSelectHandler(e) {
    input = [];
    output = [];
    // cancel event and hover styling
    CSVTools.Upload.DragOverHandler(e);
    // fetch FileList object
    var files = e.target.files || e.dataTransfer.files;
    console.log(files);
    // process all File objects
    for (var i = 0, f; f = files[i]; i++) {
        output.push(CSVTools.Upload.nameFile(f));
        var defaultBlobSize = 1024;
        for (var b = 0; b<f.size; b+=(defaultBlobSize)) {
            console.log('count')
            readBlob(f, defaultBlobSize, addRowToTable);
        }
        var remainder = f.size%(defaultBlobSize);
        readBlob(f, remainder, addRowToTable, 'yes')
    }
    document.getElementById('fileInfo').innerHTML = '<ul>' + output.join('') + '</ul>';
}