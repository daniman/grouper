$(document).ready(function() {

    $('.classlist .dropdown-menu').click(function() {
        $('.dropdown-toggle').dropdown();
    })

    $(document).on('click', '.classlist_item', function(event) {
        var me = this;
        Grouper.active_group = Grouper.groups.filter(function(obj) {
            return obj.name == $(me).html();
        })[0];

        $('a#group_dropdown_label').html(Grouper.active_group['name'] + ' <b class="caret"></b>');
        $('#undo').hide();
        $('#redo').hide();

        $('#filters').html('');
        var buttons = $('#bubbleContainer').children('#buttons');
        $('#bubbleContainer').html(buttons);
        buildBubbles();
        buildFilters();

        $('.switch').children('input')[0].checked = false;
    });

})