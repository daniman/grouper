var CSVTools = {};

// Functions for uploading file
CSVTools.Upload = {

	bytesToSize: function(bytes, precision) {  
	    var kilobyte = 1024;
	    var megabyte = kilobyte * 1024;
	    var gigabyte = megabyte * 1024;
	    var terabyte = gigabyte * 1024;
	    if ((bytes >= 0) && (bytes < kilobyte)) {
	        return bytes + ' B';
	    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
	        return (bytes / kilobyte).toFixed(precision) + ' KB';
	    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
	        return (bytes / megabyte).toFixed(precision) + ' MB';
	    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
	        return (bytes / gigabyte).toFixed(precision) + ' GB';
	    } else if (bytes >= terabyte) {
	        return (bytes / terabyte).toFixed(precision) + ' TB';
	    } else {
	        return bytes + ' B';
	    }
	},

	//provides file information in bullet point
	nameFile: function(file) {
		var listElement = 
			"<li><strong>" + file.name +
			"</strong> (" + file.type +
			") - " + CSVTools.Upload.bytesToSize(file.size, 2) +
			", last modified: " + file.lastModifiedDate.toLocaleDateString();
		return listElement;
	},

	// tests for the end of a line
	testForLineBreak: function(char) {
		var lineEnd = new RegExp('\n');
		return lineEnd.test(char);
	},

	// $.csv.toArrays function comes from jquery-csv.js library and is only used here to translate data into array
	parseStringToArray: function(string) {
		return $.csv.toArrays(string);
	},

	// called when file is draged over drop zone
	DragOverHandler: function(e) {
		e.stopPropagation();
		e.preventDefault();
		e.target.className = (e.type == "dragover" ? "hover" : "");  //adds class to shadow the box when you hover over it
	}

};

$.extend(CSVTools.Upload, CSVTools);


// reads file one blob at a time, tests each byte in the file for line end character
// and if readBlob finds the end of a line it pushes that new row to the table
var csvString = ""; // keeps track of one line at a time
var rowNumber = 0; // counter for keeping track of the row numbers in the file
var start = 0; // counter for reading file in byte chunks
function readBlob(file, blobSize, endOfLineAction, isLastLine) {
	var reader = new FileReader();
	reader.onloadend = function(e) {
		if (e.target.readyState == FileReader.DONE) {
			var contents = e.target.result;
			for (byte in contents) {
				if (CSVTools.Upload.testForLineBreak(contents[byte])) {
					var array = CSVTools.Upload.parseStringToArray(csvString);
					endOfLineAction(array[0], rowNumber);
					csvString = "";
					rowNumber ++;
				} else {
					csvString = csvString.concat(contents[byte]);
				}
			}
			// without this and the isLastLine variable the last line of the csv will be lost
			if (isLastLine==='yes') {
				var array = CSVTools.Upload.parseStringToArray(csvString);
				endOfLineAction(array[0], rowNumber);
				csvString = "";
			}
		}
	}
	var blob = file.slice(start, start + blobSize)
	reader.readAsBinaryString(blob);
	start += blobSize;
}