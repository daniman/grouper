var csvtools = {};

csvtools.upload = {

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
	nameFile: function(file, targetId) {
		var listElement = 
			"<strong>" + file.name + "</strong>" +
			" (" + file.type +") - " + 
			csvtools.upload.bytesToSize(file.size, 2) +
			", last modified: " + file.lastModifiedDate.toLocaleDateString();
		$(targetId).html(listElement);
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
	dragOverHandler: function(e) {
		e.stopPropagation();
		e.preventDefault();
		if (e.type == 'dragover') {
			$('#' + e.target.id).addClass('dragover');
		} else if (e.type == 'dragleave' || e.type == 'drop') {
			$('#' + e.target.id).removeClass('dragover');
		}
	},

	readFile: function(file, endOfLineAction) {
		var csvString = ''; // keeps track of one line at a time
		var rowNumber = 0; // counter for keeping track of the row numbers in the file
		var reader = new FileReader();
		reader.onloadend = function(e) {
			if (e.target.readyState == FileReader.DONE) {
				var contents = e.target.result;
				for (byte in contents) {
					if (csvtools.upload.testForLineBreak(contents[byte])) {
						var row = csvtools.upload.parseStringToArray(csvString)[0];
						endOfLineAction(row, rowNumber);
						csvString = ''; rowNumber ++;
					} else {
						csvString = csvString.concat(contents[byte]);
					}
				}
				var lastRow = csvtools.upload.parseStringToArray(csvString)[0];
				endOfLineAction(lastRow, rowNumber);
			}
		}
		reader.readAsBinaryString(file);
	}

};

$.extend(csvtools.upload, csvtools);
