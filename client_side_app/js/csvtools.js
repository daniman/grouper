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
		var listElement = '<hr>'
		if (file.type.split('/')[1] == 'csv') {
			if(!err) {
				listElement += "<p><strong>" + file.name + "</strong>" +
								" (" + file.type +") - " + csvtools.upload.bytesToSize(file.size, 2) +
								", last modified: " + file.lastModifiedDate.toLocaleDateString() + 
							"<br>" + "We have detected <strong>" + Grouper.group_setup['data'].length + "</strong> students and <strong>" + 
									Object.keys(Grouper.group_setup['data'][0]).length + "</strong> different data category headers.</p>";
				if ($('#newGroupName').val().length > 0) {
					$('#importModalNext').removeClass('inactive');
				}
			} else {
				listElement += "<span class='error_message'><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span> We're sorry, we've encountered a problem reading your file: <br>" + err + "</span>";
				$('#importModalNext').addClass('inactive');
			}
		} else {
			listElement += "<span class='error_message'><span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>" + " <strong>" + file.name + "</strong> is not a csv file. <br>" +
							"Please input a <strong>.csv</strong> formatted file.</span>";
			$('#importModalNext').addClass('inactive');
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

	buildFilters: function(data) {
	    var parameters = {};
	    var filters = Object.keys(data[0]);
	    for (var i=0; i<filters.length; i++) {
	            parameters[filters[i]] = [];
	    }
	    for (var i=0; i<data.length; i++) {
	        for (var j=0; j<filters.length; j++) {
	            var filter = filters[j];
	            var category = data[i][filter];
	            if (parameters[filter].indexOf(category) < 0) {
	                parameters[filter].push(category);
	            }
	        }
	    }
	    for (i in filters) {
	        parameters[filters[i]].sort(function(a, b){return a-b});
	    }
	    return parameters;
	},

	getDefaultSettings: function(filters) {
		var labels = Object.keys(filters);
		var settings = {
		    labels: {},
		    priorities: labels,
		    group_by: {
		        pref: 'group_size',
		        num_groups: '',
		        group_size: '5'
		    }
		};
		
		for (var i=0; i<labels.length; i++) {
		  	settings.labels[labels[i]] = labels[i]; // sets the header to itself to start
		}

		return settings;
	},

	readFile: function(file) {
		var reader = new FileReader();
		reader.onloadend = function(e) {
			if (e.target.readyState == FileReader.DONE) {
				try {
					$.csv.toObjects(e.target.result, {}, function(err,data) {
						console.log(Grouper.group_setup['name']);
						var name = (Grouper.group_setup['name'] ? Grouper.group_setup['name'] : '')

						/**
						 * Group object skeleton.
						 */
						Grouper.group_setup = {
						    name: name,
						    settings: {},
						    data: [],
						    filters: []
						};
						// Set group data.
						Grouper.group_setup['data'] = data;
						Grouper.group_setup['filters'] = csvtools.upload.buildFilters(data);
						Grouper.group_setup['settings'] = csvtools.upload.getDefaultSettings(Grouper.group_setup['filters'])

						csvtools.upload.nameFile(file, '#fileInfo', false);
					});
				} catch(err) {
					Grouper.group_setup['data'] = null;
					csvtools.upload.nameFile(file, '#fileInfo', err.message);
				}
			}
		}
		reader.readAsBinaryString(file);
	}
};

$.extend(csvtools.upload, csvtools);
