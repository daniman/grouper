$(document).ready(function() {

	/**
	 * Remove input error messages between modal transitions.
	 */
	$('.modal').on('hidden.bs.modal', function () {
	    $('.inputError').html('');
	});

/********************************** Import Modal: STEP 1 **********************************/

	/**
	 * On modal build.
	 */
	$('#importModal').on('show.bs.modal', function () {
	  $('#editDataModal').modal('hide');
	});
	
	/** 
	 * Safety logic for the import modal group name input (step 1).
	 */
	$('#newGroupName').keyup(function(e){
		if (Grouper.group_setup['data'] && $(this).val().length > 0) {
			$('#importModalNext').removeClass('inactive');
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
        	prioritize_html += '<li class="category"><span class="glyphicon glyphicon-sort" aria-hidden="true"></span>' + Grouper.group_setup.settings.labels[cats[i]] + '</li>'
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

	//on sortable adds a highlight when hovering
	$(".category").hover(function(e){
        $(e.target).css("outline", "2px solid #FF9800");
        $(e.target).css("cursor", "pointer");
        },function(){
        $(".category").css("outline", "none");
        $(".category").css("cursor", "default");
    });

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
	// TODO: disable button logic
	$('#groupifyButton').click(function() {
		if($('.numberOfGroups').val()=="" && $('.numberOfPeople').val()==""){
			$(".inputError").html(alertMessage('Please choose an option and enter a number.'));
		} else {
			console.log(Grouper.group_setup);
			$('#groupifyModal').modal('hide');

			Grouper.active_group = Grouper.group_setup;
			Grouper.group_setup = {};

			$('#filters').html('');
			$('#bubbleContainer').html('');
			buildBubbles(Grouper.active_group);
    		buildFilters(Grouper.active_group);
			
		}
	})

/********************************** Export Modal **********************************/

    var groupNumber = 7;
    var categories = ['name','course_number','gender','year','sports_team'];

	$("#export").click(function(){

		var groupings = '';
		var sorted = students.sort(function(a,b) { return parseFloat(b.group) - parseFloat(a.group)});

		for (var i = 0; i < groupNumber; i++) {
			groupings = groupings.concat('<h4>Group '+(i+1)+':</h4>');
			groupings = groupings.concat('<table class="groupShow" style="width:100%"><tbody>');
			groupings = groupings.concat(addCategories());
			for (var j = students.length - 1; j >= 0; j--) {
				
				if(students[j]['group']==i){
					// console.log(stringify(students[j]));
					groupings = groupings.concat("<tr>");
					groupings = groupings.concat(stringify(students[j]));
					groupings = groupings.concat("</tr>");
				}
			}
			groupings = groupings.concat("</tbody></table>");
			groupings = groupings.concat("<br>");
		};

		$('#exportModal').modal('show');
		$("#groupPreview").html(groupings);
	})
	var addCategories = function(){
		var headerString = "<tr>";
		for (var k = 0; k < categories.length; k++) {
			headerString = headerString.concat("<th>"+categories[k]+"</th>");
		};
		headerString = headerString.concat("</tr>");
		return headerString;
	}
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
	
	$("#edit").click(function(){
		$('#editModal').modal('show');
	})

	$('#importButtonLabel').click(function() {
		$('#importModal').modal('show');
	})

	$('.classlist .dropdown-menu').click(function() {
		$('.dropdown-toggle').dropdown();
	})

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