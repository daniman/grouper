//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Template = Package.templating.Template;
var check = Package.check.check;
var Match = Package.check.Match;
var ReactiveDict = Package['reactive-dict'].ReactiveDict;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Mongo = Package.mongo.Mongo;
var LocalCollection = Package.minimongo.LocalCollection;
var Minimongo = Package.minimongo.Minimongo;
var Session = Package.session.Session;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var MeteorToysData, MeteorToys_JSON, MeteorToysDict, MeteorToys_ToyKit, quote, temp, em, pw, target, password, email, displayStatus, removeClasses, addClasses, MeteorToysRegistry, myArray, packageName, MeteorToys, ToyTemplate;

(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/meteortoys:toykit/lib/collections.js                                                                      //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
MeteorToysData = {                                                                                                    // 1
	'Impersonate': new Mongo.Collection("MeteorToys_Impersonate"),                                                       // 2
	'JetSetter':   new Mongo.Collection("MeteorToys_JetSetter"),                                                         // 3
	'Mongol':      new Mongo.Collection("MeteorToys_Mongol"),                                                            // 4
	'AutoPub':     new Mongo.Collection("MeteorToys_AutoPub"),                                                           // 5
	'Email':       new Mongo.Collection("MeteorToys_Email"),                                                             // 6
	'Result':      new Mongo.Collection("MeteorToys_Result"),                                                            // 7
	'Throttle':    new Mongo.Collection("MeteorToys_Throttle")                                                           // 8
}                                                                                                                     // 9
                                                                                                                      // 10
                                                                                                                      // 11
                                                                                                                      // 12
if (Meteor.isServer) {                                                                                                // 13
	MeteorToysData["credentials"] = new Mongo.Collection("MeteorToysCredentials");                                       // 14
}                                                                                                                     // 15
                                                                                                                      // 16
if (Meteor.isClient) {                                                                                                // 17
  MeteorToysDict = new ReactiveDict('MeteorToys');                                                                    // 18
}                                                                                                                     // 19
                                                                                                                      // 20
MeteorToys_ToyKit = {                                                                                                 // 21
  observe: function () {                                                                                              // 22
                                                                                                                      // 23
    // first load                                                                                                     // 24
    MeteorToys_ToyKit.runPubSub();                                                                                    // 25
    MeteorToys_ToyKit.runJetSetter();                                                                                 // 26
                                                                                                                      // 27
    // start                                                                                                          // 28
    if (!Object.observe) {                                                                                            // 29
      setInterval(function(){                                                                                         // 30
        MeteorToys_ToyKit.runPubSub();                                                                                // 31
        MeteorToys_ToyKit.runJetSetter();                                                                             // 32
      }, 3000);                                                                                                       // 33
    } else {                                                                                                          // 34
      Object.observe(Meteor.default_connection._subscriptions, function() {                                           // 35
        MeteorToys_ToyKit.runPubSub();                                                                                // 36
      })                                                                                                              // 37
      Object.observe(Session.keys, function () {                                                                      // 38
        MeteorToys_ToyKit.runJetSetter();                                                                             // 39
      })                                                                                                              // 40
    }                                                                                                                 // 41
    // end                                                                                                            // 42
  },                                                                                                                  // 43
  runJetSetter: function () {                                                                                         // 44
    if (Package["msavin:jetsetter"]) {                                                                                // 45
      Package["msavin:jetsetter"].JetSetter.getKeys();                                                                // 46
    }                                                                                                                 // 47
  },                                                                                                                  // 48
  runPubSub: function () {                                                                                            // 49
    if (Package["msavin:sub"] || Package["msavin:mongol"]) {                                                          // 50
                                                                                                                      // 51
      var subscriptions  = Meteor.default_connection._subscriptions,                                                  // 52
          subKeys        = Object.keys(subscriptions);                                                                // 53
                                                                                                                      // 54
      MeteorToysDict.set("MeteorToys_PubSub", subKeys);                                                               // 55
                                                                                                                      // 56
    }                                                                                                                 // 57
  }                                                                                                                   // 58
}                                                                                                                     // 59
                                                                                                                      // 60
                                                                                                                      // 61
// Public Function                                                                                                    // 62
                                                                                                                      // 63
MeteorToys_JSON = {                                                                                                   // 64
  'parse': function (data) {                                                                                          // 65
    var newObject = false;                                                                                            // 66
                                                                                                                      // 67
    try {                                                                                                             // 68
      newObject = JSON.parse(data);                                                                                   // 69
                                                                                                                      // 70
    } catch (error) {                                                                                                 // 71
      newObject = String(data)                                                                                        // 72
    }                                                                                                                 // 73
                                                                                                                      // 74
    return newObject;                                                                                                 // 75
  },                                                                                                                  // 76
  'colorize': function (json) {                                                                                       // 77
    // colorized the JSON objects                                                                                     // 78
    if (!json) {                                                                                                      // 79
      return "<em>No data</em>";                                                                                      // 80
    }                                                                                                                 // 81
                                                                                                                      // 82
    if (typeof json != 'string') {                                                                                    // 83
      json = JSON.stringify(json, undefined, 2);                                                                      // 84
    }                                                                                                                 // 85
                                                                                                                      // 86
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');                                   // 87
                                                                                                                      // 88
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
      var cls = 'MeteorToys_number';                                                                                  // 90
      if (/^"/.test(match)) {                                                                                         // 91
        if (/:$/.test(match)) {                                                                                       // 92
          cls = 'MeteorToys_key';                                                                                     // 93
        } else {                                                                                                      // 94
          cls = 'MeteorToys_string';                                                                                  // 95
        }                                                                                                             // 96
      } else if (/true|false/.test(match)) {                                                                          // 97
        cls = 'MeteorToys_boolean';                                                                                   // 98
      } else if (/null/.test(match)) {                                                                                // 99
        cls = 'MeteorToys_null';                                                                                      // 100
      }                                                                                                               // 101
                                                                                                                      // 102
      // Return results                                                                                               // 103
                                                                                                                      // 104
      quote = '<span class="' + cls + '">"</span>';                                                                   // 105
      switch (cls) {                                                                                                  // 106
        case "MeteorToys_key":                                                                                        // 107
          match = match.replace(/"/g, "");                                                                            // 108
          match = match.replace(/:/g, "");                                                                            // 109
                                                                                                                      // 110
          return quote + '<span class="' + cls + '" contenteditable="false">' + match + '</span>' + quote + ':';      // 111
          break;                                                                                                      // 112
        case "MeteorToys_number":                                                                                     // 113
          return '<span class="' + cls + '" contenteditable="false">' + match + '</span>';                            // 114
          break;                                                                                                      // 115
        case "MeteorToys_string":                                                                                     // 116
          match = match.substring(1, match.length-1);                                                                 // 117
          return quote + '<span class="' + cls + '" contenteditable="false">' + match + '</span>' + quote;            // 118
          break;                                                                                                      // 119
        case "MeteorToys_boolean":                                                                                    // 120
          return '<span class="' + cls + '" contenteditable="false">' + match + '</span>';                            // 121
          break;                                                                                                      // 122
        case "MeteorToys_null":                                                                                       // 123
          return '<span class="' + cls + '" contenteditable="false">' + match + '</span>';                            // 124
          break;                                                                                                      // 125
      }                                                                                                               // 126
                                                                                                                      // 127
                                                                                                                      // 128
    });                                                                                                               // 129
  },                                                                                                                  // 130
  'colorizeEditable': function (json) {                                                                               // 131
    // colorized the JSON objects                                                                                     // 132
    if (!json) {                                                                                                      // 133
      return "<em>No data</em>";                                                                                      // 134
    }                                                                                                                 // 135
                                                                                                                      // 136
    if (typeof json != 'string') {                                                                                    // 137
      json = JSON.stringify(json, undefined, 2);                                                                      // 138
    }                                                                                                                 // 139
                                                                                                                      // 140
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');                                   // 141
                                                                                                                      // 142
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
      var cls = 'MeteorToys_number';                                                                                  // 144
      if (/^"/.test(match)) {                                                                                         // 145
        if (/:$/.test(match)) {                                                                                       // 146
          cls = 'MeteorToys_key';                                                                                     // 147
        } else {                                                                                                      // 148
          cls = 'MeteorToys_string';                                                                                  // 149
        }                                                                                                             // 150
      } else if (/true|false/.test(match)) {                                                                          // 151
        cls = 'MeteorToys_boolean';                                                                                   // 152
      } else if (/null/.test(match)) {                                                                                // 153
        cls = 'MeteorToys_null';                                                                                      // 154
      }                                                                                                               // 155
                                                                                                                      // 156
      // Return results                                                                                               // 157
                                                                                                                      // 158
      quote = '<span class="' + cls + '">"</span>';                                                                   // 159
      switch (cls) {                                                                                                  // 160
        case "MeteorToys_key":                                                                                        // 161
          match = match.replace(/"/g, "");                                                                            // 162
          match = match.replace(/:/g, "");                                                                            // 163
                                                                                                                      // 164
          return quote + '<span class="' + cls + ' MeteorToys_inline" contenteditable="true">' + match + '</span>' + quote + ':';
          break;                                                                                                      // 166
        case "MeteorToys_number":                                                                                     // 167
          return '<span class="' + cls + ' MeteorToys_inline" contenteditable="true">' + match + '</span>';           // 168
          break;                                                                                                      // 169
        case "MeteorToys_string":                                                                                     // 170
          match = match.substring(1, match.length-1);                                                                 // 171
          return '<span class="' + cls + ' MeteorToys_inline" contenteditable="true">"' + match + '"</span>';         // 172
          break;                                                                                                      // 173
        case "MeteorToys_boolean":                                                                                    // 174
          return '<span class="' + cls + ' MeteorToys_inline" contenteditable="true">' + match + '</span>';           // 175
          break;                                                                                                      // 176
        case "MeteorToys_null":                                                                                       // 177
          return '<span class="' + cls + ' MeteorToys_inline" contenteditable="true">' + match + '</span>';           // 178
          break;                                                                                                      // 179
      }                                                                                                               // 180
                                                                                                                      // 181
                                                                                                                      // 182
    });                                                                                                               // 183
  }                                                                                                                   // 184
}                                                                                                                     // 185
// MeteorToys_Parse = function (data) {                                                                               // 186
                                                                                                                      // 187
// }                                                                                                                  // 188
                                                                                                                      // 189
// MeteorToys_Col                                                                                                     // 190
                                                                                                                      // 191
                                                                                                                      // 192
                                                                                                                      // 193
MeteorToysData.Impersonate.allow({                                                                                    // 194
	insert: function () {                                                                                                // 195
	    return true;                                                                                                     // 196
	},                                                                                                                   // 197
	remove: function (){                                                                                                 // 198
	    return true;                                                                                                     // 199
	},                                                                                                                   // 200
	update: function() {                                                                                                 // 201
	    return true;                                                                                                     // 202
	}                                                                                                                    // 203
});                                                                                                                   // 204
                                                                                                                      // 205
MeteorToysData.JetSetter.allow({                                                                                      // 206
	insert: function () {                                                                                                // 207
	    return true;                                                                                                     // 208
	},                                                                                                                   // 209
	remove: function (){                                                                                                 // 210
	    return true;                                                                                                     // 211
	},                                                                                                                   // 212
	update: function() {                                                                                                 // 213
	    return true;                                                                                                     // 214
	}                                                                                                                    // 215
});                                                                                                                   // 216
                                                                                                                      // 217
MeteorToysData.Mongol.allow({                                                                                         // 218
	insert: function () {                                                                                                // 219
	    return true;                                                                                                     // 220
	},                                                                                                                   // 221
	remove: function (){                                                                                                 // 222
	    return true;                                                                                                     // 223
	},                                                                                                                   // 224
	update: function() {                                                                                                 // 225
	    return true;                                                                                                     // 226
	}                                                                                                                    // 227
});                                                                                                                   // 228
                                                                                                                      // 229
MeteorToysData.AutoPub.allow({                                                                                        // 230
	insert: function () {                                                                                                // 231
	    return true;                                                                                                     // 232
	},                                                                                                                   // 233
	remove: function (){                                                                                                 // 234
	    return true;                                                                                                     // 235
	},                                                                                                                   // 236
	update: function() {                                                                                                 // 237
	    return true;                                                                                                     // 238
	}                                                                                                                    // 239
});                                                                                                                   // 240
                                                                                                                      // 241
MeteorToysData.Email.allow({                                                                                          // 242
	insert: function () {                                                                                                // 243
	    return true;                                                                                                     // 244
	},                                                                                                                   // 245
	remove: function (){                                                                                                 // 246
	    return true;                                                                                                     // 247
	},                                                                                                                   // 248
	update: function() {                                                                                                 // 249
	    return true;                                                                                                     // 250
	}                                                                                                                    // 251
});                                                                                                                   // 252
                                                                                                                      // 253
MeteorToysData.Result.allow({                                                                                         // 254
	insert: function () {                                                                                                // 255
	    return true;                                                                                                     // 256
	},                                                                                                                   // 257
	remove: function (){                                                                                                 // 258
	    return true;                                                                                                     // 259
	},                                                                                                                   // 260
	update: function() {                                                                                                 // 261
	    return true;                                                                                                     // 262
	}                                                                                                                    // 263
});                                                                                                                   // 264
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/meteortoys:toykit/client/template.main.js                                                                 //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
                                                                                                                      // 1
Template.__checkName("MeteorToys_basic");                                                                             // 2
Template["MeteorToys_basic"] = new Template("Template.MeteorToys_basic", (function() {                                // 3
  var view = this;                                                                                                    // 4
  return Blaze._TemplateWith(function() {                                                                             // 5
    return {                                                                                                          // 6
      name: Spacebars.call("MeteorToys_basic")                                                                        // 7
    };                                                                                                                // 8
  }, function() {                                                                                                     // 9
    return Spacebars.include(view.lookupTemplate("MeteorToy"), function() {                                           // 10
      return [ "\n		", HTML.DIV({                                                                                     // 11
        "class": "MeteorToys_sub_header"                                                                              // 12
      }, "\n			", HTML.DIV({                                                                                          // 13
        "class": "MeteorToys_name"                                                                                    // 14
      }, "Activate Meteor Toys"), "\n		"), "\n		", HTML.DIV({                                                         // 15
        "class": "MeteorToys_sub_content"                                                                             // 16
      }, "\n\n		", HTML.FORM("\n			", HTML.DIV({                                                                      // 17
        "class": "MeteorToys_row"                                                                                     // 18
      }, "\n				", HTML.INPUT({                                                                                       // 19
        id: "meteortoyscadf"                                                                                          // 20
      }), "\n				", HTML.DIV({                                                                                        // 21
        "class": "MeteorToys_row_name"                                                                                // 22
      }, "Email"), "\n			"), "\n\n			", HTML.DIV({                                                                    // 23
        "class": "MeteorToys_row"                                                                                     // 24
      }, "\n				", HTML.INPUT({                                                                                       // 25
        id: "meteortoyspass"                                                                                          // 26
      }), "\n				", HTML.DIV({                                                                                        // 27
        "class": "MeteorToys_row_name"                                                                                // 28
      }, "Serial"), "\n			"), "\n\n			", HTML.INPUT({                                                                 // 29
        type: "submit",                                                                                               // 30
        value: "Activate",                                                                                            // 31
        style: "margin-top: -4px"                                                                                     // 32
      }), "\n\n			", HTML.BR(), HTML.BR(), HTML.BR(), HTML.BR(), HTML.BR(), HTML.BR(), HTML.BR(), "\n			", HTML.DIV({ // 33
        style: "height:10px;"                                                                                         // 34
      }), "\n			Experience the next level", HTML.BR(), " of Mongol and JetSetter. ", HTML.BR(), "\n			", HTML.A({     // 35
        href: "http://bit.ly/1FqdsPM"                                                                                 // 36
      }, "See Meteor Toys ", HTML.CharRef({                                                                           // 37
        html: "&raquo;",                                                                                              // 38
        str: "»"                                                                                                      // 39
      })), "\n\n		"), "\n		"), "\n	" ];                                                                               // 40
    });                                                                                                               // 41
  });                                                                                                                 // 42
}));                                                                                                                  // 43
                                                                                                                      // 44
Template.__checkName("MeteorToys_tooltip");                                                                           // 45
Template["MeteorToys_tooltip"] = new Template("Template.MeteorToys_tooltip", (function() {                            // 46
  var view = this;                                                                                                    // 47
  return Blaze.If(function() {                                                                                        // 48
    return Spacebars.call(view.lookup("display"));                                                                    // 49
  }, function() {                                                                                                     // 50
    return [ "\n	", HTML.DIV({                                                                                        // 51
      "class": "MeteorToys_tooltip_wrapper MeteorToys_notification_fadeInUp",                                         // 52
      style: function() {                                                                                             // 53
        return [ "left: ", Spacebars.mustache(view.lookup("position")), "px;" ];                                      // 54
      }                                                                                                               // 55
    }, "\n		", HTML.DIV({                                                                                             // 56
      "class": "MeteorToys_tooltip "                                                                                  // 57
    }, "\n			", HTML.DIV({                                                                                            // 58
      "class": "MeteorToys_tooltip_arrow1"                                                                            // 59
    }), "\n			", HTML.DIV({                                                                                           // 60
      "class": "MeteorToys_tooltip_arrow2"                                                                            // 61
    }), "\n			", Blaze.View("lookup:name", function() {                                                               // 62
      return Spacebars.mustache(view.lookup("name"));                                                                 // 63
    }), "\n		"), "\n	"), "\n	" ];                                                                                     // 64
  });                                                                                                                 // 65
}));                                                                                                                  // 66
                                                                                                                      // 67
Template.__checkName("MeteorToys");                                                                                   // 68
Template["MeteorToys"] = new Template("Template.MeteorToys", (function() {                                            // 69
  var view = this;                                                                                                    // 70
  return Blaze.If(function() {                                                                                        // 71
    return Spacebars.call(view.lookup("MeteorToys"));                                                                 // 72
  }, function() {                                                                                                     // 73
    return [ "\n		\n		", HTML.Comment(" Render Meteor Toys "), "\n		", Blaze.If(function() {                          // 74
      return Spacebars.call(view.lookup("MeteorToys_Pro"));                                                           // 75
    }, function() {                                                                                                   // 76
      return [ "\n			", Spacebars.include(view.lookupTemplate("MeteorToys_tooltip")), "\n			", HTML.DIV({             // 77
        "class": "MeteorToys_orbs"                                                                                    // 78
      }, "\n				", HTML.Comment(" Render Toys "), "\n				", Blaze.Each(function() {                                   // 79
        return Spacebars.call(view.lookup("MeteorToy"));                                                              // 80
      }, function() {                                                                                                 // 81
        return [ "\n					", Blaze._TemplateWith(function() {                                                          // 82
          return {                                                                                                    // 83
            template: Spacebars.call(view.lookup("."))                                                                // 84
          };                                                                                                          // 85
        }, function() {                                                                                               // 86
          return Spacebars.include(function() {                                                                       // 87
            return Spacebars.call(Template.__dynamic);                                                                // 88
          });                                                                                                         // 89
        }), "\n				" ];                                                                                               // 90
      }), "\n				", HTML.Comment(" Render Addons "), "\n				", Blaze.Each(function() {                                // 91
        return Spacebars.call(view.lookup("MeteorToy_addon"));                                                        // 92
      }, function() {                                                                                                 // 93
        return [ "\n					", HTML.Comment(" {{#MeteorToy name=this}} "), "\n						", Blaze._TemplateWith(function() {  // 94
          return {                                                                                                    // 95
            template: Spacebars.call(view.lookup("."))                                                                // 96
          };                                                                                                          // 97
        }, function() {                                                                                               // 98
          return Spacebars.include(function() {                                                                       // 99
            return Spacebars.call(Template.__dynamic);                                                                // 100
          });                                                                                                         // 101
        }), "\n					", HTML.Comment(" {{/MeteorToy}} "), "\n				" ];                                                  // 102
      }), "\n				", HTML.Comment(" End "), "\n			"), "\n			", HTML.Comment(" {{> MeteorToys_notifications}} "), "\n		" ];
    }, function() {                                                                                                   // 104
      return [ "\n			", HTML.DIV({                                                                                    // 105
        "class": "MeteorToys_orbs"                                                                                    // 106
      }, "\n				", Blaze._TemplateWith(function() {                                                                   // 107
        return {                                                                                                      // 108
          template: Spacebars.call(view.lookup("all"))                                                                // 109
        };                                                                                                            // 110
      }, function() {                                                                                                 // 111
        return Spacebars.include(function() {                                                                         // 112
          return Spacebars.call(Template.__dynamic);                                                                  // 113
        });                                                                                                           // 114
      }), "\n				", Blaze.Each(function() {                                                                           // 115
        return Spacebars.call(view.lookup("MeteorToy_addon"));                                                        // 116
      }, function() {                                                                                                 // 117
        return [ "\n					", HTML.Comment(" {{#MeteorToy name=this}} "), "\n						", Blaze._TemplateWith(function() {  // 118
          return {                                                                                                    // 119
            template: Spacebars.call(view.lookup("."))                                                                // 120
          };                                                                                                          // 121
        }, function() {                                                                                               // 122
          return Spacebars.include(function() {                                                                       // 123
            return Spacebars.call(Template.__dynamic);                                                                // 124
          });                                                                                                         // 125
        }), "\n					", HTML.Comment(" {{/MeteorToy}} "), "\n				" ];                                                  // 126
      }), "\n			"), "\n		" ];                                                                                         // 127
    }), "\n\n		", HTML.Comment(" Render Non-Toy Packages "), "\n		", HTML.Comment(" ie. Mongol, JetSetter "), "\n		", Blaze.Each(function() {
      return Spacebars.call(view.lookup("MeteorToysPackage"));                                                        // 129
    }, function() {                                                                                                   // 130
      return [ "\n			", Blaze._TemplateWith(function() {                                                              // 131
        return {                                                                                                      // 132
          template: Spacebars.call(view.lookup("."))                                                                  // 133
        };                                                                                                            // 134
      }, function() {                                                                                                 // 135
        return Spacebars.include(function() {                                                                         // 136
          return Spacebars.call(Template.__dynamic);                                                                  // 137
        });                                                                                                           // 138
      }), "\n		" ];                                                                                                   // 139
    }), "\n		", HTML.Comment(" End "), "\n	" ];                                                                       // 140
  }, function() {                                                                                                     // 141
    return [ "\n		", HTML.Comment(" {{> MeteorToys_notification_widget}} "), "\n	" ];                                 // 142
  });                                                                                                                 // 143
}));                                                                                                                  // 144
                                                                                                                      // 145
Template.__checkName("MeteorToy");                                                                                    // 146
Template["MeteorToy"] = new Template("Template.MeteorToy", (function() {                                              // 147
  var view = this;                                                                                                    // 148
  return HTML.DIV({                                                                                                   // 149
    "class": function() {                                                                                             // 150
      return [ "MeteorToys_orb MeteorToys_hide_Orb ", Spacebars.mustache(view.lookup("type")), " ", Spacebars.mustache(view.lookup("state")) ];
    },                                                                                                                // 152
    id: function() {                                                                                                  // 153
      return Spacebars.mustache(view.lookup("name"));                                                                 // 154
    },                                                                                                                // 155
    oncontextmenu: "return false;"                                                                                    // 156
  }, "\n		", Blaze.If(function() {                                                                                    // 157
    return Spacebars.call(view.lookup("empty"));                                                                      // 158
  }, function() {                                                                                                     // 159
    return [ "\n			", Blaze._InOuterTemplateScope(view, function() {                                                  // 160
      return Spacebars.include(function() {                                                                           // 161
        return Spacebars.call(view.templateContentBlock);                                                             // 162
      });                                                                                                             // 163
    }), "\n		" ];                                                                                                     // 164
  }, function() {                                                                                                     // 165
    return [ "\n			", HTML.DIV({                                                                                      // 166
      "class": "MeteorToys_icon"                                                                                      // 167
    }), "\n			", HTML.DIV({                                                                                           // 168
      "class": "MeteorToys_orb_wrapper"                                                                               // 169
    }, "\n				", Blaze.If(function() {                                                                                // 170
      return Spacebars.call(view.lookup("load"));                                                                     // 171
    }, function() {                                                                                                   // 172
      return [ "\n					", Blaze._InOuterTemplateScope(view, function() {                                              // 173
        return Spacebars.include(function() {                                                                         // 174
          return Spacebars.call(view.templateContentBlock);                                                           // 175
        });                                                                                                           // 176
      }), "\n				" ];                                                                                                 // 177
    }), "\n			"), "\n		" ];                                                                                           // 178
  }), "\n	");                                                                                                         // 179
}));                                                                                                                  // 180
                                                                                                                      // 181
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                    //
// packages/meteortoys:toykit/client/main.js                                                                          //
//                                                                                                                    //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                      //
var _0x2baf=["\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x64\x69\x73\x70\x6C\x61\x79","\x67\x65\x74","\x72\x65\x67\x69\x73\x74\x65\x72\x48\x65\x6C\x70\x65\x72","\x74\x65\x6D\x70\x6C\x61\x74\x65\x73","\x74\x65\x6D\x70\x6C\x61\x74\x65\x73\x5F\x61\x64\x64\x6F\x6E","\x6D\x73\x61\x76\x69\x6E\x3A\x6D\x6F\x6E\x67\x6F\x6C","\x4D\x6F\x6E\x67\x6F\x6C","\x70\x75\x73\x68","\x6D\x73\x61\x76\x69\x6E\x3A\x6A\x65\x74\x73\x65\x74\x74\x65\x72","\x4A\x65\x74\x53\x65\x74\x74\x65\x72","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x6E\x6F\x74\x69\x66\x69\x63\x61\x74\x69\x6F\x6E\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6E\x6F\x74\x69\x66\x69\x63\x61\x74\x69\x6F\x6E\x73","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x61\x6C\x6C\x74\x68\x69\x6E\x67\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x62\x61\x73\x69\x63","\x68\x65\x6C\x70\x65\x72\x73","\x6E\x61\x6D\x65","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x61\x75\x74\x6F\x70\x75\x62","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x63\x75\x72\x72\x65\x6E\x74","\x73\x65\x74","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6F\x72\x62\x5F\x61\x63\x74\x69\x76\x65","\x68\x61\x73\x43\x6C\x61\x73\x73","\x23","\x73\x74\x6F\x70\x50\x72\x6F\x70\x61\x67\x61\x74\x69\x6F\x6E","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x66\x6F\x63\x75\x73","\x65\x76\x65\x6E\x74\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79","\x74\x79\x70\x65","\x62\x75\x74\x74\x6F\x6E","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x62\x75\x74\x74\x6F\x6E","\x65\x71\x75\x61\x6C\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6F\x72\x62\x5F\x63\x6F\x6E\x64\x65\x6E\x73\x65\x64","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x65\x6D\x61\x69\x6C","\x70\x72\x65\x76\x65\x6E\x74\x44\x65\x66\x61\x75\x6C\x74","\x76\x61\x6C","\x23\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x63\x61\x64\x66","\x23\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x70\x61\x73\x73","","\x50\x6C\x65\x61\x73\x65\x20\x65\x6E\x74\x65\x72\x20\x61\x6E\x20\x65\x6D\x61\x69\x6C","\x50\x6C\x65\x61\x73\x65\x20\x65\x6E\x74\x65\x72\x20\x61\x20\x6C\x69\x63\x65\x6E\x73\x65","\x4D\x6F\x6E\x67\x6F\x6C\x5F\x76\x65\x72\x69\x66\x79\x44\x6F\x63","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x41\x75\x74\x68\x65\x6E\x74\x69\x63\x61\x74\x65\x64","\x63\x61\x6C\x6C","\x54\x68\x61\x6E\x6B\x73\x20\x66\x6F\x72\x20\x62\x75\x79\x69\x6E\x67\x20\x4D\x65\x74\x65\x6F\x72\x20\x54\x6F\x79\x73\x21","\x73\x65\x74\x49\x74\x65\x6D","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x70\x61\x73\x73\x77\x6F\x72\x64","\x49\x6E\x76\x61\x6C\x69\x64\x20\x43\x72\x65\x64\x65\x6E\x74\x69\x61\x6C\x73\x2E\x20\x50\x6C\x65\x61\x73\x65\x20\x74\x72\x79\x20\x61\x67\x61\x69\x6E\x2E","\x74\x65\x6D\x70\x6C\x61\x74\x65","\x6C\x65\x66\x74","\x70\x6F\x73\x69\x74\x69\x6F\x6E","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x74\x6F\x6F\x6C\x74\x69\x70","\x62\x6F\x64\x79","\x72\x65\x6E\x64\x65\x72","\x64\x65\x66\x65\x72","\x67\x65\x74\x49\x74\x65\x6D","\x54\x68\x65\x20\x73\x74\x6F\x72\x65\x64\x20\x61\x75\x74\x68\x65\x6E\x74\x69\x63\x61\x74\x69\x6F\x6E\x20\x6B\x65\x79\x73\x20\x66\x6F\x72\x20\x4D\x65\x74\x65\x6F\x72\x20\x54\x6F\x79\x73\x20\x61\x72\x65\x20\x69\x6E\x76\x61\x6C\x69\x64\x2E","\x6C\x6F\x67","\x61\x75\x74\x6F\x70\x75\x62\x6C\x69\x73\x68","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x61\x75\x74\x6F\x70\x75\x62\x6C\x69\x73\x68","\x73\x75\x62\x73\x63\x72\x69\x62\x65","\x61\x75\x74\x6F\x72\x75\x6E","\x73\x74\x61\x72\x74\x75\x70","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x6F\x62\x73\x65\x72\x76\x65","\x6B\x65\x79\x43\x6F\x64\x65","\x63\x74\x72\x6C\x4B\x65\x79","\x6B\x65\x79\x64\x6F\x77\x6E","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x50\x75\x62\x53\x75\x62","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x68\x69\x64\x65\x5F\x4D\x6F\x6E\x67\x6F\x6C","\x72\x65\x6D\x6F\x76\x65\x43\x6C\x61\x73\x73","\x23\x4D\x6F\x6E\x67\x6F\x6C","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x68\x69\x64\x65\x5F\x4A\x65\x74\x53\x65\x74\x74\x65\x72","\x23\x4A\x65\x74\x53\x65\x74\x74\x65\x72","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x68\x69\x64\x65\x5F\x4F\x72\x62","\x2E\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6F\x72\x62","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x68\x69\x64\x65\x5F\x4E\x6F\x74\x69\x66\x69\x63\x61\x74\x69\x6F\x6E\x73","\x23\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x4E\x6F\x74\x69\x66\x69\x63\x61\x74\x69\x6F\x6E\x73","\x61\x64\x64\x43\x6C\x61\x73\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x52\x65\x67\x69\x73\x74\x65\x72\x79","\x6B\x65\x79\x73","\x6C\x65\x6E\x67\x74\x68","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A","\x6C\x61\x73\x74\x49\x6E\x64\x65\x78\x4F\x66","\x63\x6F\x6E\x66\x69\x67\x75\x72\x61\x74\x69\x6F\x6E","\x72\x65\x67\x69\x73\x74\x65\x72","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x61\x64\x64\x6F\x6E\x3A"];UI[_0x2baf[3]](_0x2baf[0],function(){return MeteorToysDict[_0x2baf[2]](_0x2baf[1])});Template[_0x2baf[0]][_0x2baf[15]]({MeteorToy:function(){return MeteorToysRegistry[_0x2baf[2]](_0x2baf[4])},MeteorToy_addon:function(){return MeteorToysRegistry[_0x2baf[2]](_0x2baf[5])},MeteorToysPackage:function(){temp=[];if(Package[_0x2baf[6]]){temp[_0x2baf[8]](_0x2baf[7])};if(Package[_0x2baf[9]]){temp[_0x2baf[8]](_0x2baf[10])};if(Package[_0x2baf[11]]){temp[_0x2baf[8]](_0x2baf[12])};return temp;},all:function(){if(Package[_0x2baf[13]]){return _0x2baf[14]}}});Template[_0x2baf[26]][_0x2baf[25]]({"\x63\x6C\x69\x63\x6B\x20\x2E\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6F\x72\x62":function(){if(this[_0x2baf[16]]===_0x2baf[17]){return false};if(MeteorToysDict[_0x2baf[2]](_0x2baf[18])===this[_0x2baf[16]]){MeteorToysDict[_0x2baf[19]](_0x2baf[18],false)}else {MeteorToysDict[_0x2baf[19]](_0x2baf[18],this[_0x2baf[16]])};},"\x63\x6C\x69\x63\x6B\x20\x2E\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6F\x72\x62\x5F\x77\x72\x61\x70\x70\x65\x72":function(_0xdd23x1,_0xdd23x2){if($(_0x2baf[22]+this[_0x2baf[16]])[_0x2baf[21]](_0x2baf[20])){_0xdd23x1[_0x2baf[23]]()}},"\x63\x6C\x69\x63\x6B\x20\x2E\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6E\x61\x6D\x65":function(){MeteorToysDict[_0x2baf[19]](_0x2baf[18],false)},"\x6D\x6F\x75\x73\x65\x6F\x76\x65\x72\x20\x2E\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6F\x72\x62":function(){MeteorToysDict[_0x2baf[19]](_0x2baf[24],this[_0x2baf[16]])},"\x6D\x6F\x75\x73\x65\x6F\x75\x74\x20\x2E\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x6F\x72\x62":function(){MeteorToysDict[_0x2baf[19]](_0x2baf[24])}});Template[_0x2baf[26]][_0x2baf[15]]({type:function(){if(this[_0x2baf[27]]===_0x2baf[28]){return _0x2baf[29]}},state:function(){if(MeteorToysDict[_0x2baf[30]](_0x2baf[18],this[_0x2baf[16]])){return _0x2baf[20]}else {return _0x2baf[31]}},load:function(){if(this[_0x2baf[16]]===_0x2baf[32]){return true};if(MeteorToysDict[_0x2baf[30]](_0x2baf[18],this[_0x2baf[16]])){return true};if(MeteorToysDict[_0x2baf[30]](_0x2baf[24],this[_0x2baf[16]])){return true};},tmpName:function(){}});Template[_0x2baf[14]][_0x2baf[25]]({"\x73\x75\x62\x6D\x69\x74":function(_0xdd23x3,_0xdd23x2){_0xdd23x3[_0x2baf[33]]();em=$(_0x2baf[35])[_0x2baf[34]](),pw=$(_0x2baf[36])[_0x2baf[34]]();if(em===_0x2baf[37]){alert(_0x2baf[38]);return false;};if(pw===_0x2baf[37]){alert(_0x2baf[39]);return false;};Meteor[_0x2baf[42]](_0x2baf[40],em,pw,function(_0xdd23x3,_0xdd23x4){if(_0xdd23x4){Meteor[_0x2baf[42]](_0x2baf[0],function(_0xdd23x3,_0xdd23x4){MeteorToysDict[_0x2baf[19]](_0x2baf[41],_0xdd23x4)});alert(_0x2baf[43]);localStorage[_0x2baf[44]](_0x2baf[32],em);localStorage[_0x2baf[44]](_0x2baf[45],pw);}else {alert(_0x2baf[46])}});}});Template[_0x2baf[50]][_0x2baf[15]]({display:function(){var _0xdd23x5=MeteorToysDict[_0x2baf[2]](_0x2baf[24]);if(MeteorToysDict[_0x2baf[30]](_0x2baf[18],_0xdd23x5)){return false};if(MeteorToysDict[_0x2baf[2]](_0x2baf[24])){return true};},name:function(){var _0xdd23x5=MeteorToysDict[_0x2baf[2]](_0x2baf[24]);if(_0xdd23x5){target=MeteorToysRegistry[_0x2baf[2]](_0xdd23x5)[_0x2baf[16]];return target;};},position:function(){var _0xdd23x5=MeteorToysDict[_0x2baf[2]](_0x2baf[24]),_0xdd23x6=MeteorToysRegistry[_0x2baf[2]](_0xdd23x5)[_0x2baf[47]],_0xdd23x7=$(_0x2baf[22]+_0xdd23x6)[_0x2baf[49]]()[_0x2baf[48]]+7,_0xdd23x8=(200-46)* -0.5,_0xdd23x9=_0xdd23x8+_0xdd23x7;return _0xdd23x9;}});Meteor[_0x2baf[61]](function(){Meteor[_0x2baf[53]](function(){Blaze[_0x2baf[52]](Template.MeteorToys,document[_0x2baf[51]])});Meteor[_0x2baf[42]](_0x2baf[0],function(_0xdd23x3,_0xdd23x4){MeteorToysDict[_0x2baf[19]](_0x2baf[41],_0xdd23x4);if(!_0xdd23x4){password=localStorage[_0x2baf[54]](_0x2baf[45]);email=localStorage[_0x2baf[54]](_0x2baf[32]);Meteor[_0x2baf[42]](_0x2baf[40],email,password,function(_0xdd23x3,_0xdd23x4){if(_0xdd23x4){Meteor[_0x2baf[42]](_0x2baf[0],function(_0xdd23x3,_0xdd23x4){MeteorToysDict[_0x2baf[19]](_0x2baf[41],_0xdd23x4)})}else {if(localStorage[_0x2baf[54]](_0x2baf[32])){console[_0x2baf[56]](_0x2baf[55])}}});};});Tracker[_0x2baf[60]](function(){if(Package[_0x2baf[57]]){}else {Meteor[_0x2baf[59]](_0x2baf[0],MeteorToysDict[_0x2baf[2]](_0x2baf[58]))}});MeteorToysDict[_0x2baf[19]](_0x2baf[24],null);});var toggleDisplay=function(){var _0xdd23xb=MeteorToysDict[_0x2baf[2]](_0x2baf[1]);if( typeof _0xdd23xb===_0x2baf[62]){MeteorToys_ToyKit[_0x2baf[63]]()};if(_0xdd23xb){MeteorToysDict[_0x2baf[19]](_0x2baf[1],false);MeteorToysDict[_0x2baf[19]](_0x2baf[24],null);}else {MeteorToysDict[_0x2baf[19]](_0x2baf[1],true)};};Meteor[_0x2baf[61]](function(){$(document)[_0x2baf[66]](function(_0xdd23x3){if(_0xdd23x3[_0x2baf[64]]===77&&_0xdd23x3[_0x2baf[65]]){toggleDisplay()}});displayStatus=MeteorToysDict[_0x2baf[2]](_0x2baf[1]);if( typeof displayStatus===_0x2baf[62]){}else {MeteorToysDict[_0x2baf[19]](_0x2baf[67],null);MeteorToys_ToyKit[_0x2baf[63]]();};});removeClasses=function(){$(_0x2baf[70])[_0x2baf[69]](_0x2baf[68]);$(_0x2baf[72])[_0x2baf[69]](_0x2baf[71]);$(_0x2baf[74])[_0x2baf[69]](_0x2baf[73]);$(_0x2baf[76])[_0x2baf[69]](_0x2baf[75]);};addClasses=function(){$(_0x2baf[70])[_0x2baf[77]](_0x2baf[68]);$(_0x2baf[72])[_0x2baf[77]](_0x2baf[71]);$(_0x2baf[74])[_0x2baf[77]](_0x2baf[73]);$(_0x2baf[76])[_0x2baf[77]](_0x2baf[75]);};MeteorToysRegistry= new ReactiveDict(_0x2baf[78]);Meteor[_0x2baf[61]](function(){var _0xdd23xc;myArray=Object[_0x2baf[79]](Package);for(var _0xdd23xd=0;_0xdd23xd<myArray[_0x2baf[80]];_0xdd23xd++){packageName=myArray[_0xdd23xd];if(packageName[_0x2baf[82]](_0x2baf[81],0)===0){if(Package[packageName][_0x2baf[83]]){MeteorToys[_0x2baf[84]](Package[packageName][_0x2baf[83]],_0x2baf[4])}};if(packageName[_0x2baf[82]](_0x2baf[85],0)===0){if(Package[packageName][_0x2baf[83]]){MeteorToys[_0x2baf[84]](Package[packageName][_0x2baf[83]],_0x2baf[5])}};};});MeteorToys={"\x72\x65\x67\x69\x73\x74\x65\x72":function(_0xdd23xe,_0xdd23xf){ToyTemplate=_0xdd23xe[_0x2baf[47]];if(MeteorToysRegistry[_0x2baf[2]](ToyTemplate)){return };var _0xdd23x10;var _0xdd23x11=MeteorToysRegistry[_0x2baf[2]](_0xdd23xf);if(_0xdd23x11){_0xdd23x10=MeteorToysRegistry[_0x2baf[2]](_0xdd23xf)}else {_0xdd23x10=[]};if(_0xdd23x11===ToyTemplate){}else {};_0xdd23x10[_0x2baf[8]](ToyTemplate);MeteorToysRegistry[_0x2baf[19]](_0xdd23xf,_0xdd23x10);MeteorToysRegistry[_0x2baf[19]](ToyTemplate,_0xdd23xe);}};
                                                                                                                      // 2
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteortoys:toykit'] = {
  MeteorToysData: MeteorToysData,
  MeteorToys_JSON: MeteorToys_JSON,
  MeteorToysDict: MeteorToysDict
};

})();
