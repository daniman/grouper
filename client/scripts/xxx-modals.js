 $(document).ready(function() {

	$(document).on('click', '#importButtonLabel, #importButton, #new_user_import_button', function() {
		$('#importFirstStep').modal('show');
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

/********************************** Import Modal: STEP 2 **********************************/

/********************************** Import Modal: STEP 3 **********************************/

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
