$(document).ready(function() {
    $("[name='my-checkbox']").bootstrapSwitch({
      size: 'small',
      onText: '',
      offText: '',
      onColor: 'info',
      offColor: 'info'
    });

    node.selectAll().forEach(function(d) {
      console.log($(d.parentNode));
    });
});