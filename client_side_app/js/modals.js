$(document).ready(function() {

///////////////GROUPIFY PARAMS SELECTOR///////////////////////
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

//////////////////STEP 0 ENTER////////////////////////

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

////////////////////////MODAL TRANSITIONS/////////////////////
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

//////////////////////////FILE DRAG AND DROP ///////////////////////

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
//////////////////DRAGGABLE SORTING CATEGORIES////////////////////    

	//sortable list for priorities
	$(function() {
	    $( "#sortable" ).sortable();
	    $( "#sortable" ).disableSelection();
  	});

	//on sortable adds a highlight when hovering
	$(".category").hover(function(e){
        $(e.target).css("outline", "2px solid #5F6364");
        $(e.target).css("cursor", "pointer");
        },function(){
        $(".category").css("outline", "none");
        $(".category").css("cursor", "default");
    });

////////////////////////EXPORT MODAL//////////////////////////
    var groupNumber = 7;
    var categories = ['name','course_number','gender','year','sports_team'];

	$("#export").click(function(){

		var groupings = '';
		var sorted = students.sort(function(a,b) { return parseFloat(b.group) - parseFloat(a.group)});

		for (var i = 0; i < groupNumber; i++) {
			groupings = groupings.concat('<h4>Group '+i+':</h4>');
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
////////////////////////STUDENT/GROUP MODAL//////////////////////////
	$('.bubble').tooltip({'placement': 'top', 'delay': 750});
	$('.hull').tooltip({'placement': 'right', 'container':'body', 'html':'true', 'delay': 250});

	$('.bubble').attr('data-toggle', 'tooltip');
	$('.bubble').attr('data-original-title', 'Double Click for Information.');

	$('.hull').attr('data-toggle', 'tooltip');
	$('.hull').attr('data-original-title', 'Double Click for More Information.');

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
		var idGroup = $(evt.target).attr('group');
		studentList = studentList.concat(addCategories());
		
		for (var j = students.length - 1; j >= 0; j--) {
			if(students[j]['group']==idGroup){
				studentList = studentList.concat("<tr>");
				studentList = studentList.concat(stringify(students[j]));
				studentList = studentList.concat("</tr>");
			}
		}
		$('#groupNumber').html(idGroup);
		$('#groupStudents').html(studentList);
		$("#groupModal").modal("show");
	});

});

function ClearSelection() {
    if (window.getSelection)
        window.getSelection().removeAllRanges();
    else if (document.selection)
        document.selection.empty();
}