$(document).ready(function() {

	/**
	 * Remove input error messages between modal transitions.
	 */
	$('.modal').on('hidden.bs.modal', function () {
	    $('.inputError').html('');
	});

	$('#importButtonLabel').click(function() {
		$('#importModal').modal('show');
	});

	$("#edit").click(function(){
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
			if (Grouper.group_setup['data']) {
				$('#importModalNext').removeClass('inactive');
			}
			Grouper.group_setup['name'] = $(this).val();
			if(e.keyCode == 13) {
			  	$('#editDataModal').modal('show');
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

	  var headers = Object.keys(Grouper.group_setup['data'][0]);
	  var headers_html = '';
	  for (var i=0; i<headers.length; i++) {
	  	headers_html += "<input class='cat_label_conf' type='text' value='" + headers[i] + "'> " +
	  					"<span class='glyphicon glyphicon-remove' aria-hidden='true'></span><br>"
	  }
	  $('#edit_data_categories').html(headers_html);
	});

/********************************** Import Modal: STEP 3 **********************************/

	/**
	 * On modal build.
	 */
	$('#prioritizeDataModal').on('show.bs.modal', function () {
	  $('#editDataModal').modal('hide');
	  $('#groupifyModal').modal('hide');

        var prioritize_html = '';
        var cats = Object.keys(Grouper.group_setup.settings.labels);
        for (var i=0; i<cats.length; i++) {
        	prioritize_html += '<li class="category" style=""><span class="glyphicon glyphicon-sort" aria-hidden="true"></span>' + Grouper.group_setup.settings.labels[cats[i]] + '</li>'
        }
	  	$('#inputModalSortable').html(prioritize_html)
	});

	//sortable list for priorities
    $("#inputModalSortable").sortable({
    	update: function(event) {
    		Grouper.group_setup.settings.priorities = [];
    		var list = $('#inputModalSortable').children();
    		list.each(function(index) {
    			var value = this.innerText;
    			var keys = Object.keys(Grouper.group_setup.settings.labels);
    			for (var i=0; i<keys.length; i++) {
    				if (Grouper.group_setup.settings.labels[keys[i]] == value) {
    					Grouper.group_setup.settings.priorities.push(keys[i]);
    				}
    			}
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
		console.log('click');
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
			Grouper.groups.push(Grouper.active_group);
			Grouper.group_setup = {};

			$('#class_dropdown').prepend('<li role="presentation"><a class="classlist_item" role="menuitem" tabindex="1" href="#">' + Grouper.active_group['name'] + '</a></li>');
       		$('a#group_dropdown_label').html(Grouper.active_group['name'] + ' <b class="caret"></b>');

			$('#filters').html('');
			$('#bubbleContainer').html('');
			buildBubbles();
    		buildFilters();
			
		}
	})

/********************************** Export Modal **********************************/

	$("#export").click(function(){

		var stringify = function(json){
			var dataString = '';
			for (var i = 0; i < categories.length; i++){
				var key = categories[i];
			  if (json.hasOwnProperty(key)) {
			    dataString = dataString.concat('<td>'+json[key]+'</td>');
			  }
			}
			return dataString;
		}

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
		    	groupings += '<tr>' + stringify(group_map[i][j]) + '</tr>';
		    }

			groupings += "</tbody></table>";
			groupings += "<br>";
		};

		$('#exportModal').modal('show');
		$("#groupPreview").html(groupings);
	});
	

/********************************** Student/Group Modals **********************************/

	// $('.bubble').tooltip({'placement': 'top', 'delay': 1050});
	// $('.hull').tooltip({'placement': 'right', 'container':'body', 'html':'true', 'delay': 550});

	// $('.bubble').attr('data-toggle', 'tooltip');
	// $('.bubble').attr('data-origpinal-title', 'Double Click for Information');

	// $('.hull').attr('data-toggle', 'tooltip');
	// $('.hull').attr('data-original-title', 'Double Click for Information');

	//displays the correct student information for the bubble clicked
	$(".bubble").dblclick(function(evt){
		var id = parseInt($(evt.target).parent().attr('id').split('_')[1]);

	  $('#studentName').html(students[id]['name']);
	  $('#studentSex').html(students[id]['gender']);
	  $('#studentCourseNumber').html("Course "+students[id]['course_number']);
	  $('#studentYear').html(students[id]['year']);
      $("#studentModal").modal("show");

      evt.stopPropagation();
    });

	//displays the correct group information for the hull clicked
	$('.hull').mousedown(function(){ return false; })
	$(".hull").dblclick(function(evt){
		evt.stopPropagation();
		ClearSelection();

		var studentList = '<table class="groupShow" style="width:100%"><tbody>';
		var idGroup = parseInt($(evt.target).attr('group'));
		studentList = studentList.concat(addCategories());
		
		for (var j = students.length - 1; j >= 0; j--) {
			if(students[j]['group']==idGroup){
				studentList = studentList.concat("<tr>");
				studentList = studentList.concat(stringify(students[j]));
				studentList = studentList.concat("</tr>");
			}
		}
		$('#groupNumber').html(idGroup+1);
		$('#groupStudents').html(studentList);
		$("#groupModal").modal("show");
	});

});

function alertMessage(message) {
	return '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ' + message;
}

function ClearSelection() {
    if (window.getSelection)
        window.getSelection().removeAllRanges();
    else if (document.selection)
        document.selection.empty();
}