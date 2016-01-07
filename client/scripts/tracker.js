Tracker.autorun(function(){
  var user = Meteor.users.findOne();
  if ( user && !user.profile ){
    var classId = Classes.findOne()._id;
    Meteor.users.update({ _id: user._id },{ $set: { profile: { classes: [ classId ] }}});
  }
});
