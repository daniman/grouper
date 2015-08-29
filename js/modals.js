$(document).ready(function() {

	$('#help_tooltip').attr({
		'data-toggle': 'tooltip',
		'data-placement': 'bottom',
		'data-html': true,
		'title': '<span style="text-align: center;"><strong>Tips:</strong></span> <br /> ' +
					'1. Double click circles for more information.<br .> ' +
					'2. Double click hulls for more information.<br /> ' +
					'3. Click two consecutive circles to swap them. <br />' +
					'4. Drag circles to change group arrangements.'
	});
	$('#help_tooltip').tooltip();
});