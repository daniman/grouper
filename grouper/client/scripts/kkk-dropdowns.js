$(document).ready(function() {

    $('.classlist .dropdown-menu').click(function() {
        $('.dropdown-toggle').dropdown();
    })

    $(document).on('click', '.classlist_item', function(event) {
        var me = this;
        Grouper.active_group = Grouper.groups.filter(function(obj) {
            return obj.name == $(me).children('.name').html();
        })[0];
        console.log(Grouper.active_group);
        localStorage.setItem("active_group", Grouper.active_group['name']);

        $('#undo').hide();
        $('#redo').hide();
        /*
        redoStack = [];
        undoStack = [];
        */
    
        buildPage();

        $('.switch').children('input')[0].checked = false;
    });

})