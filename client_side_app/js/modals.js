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
	  $('#importDataModal').modal('hide');
	  $('#groupifyModal').modal('hide');
	});
	$('#groupifyModal').on('show.bs.modal', function () {
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

	$(".category").hover(function(e){
        $(e.target).css("outline", "2px solid #5F6364");
        },function(){
        $(".category").css("outline", "none");
    });
    
    var groupNumber = 7;
    var categories = ['name','course_number','gender','year','sports_team'];

	$("#export").click(function(){
		var groupings = '';
		var sorted = students.sort(function(a,b) { return parseFloat(b.group) - parseFloat(a.group)});

		for (var i = 0; i < groupNumber; i++) {
			groupings = groupings.concat('<h4>Group '+i+':</h4>');
			for (var j = students.length - 1; j >= 0; j--) {
				
				if(students[j]['group']==i){
					// console.log(stringify(students[j]));
					groupings = groupings.concat(stringify(students[j]));
					groupings = groupings.concat("<br>");
				}
			};
			groupings = groupings.concat("<br>");
		};

		$("#groupPreview").html(groupings);
	})

	var stringify = function(json){
		var string = '';

		for (var i = 0; i < categories.length; i++){
			var key = categories[i];
		  if (json.hasOwnProperty(key)) {
		    string = string.concat('<b>'+key+"</b>: "+json[key]+", ");
		  }
		}
		string = string.concat('\n');
		return string;
	}
	



});