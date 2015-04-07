$(document).ready(function() {
	$("#maxPeople").click(function() {
		$("#numberOfPeople").prop("disabled", false);
		$("#numberOfGroups").prop("disabled", true);
	});
	$("#maxGroups").click(function() {
		$("#numberOfPeople").prop("disabled", true);
		$("#numberOfGroups").prop("disabled", false);
	});
	$(function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  });
});