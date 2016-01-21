(function(){Router.route('/', {
    waitOn: function() {
        return Meteor.subscribe('classes');
    },
    action: function() {
        this.render('grouper');
    }
})

})();
