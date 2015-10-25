$(document).ready(function() {

	/**
	 * Remove input error messages between modal transitions.
	 */
	$('.modal').on('hidden.bs.modal', function () {
	    $('.inputError').html('');
	});

	$(document).on('click', '#importButtonLabel, #importButton, #new_user_import_button', function() {
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
	  								"<span class='glyphicon glyphicon-trash'></span>" +
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
	$("#edit_data_categories").on('keyup', 'input', function(e){
		if(e.keyCode == 13) {
	    	$(e.target).parent().children('.ok').children('a').click()
	    }
		
	});
	var oldName = ''
	$("#edit_data_categories").on('click', '.clearitem a', function(){
    	$(this).parent().parent().fadeOut();
    	var val = $(this).parent().parent()[0].getAttribute('value');
    	// console.log(val);
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
    	// console.log(parent[0].getAttribute('value'));
	});

	$("#edit_data_categories").on('click', '.ok a', function(){
		var newName = $(this).parent().siblings('input').val();
		var value = $(this).parent().parent()[0].getAttribute('value');
		Grouper.group_setup.settings.labels[value] = newName;
		$(this).parent().parent().html("<span class='clearitem'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-trash'></span>" +
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
							"<span class='glyphicon glyphicon-trash'></span>" +
						"</a>" +
					"</span>" +
					"<span class='edit'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-pencil'></span>" +
						"</a>" +
					"</span>" + 
					oldName);
	});
	$("#edit_data_categories").on('keyup', 'input', function(e){
		if(e.keyCode == 13)
	    {
	    	$("#edit_data_categories .ok a").trigger('click');
	    }
		
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
	    $('.numberOfGroupsInput').val(Grouper.group_setup.settings.group_by.num_groups);
		$('.numberOfPeopleInput').val(Grouper.group_setup.settings.group_by.group_size);
		$(".maxPeopleInput").click();

		$(".maxGroupsInput").parent().children('input[type=number]')[0].max = Grouper.group_setup.data.length;
		$(".maxPeopleInput").parent().children('input[type=number]')[0].max = Grouper.group_setup.data.length;
	});

	$('#groupifyModal').on('hidden.bs.modal', function () {
	    $('.edit_error_message').html('');
	});

	$('.glyphicon-plus.numberIncrementer').click(function(event) {
		ClearSelection();
		if ($(event.target).hasClass('inactive')) {
			return false;
		} else {
			var input = $(event.target).parent().children('input[type=number]');
			var num = parseInt(input.val());

			var max;
			var modalType = input[0].className.substr(input[0].className.length-4);
			if (modalType == 'Edit') { // Edit Modal
				max = Grouper.active_group.data.length;
			} else if (modalType == 'nput') { // Input Modal
				max = Grouper.group_setup.data.length;
			}

			if (num >= max) {
				$('.edit_error_message').html(alertMessage('You cannot that many groups or people/group.'));
			} else {
				$(".edit_error_message").html('');
				input.val(num+1);

				if (input[0].className == 'numberOfPeopleInput') {
					Grouper.group_setup.settings.group_by.group_size = input.val();
				} else if (input[0].className == 'numberOfGroupsInput') {
					Grouper.group_setup.settings.group_by.num_groups = input.val();
				}  else if (input[0].className == 'numberOfPeopleEdit') {
					Grouper.active_group.settings.group_by.group_size = input.val();
				}  else if (input[0].className == 'numberOfGroupsEdit') {
					Grouper.active_group.settings.group_by.num_groups = input.val();
				}

				Parse.User.current().save(
		            {'groups': Grouper.groups }, 
		            { error: function(obj, error) { console.log(error); }
		        });
			}
		}
	});

	$('.glyphicon-minus.numberIncrementer').click(function(event) {
		ClearSelection();
		if ($(event.target).hasClass('inactive')) {
			return false;
		} else {
			var input = $(event.target).parent().children('input[type=number]');
			var num = parseInt(input.val())

			if (num <= 1) {
				$('.edit_error_message').html(alertMessage('You cannot have less than 1 group or 1 person/group.'));
			} else {
				$(".edit_error_message").html('');
				input.val(num-1);

				if (input[0].className == 'numberOfPeopleInput') {
					Grouper.group_setup.settings.group_by.group_size = input.val();
				} else if (input[0].className == 'numberOfGroupsInput') {
					Grouper.group_setup.settings.group_by.num_groups = input.val();
				}  else if (input[0].className == 'numberOfPeopleEdit') {
					Grouper.active_group.settings.group_by.group_size = input.val();
				}  else if (input[0].className == 'numberOfGroupsEdit') {
					Grouper.active_group.settings.group_by.num_groups = input.val();
				}

				Parse.User.current().save(
		            {'groups': Grouper.groups }, 
		            { error: function(obj, error) { console.log(error); }
		        });
			}
		}
	})

	$(".maxPeopleInput").click(function() {
		console.log('max people');
		$(".numberOfPeopleInput").prop("disabled", false);
		$(".numberOfPeopleInput").val(Grouper.group_setup.settings.group_by.group_size);
		$(".numberOfPeopleInput").css({'color': 'black'});

		$(".numberOfGroupsInput").prop("disabled", true);
		$(".numberOfGroupsInput").css({'color': '#a3a3a3'});
		Grouper.group_setup.settings.group_by.pref = 'group_size';

		$(".numberOfGroupsInput").parent().children('.glyphicon').addClass('inactive');
		$(".numberOfPeopleInput").parent().children('.glyphicon').removeClass('inactive');
	});

	$(".maxGroupsInput").click(function() {
		console.log('max groups');
		$(".numberOfGroupsInput").prop("disabled", false);
		$(".numberOfGroupsInput").val(Grouper.group_setup.settings.group_by.num_groups);
		$(".numberOfGroupsInput").css({'color': 'black'});

		$(".numberOfPeopleInput").prop("disabled", true);
		$(".numberOfPeopleInput").css({'color': '#a3a3a3'});
		Grouper.group_setup.settings.group_by.pref = 'num_groups';

		$(".numberOfGroupsInput").parent().children('.glyphicon').removeClass('inactive');
		$(".numberOfPeopleInput").parent().children('.glyphicon').addClass('inactive');
	});

	$('.numberOfPeopleInput').keypress(function(key) {
        if ((key.which < 48 || key.which > 57) && !(key.which > 36 && key.which < 41) && (key.which != 8)) {
        	return false;
        }
    });

    $('.numberOfPeopleInput').keyup(function(key) {
    	if (!((key.which < 48 || key.which > 57) && !(key.which > 36 && key.which < 41) && (key.which != 8))) {
        	if (parseInt($(this).val()) > $(this)[0].max) {
       			$(".edit_error_message").html(alertMessage('You cannot have that many people per group.'));
       		} else {
       			$(".edit_error_message").html('');
       			Grouper.group_setup.settings.group_by.group_size = parseInt($(this).val());
       		}
        } else {
        	$(".edit_error_message").html(alertMessage('You must enter a number.'));
        }
    });

	$('.numberOfGroupsInput').keypress(function(key) {
        if ((key.which < 48 || key.which > 57) && !(key.which > 36 && key.which < 41) && (key.which != 8)) {
        	return false;
        }
    });

    $('.numberOfGroupsInput').keyup(function(key) {
        if (!((key.which < 48 || key.which > 57) && !(key.which > 36 && key.which < 41) && (key.which != 8))) {
       		if (parseInt($(this).val()) > parseInt($(this)[0].max)) {
       			$(".edit_error_message").html(alertMessage('You cannot have that many groups.'));
       		} else {
       			$(".edit_error_message").html('');
       			Grouper.group_setup.settings.group_by.num_groups = parseInt($(this).val());
       		}
        } else {
        	$(".edit_error_message").html(alertMessage('You must enter a number.'));
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

			groupify(Grouper.active_group);

			Parse.User.current().save(
				{'groups': Grouper.groups }, 
				{ error: function(obj, error) { console.log(error); }
	        });

			localStorage.setItem('active_group', Grouper.active_group['name']);
			buildPage();
		}
	})
/********************************** Edit Modal **********************************/

	$('#editModal').on('hidden.bs.modal', function () {
	    $('.edit_error_message').html('');
	});

	$('#editModal').on('show.bs.modal', function () {
		$("#editGroupName").val(Grouper.active_group.name);
		$('.numberOfGroupsEdit').val(Grouper.active_group.settings.group_by.num_groups);
		$('.numberOfPeopleEdit').val(Grouper.active_group.settings.group_by.group_size);

		if (Grouper.active_group.settings.group_by.pref == 'num_groups') {
			$(".maxGroupsEdit").click();
		} else {
			$(".maxPeopleEdit").click();
		}

		$(".maxGroupsEdit").parent().children('input[type=number]')[0].max = Grouper.active_group.data.length;
		$(".maxPeopleEdit").parent().children('input[type=number]')[0].max = Grouper.active_group.data.length;

		var headers = Grouper.active_group.settings.priorities;
	    var headers_html = '';
	    for (var i=0; i<headers.length; i++) {
	  		headers_html += "<li class='category'></li>";
	  	}
		$('#edit_data_current_categories').html(headers_html);

		var deleted = Object.keys(Grouper.active_group.filters).filter(function(obj) {
						   if (Grouper.active_group.settings.priorities.indexOf(obj) < 0) {
						      return obj
						   }
						});
	    var deleted_html = '';
	    for (var i=0; i<deleted.length; i++) {
	  		deleted_html += "<li class='category'></li>";
	  	}
		$('#edit_data_current_categories_deleted').html(deleted_html);

		$('#edit_data_current_categories .category').each(function(index, element) {
			var headers = Grouper.active_group.settings.priorities;
		  	element.setAttribute('value', headers[index]);
		  	// console.log("index: "+index);
		  	// console.log("headers: "+headers);
		  	// console.log(Grouper.active_group.settings.labels[headers[index]]);
		  	$(element).html("<span class='clearitem'>" +
	  							"<a href='#'>" +
	  								"<span class='glyphicon glyphicon-trash'></span>" +
	  							"</a>" +
	  						"</span>" +
	  						"<span class='edit'>" +
	  							"<a href='#'>" +
	  								"<span class='glyphicon glyphicon-pencil'></span>" +
	  							"</a>" +
	  						"</span>" + 
	  						Grouper.active_group.settings.labels[headers[index]]);

		});
		$('#edit_data_current_categories_deleted .category').each(function(index, element) {
			var deleted = Object.keys(Grouper.active_group.filters).filter(function(obj) {
						   if (Grouper.active_group.settings.priorities.indexOf(obj) < 0) {
						      return obj
						   }
						});
			element.setAttribute('value', deleted[index]);
		  	$(element).html("<span class='addItem'>" +
	  							"<a href='#'>" +
	  								"<span class='glyphicon glyphicon-plus add'></span>" +
	  							"</a>" +
	  						"</span>" + 
	  						Grouper.active_group.settings.labels[deleted[index]]);
		});

		$('#editModal .btn').on('click', function(){
			// console.log('Re-Groupifying');
			Grouper.active_group.name = $("#editGroupName").val();
			groupify(Grouper.active_group);
			Parse.User.current().save(
				{'groups': Grouper.groups }, 
				{ error: function(obj, error) { console.log(error); }
	        });
			buildPage();
		});

	});

	var oldName = '';
	$("#edit_data_current_categories").on('click', '.clearitem a', function(){
    	$(this).parent().parent().fadeOut();
    	var val = $(this).parent().parent()[0].getAttribute('value');
    	// console.log(val);

    	var priorities = Grouper.active_group.settings.priorities;
    	priorities.splice(priorities.indexOf(val), 1);
    	$("#editModal").trigger('show');
	});

	$("#edit_data_current_categories_deleted").on('click', '.addItem a', function(){
    	$(this).parent().parent().fadeOut();
    	var val = $(this).parent().parent()[0].getAttribute('value');
    	// console.log(val);
    	
    	var priorities = Grouper.active_group.settings.priorities;
    	priorities.push(val);
    	$("#editModal").trigger('show');
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
					'<input class="editText" type="text" text='+oldName+'>');
    	parent.children('input').val(oldName);
    	// console.log(parent[0].getAttribute('value'));


	});
	$("#edit_data_current_categories").on('keyup', 'input', function(e){
		if(e.keyCode == 13)
	    {
	    	$("#edit_data_current_categories .ok a").trigger('click');
	    }
		
	});
	$("#edit_data_current_categories").on('click', '.ok a', function(){
		var newName = $(this).parent().siblings('input').val();
		var value = $(this).parent().parent()[0].getAttribute('value');
		Grouper.active_group.settings.labels[value] = newName;
		$(this).parent().parent().html("<span class='clearitem'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-trash'></span>" +
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
							"<span class='glyphicon glyphicon-trash'></span>" +
						"</a>" +
					"</span>" +
					"<span class='edit'>" +
						"<a href='#'>" +
							"<span class='glyphicon glyphicon-pencil'></span>" +
						"</a>" +
					"</span>" + 
					oldName);
	});

	$(".maxPeopleEdit").click(function() {
		$(".numberOfPeopleEdit").prop("disabled", false);
		$(".numberOfPeopleEdit").val(Grouper.active_group.settings.group_by.group_size);
		$(".numberOfPeopleEdit").css({'color': 'black'});

		$(".numberOfGroupsEdit").prop("disabled", true);
		$(".numberOfGroupsEdit").css({'color': '#a3a3a3'});
		Grouper.active_group.settings.group_by.pref = 'group_size';

		$(".numberOfPeopleEdit").parent().children('.glyphicon').removeClass('inactive');
		$(".numberOfGroupsEdit").parent().children('.glyphicon').addClass('inactive');

		Parse.User.current().save(
				{'groups': Grouper.groups }, 
				{ error: function(obj, error) { console.log(error); }
	        });
	});

	$(".maxGroupsEdit").click(function() {
		$(".numberOfGroupsEdit").prop("disabled", false);
		$(".numberOfGroupsEdit").val(Grouper.active_group.settings.group_by.num_groups);
		$(".numberOfGroupsEdit").css({'color': 'black'});

		$(".numberOfPeopleEdit").prop("disabled", true);
		$(".numberOfPeopleEdit").css({'color': '#a3a3a3'});
		Grouper.active_group.settings.group_by.pref = 'num_groups';

		$(".numberOfPeopleEdit").parent().children('.glyphicon').addClass('inactive');
		$(".numberOfGroupsEdit").parent().children('.glyphicon').removeClass('inactive');

		Parse.User.current().save(
				{'groups': Grouper.groups }, 
				{ error: function(obj, error) { console.log(error); }
	        });
	});

	$('.numberOfPeopleEdit').keypress(function(key) {
        if ((key.which < 48 || key.which > 57) && !(key.which > 36 && key.which < 41) && (key.which != 8)) {
        	return false;
        }
    });

    $('.numberOfPeopleEdit').keyup(function(key) {
    	if (!((key.which < 48 || key.which > 57) && !(key.which > 36 && key.which < 41) && (key.which != 8))) {
        	if (parseInt($(this).val()) > $(this)[0].max) {
       			$(".edit_error_message").html(alertMessage('You cannot have that many people per group.'));
       		} else {
       			$(".edit_error_message").html('');
       			var val = parseInt($(this).val());
       			if (val) {
       				Grouper.active_group.settings.group_by.group_size = val;
       			}

       			Parse.User.current().save(
					{'groups': Grouper.groups }, 
					{ error: function(obj, error) { console.log(error); }
		        });
       		}
        } else {
        	$(".edit_error_message").html(alertMessage('You must enter a number.'));
        }
    });

	$('.numberOfGroupsEdit').keypress(function(key) {
        if ((key.which < 48 || key.which > 57) && !(key.which > 36 && key.which < 41) && (key.which != 8)) {
        	return false;
        }
    });

    $('.numberOfGroupsEdit').keyup(function(key) {
        if (!((key.which < 48 || key.which > 57) && !(key.which > 36 && key.which < 41) && (key.which != 8))) {
       		if (parseInt($(this).val()) > parseInt($(this)[0].max)) {
       			$(".edit_error_message").html(alertMessage('You cannot have that many groups.'));
       		} else {
       			$(".edit_error_message").html('');
       			Grouper.active_group.settings.group_by.num_groups = parseInt($(this).val());

       			Parse.User.current().save(
					{'groups': Grouper.groups }, 
					{ error: function(obj, error) { console.log(error); }
		        });
       		}
        } else {
        	$(".edit_error_message").html(alertMessage('You must enter a number.'));
        }
    });

    //sortable list for priorities
    $("#edit_data_current_categories").sortable({
    	update: function(event) {
    		var list = $('#edit_data_current_categories').children();
    		list.each(function(index, element) {
    			var value = $(element).text();
    			Grouper.active_group.settings.priorities[index] = element.getAttribute('value');
    		})
    	}
    });
    $( "#edit_data_current_categories" ).disableSelection();
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


	$("#delete_group").click(function(){
		if (confirm("Are you sure you want to delete this grouping? You will lose all group data for this class"))
		{
		    var groups;

			groups = Grouper.groups.filter(function(obj) {
				return obj != Grouper.active_group;
			});

			console.log('ACTIVE GROUP: ' + Grouper.active_group['name']);
			console.log(groups);

			Parse.User.current().save(
				{'groups': groups }, 
				{ error: function(obj, error) { console.log(error); }
	        });

			localStorage.removeItem('active_group');
			$('#editModal').modal('hide');
			buildPage();
		}
		
	});

/********************************** Student/Group Modals **********************************/

	// $('.bubble_text').tooltip({'placement': 'top', 'container':'body', 'html':'true'});
	// $('.hull').tooltip({'placement': 'right', 'container':'body', 'html':'true', 'delay': 550});

	// $('.bubble_text').attr('data-toggle', 'tooltip');
	// $('.bubble_text').attr('data-origpinal-title', 'Double Click for Information');

	// $('.hull').attr('data-toggle', 'tooltip');
	// $('.hull').attr('data-original-title', 'Double Click for Information');

	$('#help_tooltip').attr({
		'data-toggle': 'tooltip',
		'data-placement': 'bottom',
		'data-html': true,
		'title': '<span style="text-align: center;"><strong>Tips:</strong></span> <br /> ' +
					'1. Double click circles for more information.<br .> ' +
					'2. Double click hulls for more information.<br /> ' +
					'3. Click two consecutive circles to swap them. <br />' +
					'4. Drag circles to change group arrangements. <br />' +
					'5. Click backspace on selected circle to remove it.'
	});
	$('#help_tooltip').tooltip();



	//displays the correct student information for the bubble clicked
	$(document).on('dblclick', '.bubble', function(evt){
		var id = parseInt($(evt.target).parent()[0].getAttribute('student_id'));
		var student = Grouper.active_group.map[id];
		displayStudentInfo(student);
		$(".glyphicon-chevron-left").click(function(){
			id = (id - 1)%(parseInt(Grouper.active_group.data.length)-1);
			displayStudentInfo(Grouper.active_group.map[Math.abs(id)]);
		});
		$(".glyphicon-chevron-right").click(function(){
			id = (id +1)%(parseInt(Grouper.active_group.data.length)-1);
			displayStudentInfo(Grouper.active_group.map[Math.abs(id)]);
		});
    });

	// listen to arrow keys for fast modal browsing
    $(document).on('keyup', function(event) {
    	if ($('#studentModal').is(':visible')) {
    		if (event.which == 37) {
				$(".glyphicon-chevron-left").click();
			} else if (event.which == 39) {
				$(".glyphicon-chevron-right").click();
			}
    	}
	});

	//displays the correct group information for the hull clicked

	$(document).on('mousedown', '.hull', function(){ return false; })
	$(document).on('dblclick', '.hull', function(evt) {


		var studentList = '<table class="groupShow" style="width:100%"><tbody>';
		var idGroup = parseInt($(evt.target).attr('group'));
		var categories = Grouper.active_group.settings.priorities;
		var students = Grouper.active_group.data;
		var groupStudents = []

		studentList = studentList.concat(addCategories(categories));
		
		for (var j = students.length - 1; j >= 0; j--) {
			if(students[j]['group']==idGroup){
				groupStudents.push(students[j]);
				studentList = studentList.concat("<tr>");
				studentList = studentList.concat(stringify(students[j], categories));
				studentList = studentList.concat("</tr>");
			}
		}
		var id ='';
		var types = [];
		for (var i = 0; i <= categories.length - 1; i++) {
			var results = [];
			id = categories[i]+'Chart';
			types = Grouper.active_group.filters[categories[i]];
			$('#charts').append('<div id='+id+' class="charts"></div>');

			for (var  k = 0; k <= types.length - 1; k++) {
				results.push(numOccurences(types[k], groupStudents, categories[i]));
			};
			makeCharts(categories[i], id, types, results, idGroup);
		};
		$('#groupNumber').html(idGroup+1);
		$('#groupStudents').html(studentList);
		$("#groupModal").modal("show");
	})

});

var addCategories = function(categories){
	var headerString = "<tr>";
	for (var k = 0; k < categories.length; k++) {
		headerString = headerString.concat("<th>"+Grouper.active_group.settings.labels[categories[k]]+"</th>");
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
	  		dataString = dataString.concat('<td>'+(parseInt(json[key])+1)+'</td>');
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
function displayStudentInfo(student){
	$('#studentName').html(student['name']);
	$('#studentSex').html(student['gender']);
	var headers = Grouper.active_group.settings.priorities;
	var labels = Grouper.active_group.settings.labels;
    var info = '';
    for (var i=0; i<headers.length; i++) {
    	if(headers[i]!='name' && headers[i]!='gender'){
    		info += "<h4>"+labels[headers[i]]+": "+student[headers[i]]+"</h4>";
    	} 		
  	}
	$('#otherInfo').html(info);
}
function numOccurences(target, arr, cat){ 
	return $.grep(arr, function (elem) {return elem[cat] === target;}).length;
}
function makeCharts(title, chartID, categoryTypes, result, idGroup ){
	

	$('#'+chartID).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: title,
            style: {
                fontSize: '15px'
            }
        },
        xAxis: {
        	type: 'category',
            categories: categoryTypes
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
            data: result
        }]
	});
	
}
