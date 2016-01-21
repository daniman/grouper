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

	$(document).on('click', '#export', function(){
		$('#exportModal').modal('show');
	});

	$(document).on('dblclick', '.hull', function(evt) {
		$("#groupModal").modal("show");
	})

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
		$(".maxGroupsEdit").parent().children('input[type=number]')[0].max = Grouper.active_group.data.length;
		$(".maxPeopleEdit").parent().children('input[type=number]')[0].max = Grouper.active_group.data.length;
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

    $("#delete_group").click(function(){
		if (confirm("Are you sure you want to delete this grouping? You will lose all group data for this class."))
		{
		    var groups;

			groups = Grouper.groups.filter(function(obj) {
				return obj != Grouper.active_group;
			});

			Parse.User.current().save(
				{'groups': groups }, 
				{ error: function(obj, error) { console.log(error); }
	        });

			localStorage.removeItem('active_group');
			$('#editModal').modal('hide');
			buildPage();
		}
		
	});
});

/********************************** Student/Group Modals **********************************/

function alertMessage(message) {
	return '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ' + message;
}
