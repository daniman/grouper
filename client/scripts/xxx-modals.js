 $(document).ready(function() {

  /**
   * Import Modal Show/Hide
   */
	$(document).on('click', '#importButtonLabel, #importButton, #new_user_import_button', function() {
    Blaze.render(Template.importModal, document.getElementById('modals'));
		$('#importModal').modal('show');
	});

  $(document).on('hidden.bs.modal', '#importModal', function() {
    Blaze.remove(Blaze.getView(document.getElementById('importModal')));
  });

  /**
   * Edit Modal Show/Hide
   */
	$(document).on('click', '#edit', function(){
    Blaze.render(Template.editModal, document.getElementById('modals'));
		$('#editModal').modal('show');
	});

  $(document).on('hidden.bs.modal', '#editModal', function() {
    Blaze.remove(Blaze.getView(document.getElementById('editModal')));
  });

  /**
   * Export Modal Show/Hide
   */
	$(document).on('click', '#export', function(){
    Blaze.render(Template.exportModal, document.getElementById('modals'));
		$('#exportModal').modal('show');
	});

  $(document).on('hidden.bs.modal', '#exportModal', function() {
    Blaze.remove(Blaze.getView(document.getElementById('exportModal')));
  });

  /**
   * Group Modal Show/Hide
   */
  $(document).on('dblclick', '.hull', function(evt) {
    Blaze.render(Template.groupModal, document.getElementById('modals'));
    $("#groupModal").modal("show");
  });

  $(document).on('hidden.bs.modal', '#groupModal', function() {
    Blaze.remove(Blaze.getView(document.getElementById('groupModal')));
  });

   /**
   * Student Modal Show/Hide
   */
  $(document).on('dblclick', '.bubble', function(evt) {
    Blaze.render(Template.studentModal, document.getElementById('modals'));
    $("#studentModal").modal("show");
  });

  $(document).on('hidden.bs.modal', '#studentModal', function() {
    Blaze.remove(Blaze.getView(document.getElementById('studentModal')));
  });

/********************************** Edit Modal **********************************/

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

function alertMessage(message) {
	return '<span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ' + message;
}
