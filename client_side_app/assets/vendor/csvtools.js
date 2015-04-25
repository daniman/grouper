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

	nameFile: function(file, targetId, err) {
		if (file.type.split('/')[1] == 'csv') {
			if(!err) {
				listElement = "<p><strong>" + file.name + "</strong>" +
								" (" + file.type +") - " + csvtools.upload.bytesToSize(file.size, 2) +
								", last modified: " + file.lastModifiedDate.toLocaleDateString() + 
							"<br>" + "Number of students:" + Grouper.students.length  + 
							"<br>" + "Headers: " + Object.keys(Grouper.students[0]) + "</p>";
								$('#importModalNextButton').removeClass('disabled');
			} else {
				listElement = "<span class='error_message'>We're sorry, we've encountered a problem reading your file: <br>" + err + "</span>";
				$('#importModalNextButton').addClass('disabled');
			}
		} else {
			listElement = "<span class='error_message'>" + "<strong>" + file.name + "</strong> is not a csv file. <br>" +
							"Please input a <strong>.csv</strong> formatted file.</span>";
			$('#importModalNextButton').addClass('disabled');
		}
		$(targetId).html(listElement);
	},

	dragOverHandler: function(e) {
		e.stopPropagation();
		e.preventDefault();
		if (e.type == 'dragover') {
			if (e.target.id == 'dropzone' || $('#'+e.target.id).parent().attr('id')) {
				$('#dropzone').addClass('dragover');
			}
		} else if (e.type == 'dragleave' || e.type == 'drop') {
			$('#' + e.target.id).removeClass('dragover');
		}
	},

	readFile: function(file) {
		var reader = new FileReader();
		reader.onloadend = function(e) {
			if (e.target.readyState == FileReader.DONE) {
				try {
					$.csv.toObjects(e.target.result, {}, function(err,data) {
						console.log(data);
						Grouper.students = data;
						csvtools.upload.nameFile(file, '#fileInfo', false);
					});
				} catch(err) {
					csvtools.upload.nameFile(file, '#fileInfo', err.message);
				}
			}
		}
		reader.readAsBinaryString(file);
	}
};

$.extend(csvtools.upload, csvtools);
