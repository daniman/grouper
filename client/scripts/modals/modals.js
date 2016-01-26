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
    $('#editModal').css('z-index', 1035); // TODO: Better way? Setting two overlaying moals this way is hacky
    $('.modal-backdrop').css('z-index', 1030);
	});

  $(document).on('hidden.bs.modal', '#editModal', function() {
    Blaze.remove(Blaze.getView(document.getElementById('editModal')));
  });

  /**
   * Delete Confirmation Modal Show/Hide
   */
  $(document).on('click', '#delete_group', function(){
    Blaze.render(Template.deleteGroupModal, document.getElementById('modals'));
    $('#deleteGroupModal').modal('show');
  });

  $(document).on('hidden.bs.modal', '#deleteGroupModal', function() {
    Blaze.remove(Blaze.getView(document.getElementById('deleteGroupModal')));
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

});
