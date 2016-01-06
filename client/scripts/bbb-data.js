/**
 * Build parameters object.
 */
buildFilterObject = function(data) {
  var parameters = {};
  var filters = Object.keys(data[0]);
  for (var i=0; i<filters.length; i++) {
    parameters[filters[i]] = [];
  }
  for (var i=0; i<data.length; i++) {
    for (var j=0; j<filters.length; j++) {
      var filter = filters[j];
      var category = data[i][filter];
      if (parameters[filter].indexOf(category) < 0) {
        parameters[filter].push(category);
      }
    }
  }
  for (i in filters) {
    parameters[filters[i]].sort(function(a, b){return a-b});
  }
  return parameters;
}
