$(document).ready(function() {

	$('#help_tooltip').attr({
		'data-toggle': 'tooltip',
		'data-placement': 'bottom',
		'data-html': true,
		'title': '<span style="text-align: center;"><strong>Tips:</strong></span> <br /> ' +
					'1. Click two consecutive circles to swap them. <br />' +
					'2. Drag circles to different groups.'
	});
	$('#help_tooltip').tooltip();
	$('.bubble[data-toggle="tooltip"]').tooltip({'placement': 'top'});
});