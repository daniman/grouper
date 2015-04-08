$(document).ready(function() {

	//radio buttons for step 3
	$("#maxPeople").click(function() {
		$("#numberOfPeople").prop("disabled", false);
		$("#numberOfGroups").val('');
		$("#numberOfGroups").prop("disabled", true);
	});
	$("#maxGroups").click(function() {
		$("#numberOfPeople").prop("disabled", true);
		$("#numberOfPeople").val('');
		$("#numberOfGroups").prop("disabled", false);
	});

	//texbox in step 0
	$('#newGroupName').bind("enterKey",function(e){
		console.log("wow");
		$('#importDataModal').modal('show');
	});
	
	$('#newGroupName').keyup(function(e){
		if(e.keyCode == 13)
		{
		  $(this).trigger("enterKey");
		}
	});
	$('#importModal').on('show.bs.modal', function () {
	  $('#importDataModal').modal('hide');
	});
	$('#importDataModal').on('show.bs.modal', function () {
	  $('#importModal').modal('hide');
	  $('#editDataModal').modal('hide');
	});
	$('#editDataModal').on('show.bs.modal', function () {
	  console.log("show!")
	  $('#importDataModal').modal('hide');
	  $('#groupifyModal').modal('hide');
	});
	$('#groupifyModal').on('show.bs.modal', function () {
	  console.log("show!")
	  $('#editDataModal').modal('hide');
	});

	//sortable list for priorities
	$(function() {
	    $( "#sortable" ).sortable();
	    $( "#sortable" ).disableSelection();
  	});

  	//prevent drag and drop for browser to avoid issues with file drag and drop for step 1
	$(document).on('dragenter', function (e) 
	{
	    e.stopPropagation();
	    e.preventDefault();
	});

	$(document).on('dragover', function (e) 
	{
	  e.stopPropagation();
	  e.preventDefault();
	  obj.css('border', '2px dotted #0B85A1');
	});
	$(document).on('drop', function (e) 
	{
	    e.stopPropagation();
	    e.preventDefault();
	});

});