$(document).ready(function() {

	/**
	 * Remove input error messages between modal transitions.
	 */
	$('.modal').on('hidden.bs.modal', function () {
	    $('.inputError').html('');
	});

	$(document).on('click', '#importButtonLabel, #importButton', function() {
		$('#importModal').modal('show');
	});

	$(document).on('click', '#edit', function(){
		$('#editModal').modal('show');
	});

/********************************** Import Modal: STEP 1 **********************************/

	/**
	 * On modal build.
	 */
	$('#importModal').on('show.bs.modal', function () {
	  $('#editDataModal').modal('hide');

	  $('#newGroupName').val((Grouper.group_setup['name'] != undefined ? Grouper.group_setup['name'] : ''));
	  if (!Grouper.group_setup.data) {
	  	$('#fileInfo').html('');
	  }

	  if (!Grouper.group_setup['data']) {
	  	$('#importModalNext').addClass('inactive');
	  }
	});
	
	/** 
	 * Safety logic for the import modal group name input (step 1).
	 */
	$('#newGroupName').keyup(function(e){
		if ($(this).val().length > 0) {
			Grouper.group_setup['name'] = $(this).val();
			if (Grouper.group_setup['data']) {
				$('#importModalNext').removeClass('inactive');
				if(e.keyCode == 13) {
				  	$('#editDataModal').modal('show');
				}
			}
		} else {
			$('#importModalNext').addClass('inactive');
		}
	});

	/**
	 * Safety logic for the import modal next button (step 1).
	 */
	$('#importModalNext').on('click', function () {
		if ($(this).hasClass('inactive')) {
			if ($('#newGroupName').val().length > 0) {
				$('.inputError').html(alertMessage('Import your class data!'));
				$('#file_select').focus();
			} else {
				$('.inputError').html(alertMessage('Enter a name for your class!'));
				$('#newGroupName').focus();
			}
			return false;
		} else {
			$('#importModal').modal('hide');
	 		$('#editDataModal').modal('show');
		}
	});

/********************************** Import Modal: STEP 2 **********************************/

	/**
	 * On modal build.
	 */
	$('#editDataModal').on('show.bs.modal', function () {
	  $('#importModal').modal('hide');
	  $('#prioritizeDataModal').modal('hide');

	    var headers = Grouper.group_setup.settings.priorities;
	    var headers_html = '';
	    for (var i=0; i<headers.length; i++) {
	  		headers_html += "<li class='category'></li>";
	  	}
		$('#edit_data_categories').html(headers_html);

		$('.category').each(function(index, element) {
		  	element.setAttribute('value', headers[index]);
		  	$(element).html("<span class='clearitem'>" +
	  							"<a href='#'>" +
	  								"<span class='glyphicon glyphicon-remove'></span>" +
	  							"</a>" +
	  						"</span>" +
	  						"<span class='edit'>" +
	  							"<a href='#'>" +
	  								"<span class='glyphicon glyphicon-pencil'></span>" +
	  							"</a>" +
	  						"</span>" + 
	  						Grouper.group_setup.settings.labels[headers[index]]);
		});
	});
	var oldName = ''
	$("#edit_data_categories").on('click', '.clearitem a', function(){
    	$(this).parent().parent().fadeOut();
    	var val = $(this).parent().parent()[0].getAttribute('value');
    	console.log(val);
    	var priorities = Grouper.group_setup.settings.priorities;
    	priorities.splice(priorities.indexOf(val), 1);
	});

	$("#edit_data_categories").on('dblclick', '.category', function(event){
		// event.stopPropagation();
		// ClearSelection();

		var headers = Grouper.group_setup.settings.priorities;
		oldName = $(this).text();
		var index = headers.indexOf(oldName);

		var parent = $(this);
    	parent.html("<span class='cancel'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-remove'></span>" +
						"</a>" +
					"</span>" +
					"<span class='ok'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-ok'></span>" +
						"</a>" +
					"</span>" + 
					'<input type="text" text='+oldName+'>');
    	parent.children('input').val(oldName);

	});

	$("#edit_data_categories").on('click', '.edit a', function(event){
		var headers = Grouper.group_setup.settings.priorities;
		oldName = $(this).parent().parent().text();
		var index = headers.indexOf(oldName);

		var parent = $(this).parent().parent();
    	pparent.html("<span class='cancel'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-remove'></span>" +
						"</a>" +
					"</span>" +
					"<span class='ok'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-ok'></span>" +
						"</a>" +
					"</span>" + 
					'<input type="text" text='+oldName+'>');
    	parent.children('input').val(oldName);
    	console.log(parent[0].getAttribute('value'));
	});

	$("#edit_data_categories").on('click', '.ok a', function(){
		var newName = $(this).parent().siblings('input').val();
		var value = $(this).parent().parent()[0].getAttribute('value');
		Grouper.group_setup.settings.labels[value] = newName;
		$(this).parent().parent().html("<span class='clearitem'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-remove'></span>" +
						"</a>" +
					"</span>" +
					"<span class='edit'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-pencil'></span>" +
						"</a>" +
					"</span>" + 
					newName);
	});
	$("#edit_data_categories").on('click', '.cancel a', function(){
		$(this).parent().parent().html("<span class='clearitem'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-remove'></span>" +
						"</a>" +
					"</span>" +
					"<span class='edit'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-pencil'></span>" +
						"</a>" +
					"</span>" + 
					oldName);
	});

/********************************** Import Modal: STEP 3 **********************************/

	/**
	 * On modal build.
	 */
	$('#prioritizeDataModal').on('show.bs.modal', function () {
	    $('#editDataModal').modal('hide');
	    $('#groupifyModal').modal('hide');

        var prioritize_html = '';
        var headers = Grouper.group_setup.settings.priorities;
        for (var i=0; i<headers.length; i++) {
        	prioritize_html += '<li class="sortable_category"></li>';
        }
        $('#inputModalSortable').html(prioritize_html)

        $('.sortable_category').each(function(index, element) {
		  	element.setAttribute('value', headers[index]);
		  	$(element).html('<span class="glyphicon glyphicon-sort" aria-hidden="true"></span>' + 
        							Grouper.group_setup.settings.labels[headers[index]]);
		});
	});

	//sortable list for priorities
    $("#inputModalSortable").sortable({
    	update: function(event) {
    		var list = $('#inputModalSortable').children();
    		list.each(function(index, element) {
    			var value = $(element).text();
    			Grouper.group_setup.settings.priorities[index] = element.getAttribute('value');
    		})
    	}
    });
    $( "#inputModalSortable" ).disableSelection();

/********************************** Import Modal: STEP 4 **********************************/

	/**
	 * On modal build.
	 */
	$('#groupifyModal').on('show.bs.modal', function () {
	  $('#prioritizeDataModal').modal('hide');
	});

	$(".maxPeople").click(function() {
		$(".numberOfPeople").prop("disabled", false);
		$(".numberOfPeople").val(Grouper.group_setup.settings.group_by.group_size);
		$(".numberOfPeople").css({'color': 'black'});

		$(".numberOfGroups").prop("disabled", true);
		$(".numberOfGroups").css({'color': '#a3a3a3'});
		Grouper.group_setup.settings.group_by.pref = 'num_groups';
	});

	$(".maxGroups").click(function() {
		$(".numberOfGroups").prop("disabled", false);
		$(".numberOfGroups").val(Grouper.user_prefgroup_setup.settingserences.group_by.num_groups);
		$(".numberOfGroups").css({'color': 'black'});

		$(".numberOfPeople").prop("disabled", true);
		$(".numberOfPeople").css({'color': '#a3a3a3'});
		Grouper.group_setup.settings.group_by.pref = 'group_size';
	});

	$('.numberOfPeople').keyup(function(key) {
        if(key.keyCode < 48 || key.keyCode > 57){
        	$(".inputError").html(alertMessage('You must enter a number.'));
        	return false;
        } else {
       		Grouper.group_setup.settings.group_by.group_size = parseInt($(this).val());
        }
    });

	$('.numberOfGroups').keyup(function(key) {
        if(key.keyCode < 48 || key.keyCode > 57){
        	$(".inputError").html(alertMessage('You must enter a number.'));
        	return false;
        } else {
       		Grouper.group_setup.settings.group_by.num_groups = parseInt($(this).val());
        }
    });

    /**
	 * Safety logic for the groupify modal (step 4).
	 */
	// TODO: logic for disabling button when number isn't entered
	$('#groupifyButton').click(function() {
		if($('.numberOfGroups').val()=="" && $('.numberOfPeople').val()==""){
			$(".inputError").html(alertMessage('Please choose an option and enter a number.'));
		} else {
			$('#groupifyModal').modal('hide');

			Grouper.active_group = Grouper.group_setup;
			Grouper.groups.unshift(Grouper.active_group);
			Grouper.group_setup = {};

			Parse.User.current().save({
				'groups': Grouper.groups
			}, {
				success: function(obj) {
				},
				error: function(obj, error) {
					console.log(error);
				}
			})

			// $('#class_dropdown').prepend('<li role="presentation"><a class="classlist_item" role="menuitem" tabindex="1" href="#">' + Grouper.active_group['name'] + '</a></li>');
       		// $('a#group_dropdown_label').html(Grouper.active_group['name'] + ' <b class="caret"></b>');

			buildPage();
		}
	})
/********************************** Edit Modal **********************************/

$('#editModal').on('show.bs.modal', function () {
		$("#editGroupName").val(Grouper.active_group.name);

		var headers = Grouper.active_group.settings.priorities;
	    var headers_html = '';
	    for (var i=0; i<headers.length; i++) {
	  		headers_html += "<li class='category'></li>";
	  	}

		$('#edit_data_current_categories').html(headers_html);

		$('.category').each(function(index, element) {

		  	element.setAttribute('value', headers[index]);
		  	$(element).html("<span class='clearitem'>" +
	  							"<a href='#'>" +
	  								"<span class='glyphicon glyphicon-remove delete'></span>" +
	  							"</a>" +
	  						"</span>" +
	  						"<span class='edit'>" +
	  							"<a href='#'>" +
	  								"<span class='glyphicon glyphicon-pencil'></span>" +
	  							"</a>" +
	  						"</span>" + 
	  						Grouper.active_group.settings.labels[headers[index]]);

		});

		$('#editModal').on('hide.bs.modal', function(){
			Grouper.active_group.name = $("#editGroupName").val();
			Parse.User.current().save({
                'groups': Grouper.groups
            }, {
                success: function(obj) {
                },
                error: function(obj, error) {
                    console.log(error);
                }
            });
			buildPage();
		});
	});
	var oldName = '';
	$("#edit_data_current_categories").on('click', '.clearitem a', function(){
    	$(this).parent().parent().fadeOut();
    	var val = $(this).parent().parent()[0].getAttribute('value');
    	console.log(val);
    	var priorities = Grouper.active_group.settings.priorities;
    	priorities.splice(priorities.indexOf(val), 1);
	});

	$("#edit_data_current_categories").on('dblclick', '.category', function(event){
		// event.stopPropagation();
		ClearSelection();

		var headers = Grouper.active_group.settings.priorities;
		oldName = $(this).text();
		var index = headers.indexOf(oldName);

		var parent = $(this);
    	parent.html("<span class='cancel'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-remove'></span>" +
						"</a>" +
					"</span>" +
					"<span class='ok'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-ok'></span>" +
						"</a>" +
					"</span>" + 
					'<input type="text" text='+oldName+'>');
    	parent.children('input').val(oldName);

	});

	$("#edit_data_current_categories").on('click', '.edit a', function(event){
		var headers = Grouper.active_group.settings.priorities;
		oldName = $(this).parent().parent().text();
		var index = headers.indexOf(oldName);

		var parent = $(this).parent().parent();
    	parent.html("<span class='cancel'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-remove'></span>" +
						"</a>" +
					"</span>" +
					"<span class='ok'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-ok'></span>" +
						"</a>" +
					"</span>" + 
					'<input type="text" text='+oldName+'>');
    	parent.children('input').val(oldName);
    	console.log(parent[0].getAttribute('value'));
	});

	$("#edit_data_current_categories").on('click', '.ok a', function(){
		var newName = $(this).parent().siblings('input').val();
		var value = $(this).parent().parent()[0].getAttribute('value');
		Grouper.active_group.settings.labels[value] = newName;
		$(this).parent().parent().html("<span class='clearitem'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-remove'></span>" +
						"</a>" +
					"</span>" +
					"<span class='edit'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-pencil'></span>" +
						"</a>" +
					"</span>" + 
					newName);
	});
	$("#edit_data_current_categories").on('click', '.cancel a', function(){
		$(this).parent().parent().html("<span class='clearitem'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-remove'></span>" +
						"</a>" +
					"</span>" +
					"<span class='edit'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-pencil'></span>" +
						"</a>" +
					"</span>" + 
					oldName);
	});
/********************************** Export Modal **********************************/

	$(document).on('click', '#export', function(){

		var groupNumber = Grouper.active_group.filters['group'].length;
	    var categories = Object.keys(Grouper.active_group.filters);

	    var group_map = {};
	    for (var i=0; i<groupNumber; i++) {
	    	group_map[i] = [];
	    }

	    Grouper.active_group.data.map(function(student) {
	    	group_map[student.group].push(student);
	    })

		var groupings = '';

		for (var i = 0; i < groupNumber; i++) {
			groupings += '<h4>Group ' + (i+1) + ':</h4>';
			groupings += '<table class="groupShow" style="width:100%"><tbody>';

			var headers = categories.map(function(cat) { return '<th>' + Grouper.active_group.settings.labels[cat] + '</th>'; });
			groupings += '<tr>' + headers.join('') + '</tr>';

			var students = Grouper.active_group.data.filter(function(student) {
		        return student.group == i;
		    })[0];

		    for (var j=0; j<group_map[i].length; j++) { // for each student in group
		    	groupings += '<tr>' + stringify(group_map[i][j], categories) + '</tr>';
		    }

			groupings += "</tbody></table>";
			groupings += "<br>";
		};

		$('#exportModal').modal('show');
		$("#groupPreview").html(groupings);
	});

	$(document).on('click', '#export_data', function() {
        var filename = Grouper.active_group['name'] + '.csv';

        var data = Grouper.active_group['data'].map(function(student) {
			var keys = Object.keys(Grouper.active_group['filters']);
			var datum = [];
			for (var i=0; i<keys.length; i++) {
				datum.push(student[keys[i]]);
			}
			return datum
		});
		data.unshift(Object.keys(Grouper.active_group['filters']));

        if (filename !== null) {
        	csvtools.Export.exportTableToCSV.apply(this, [data, filename]);
        }
	});




/********************************** Student/Group Modals **********************************/

	// $('.bubble').tooltip({'placement': 'top', 'delay': 1050});
	// $('.hull').tooltip({'placement': 'right', 'container':'body', 'html':'true', 'delay': 550});

	// $('.bubble').attr('data-toggle', 'tooltip');
	// $('.bubble').attr('data-origpinal-title', 'Double Click for Information');

	// $('.hull').attr('data-toggle', 'tooltip');
	// $('.hull').attr('data-original-title', 'Double Click for Information');

	//displays the correct student information for the bubble clicked
	$(document).on('dblclick', '.bubble', function(evt){
		var id = parseInt($(evt.target).parent()[0].getAttribute('student_id'));
		var student = Grouper.active_group.map[id];

		$('#studentName').html(student['name']);
		$('#studentSex').html(student['gender']);
		$('#studentCourseNumber').html("Course "+student['course_number']);
		$('#studentYear').html(student['year']);
	    $("#studentModal").modal("show");
    });

	//displays the correct group information for the hull clicked

	$(document).on('mousedown', '.hull', function(){ return false; })
	$(document).on('dblclick', '.hull', function(evt) {

		var numFemales = 0;
		var numMales = 0;
		var num15 = 0;
		var num16 = 0;
		var num17 = 0;
		var num18 = 0;

		var studentList = '<table class="groupShow" style="width:100%"><tbody>';
		var idGroup = parseInt($(evt.target).attr('group'));
		var categories = Object.keys(Grouper.active_group.filters);
		var students = Grouper.active_group.data;

		studentList = studentList.concat(addCategories(categories));
		
		for (var j = students.length - 1; j >= 0; j--) {
			if(students[j]['group']==idGroup){
				if(students[j]['gender']=="M"){
					numMales ++;
				}
				else{
					numFemales ++;
				}
				if(students[j]['year']=="2015"){
					num15 ++;
				}
				else if(students[j]['year']=="2016"){
					num16 ++;
				}
				else if(students[j]['year']=="2017"){
					num17 ++;
				}
				else{
					num18 ++;
				}
				studentList = studentList.concat("<tr>");
				studentList = studentList.concat(stringify(students[j], categories));
				studentList = studentList.concat("</tr>");
			}
		}

		$('#genderChart').highcharts({
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'Male/Female Ratio',
	            style: {
	                fontSize: '15px'
	            }
	        },
	        xAxis: {
	            categories: ['Males', 'Females']
	        },
	        yAxis: {
	            title: {
	                text: 'Number of Students'
	            }
	        },
	        legend: {
	                    enabled: false
	        },
	        series: [{
	            name: 'Group '+(idGroup+1),
	            colorByPoint: true,
	            data: [numMales, numFemales]
	        }]
    	});

		$('#yearChart').highcharts({
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'Graduation Year',
	            style: {
	                fontSize: '15px'
	            }
	        },
	        xAxis: {
	            categories: ['2015','2016','2017','2018']
	        },
	        yAxis: {
	            title: {
	                text: 'Number of Students'
	            }
	        },
	        legend: {
	                    enabled: false
	        },
	        series: [{
	            name: 'Group '+(idGroup+1),
	            colorByPoint: true,
	            data: [num15,num16,num17,num18]
	        }]
    	});
		$('#groupNumber').html(idGroup+1);
		$('#groupStudents').html(studentList);
		$("#groupModal").modal("show");
	})

});

var addCategories = function(categories){
	var headerString = "<tr>";
	for (var k = 0; k < categories.length; k++) {
		headerString = headerString.concat("<th>"+categories[k]+"</th>");
	};
	headerString = headerString.concat("</tr>");
	return headerString;
}

var stringify = function(json, categories){
	var dataString = '';
	for (var i = 0; i < categories.length; i++){
		var key = categories[i];
	  if (json.hasOwnProperty(key)) {
	  	if(key=="group"){
	  		dataString = dataString.concat('<td>'+(json[key]+1)+'</td>');
	  	}
	  	else{dataString = dataString.concat('<td>'+json[key]+'</td>');} 
	  }
	}
	return dataString;
}

function alertMessage(message) {
	return '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ' + message;
}

function ClearSelection() {
    if (window.getSelection)
        window.getSelection().removeAllRanges();
    else if (document.selection)
        document.selection.empty();
}
