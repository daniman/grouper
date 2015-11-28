Template.editModal.helpers({
    data: function() {
        var  curr = Classes.findOne({_id: Session.get('active')});

        $('#edit_data_current_categories .category').each(function(index, element) {
            var headers = Grouper.active_group.settings.priorities;
            element.setAttribute('value', headers[index]);
            $(element).html("<span class='clearitem'>" +
                                "<a href='#'>" +
                                    "<span class='glyphicon glyphicon-trash'></span>" +
                                "</a>" +
                            "</span>" +
                            "<span class='edit'>" +
                                "<a href='#'>" +
                                    "<span class='glyphicon glyphicon-pencil'></span>" +
                                "</a>" +
                            "</span>" + 
                            Grouper.active_group.settings.labels[headers[index]]);

        });











        return {
            name: curr['name'],
            active: curr['settings']['priorities']
        }




    }
})