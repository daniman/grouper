Tracker.autorun(function(){
  /* moved this out of the navbar code since it's independent of the UI
   * it also needs to rerun when the user changes */

  var user = Meteor.user();
  if ( user && user.profile && user.profile.classes && !Session.get('active') ){
    Session.set('active', user.profile.classes[0]);
  }

  if (!Session.get('color_index')) Session.set('color_index', 0);
  if (!Session.get('label_index')) Session.set('label_index', 1);
});
