helpers = {
  bytesToSize: function(bytes, precision) {  
      var kilobyte = 1024;
      var megabyte = kilobyte * 1024;
      var gigabyte = megabyte * 1024;
      var terabyte = gigabyte * 1024;
      if ((bytes >= 0) && (bytes < kilobyte)) {
          return bytes + ' B';
      } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
          return (bytes / kilobyte).toFixed(precision) + ' KB';
      } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
          return (bytes / megabyte).toFixed(precision) + ' MB';
      } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
          return (bytes / gigabyte).toFixed(precision) + ' GB';
      } else if (bytes >= terabyte) {
          return (bytes / terabyte).toFixed(precision) + ' TB';
      } else {
          return bytes + ' B';
      }
  },

  buildFilters: function(data) {
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
  },

  defaultSettings: function(filters) {
    var labels = Object.keys(filters);
    var settings = {
        labels: {},
        priorities: labels,
        sizes: {
            pref: 'people',
            people: '1',
            groups: '1'
        }
    };
    
    for (var i=0; i<labels.length; i++) {
        settings.labels[labels[i]] = labels[i]; // sets the header to itself to start
    }

    return settings;
  },

  groupify: function(group) {
    var groups;
    if (group.settings.sizes.pref == 'groups') {
      groups = group.settings.sizes['groups'];
      for (var i=0; i<group.data.length; i++) {
        group.data[i]['group'] = i%groups; // 0 indexed
      }
    } else {
      var people = group.settings.sizes['people'];
      var count = 1;
      groups = 1;
      for (var i=0; i<group.data.length; i++) {
        group.data[i]['group'] = groups-1;
        count ++;
        if (count > people) {
          count = 1;
          groups ++;
        }
      }
    }

    group.filters['group'] = [];
    for (var i=0; i<groups; i++) {
      group.filters['group'][i] = i;
    }
    return group;
  }
};
