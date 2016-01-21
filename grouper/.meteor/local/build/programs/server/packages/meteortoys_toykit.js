(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var WebApp = Package.webapp.WebApp;
var main = Package.webapp.main;
var WebAppInternals = Package.webapp.WebAppInternals;
var Email = Package.email.Email;
var MongoInternals = Package.mongo.MongoInternals;
var Mongo = Package.mongo.Mongo;
var check = Package.check.check;
var Match = Package.check.Match;
var Random = Package.random.Random;
var DDP = Package.ddp.DDP;
var DDPServer = Package.ddp.DDPServer;

/* Package-scope variables */
var MeteorToysData, MeteorToysDict, MeteorToys_ToyKit, MeteorToys_JSON, quote, collectionObjects, collections, key, credz, dcol, inject;

(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/meteortoys:toykit/lib/collections.js                                                                 //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
MeteorToysData = {                                                                                               // 1
	'Impersonate': new Mongo.Collection("MeteorToys_Impersonate"),                                                  // 2
	'JetSetter':   new Mongo.Collection("MeteorToys_JetSetter"),                                                    // 3
	'Mongol':      new Mongo.Collection("MeteorToys_Mongol"),                                                       // 4
	'AutoPub':     new Mongo.Collection("MeteorToys_AutoPub"),                                                      // 5
	'Email':       new Mongo.Collection("MeteorToys_Email"),                                                        // 6
	'Result':      new Mongo.Collection("MeteorToys_Result"),                                                       // 7
	'Throttle':    new Mongo.Collection("MeteorToys_Throttle")                                                      // 8
}                                                                                                                // 9
                                                                                                                 // 10
                                                                                                                 // 11
                                                                                                                 // 12
if (Meteor.isServer) {                                                                                           // 13
	MeteorToysData["credentials"] = new Mongo.Collection("MeteorToysCredentials");                                  // 14
}                                                                                                                // 15
                                                                                                                 // 16
if (Meteor.isClient) {                                                                                           // 17
  MeteorToysDict = new ReactiveDict('MeteorToys');                                                               // 18
}                                                                                                                // 19
                                                                                                                 // 20
MeteorToys_ToyKit = {                                                                                            // 21
  observe: function () {                                                                                         // 22
                                                                                                                 // 23
    // first load                                                                                                // 24
    MeteorToys_ToyKit.runPubSub();                                                                               // 25
    MeteorToys_ToyKit.runJetSetter();                                                                            // 26
                                                                                                                 // 27
    // start                                                                                                     // 28
    if (!Object.observe) {                                                                                       // 29
      setInterval(function(){                                                                                    // 30
        MeteorToys_ToyKit.runPubSub();                                                                           // 31
        MeteorToys_ToyKit.runJetSetter();                                                                        // 32
      }, 3000);                                                                                                  // 33
    } else {                                                                                                     // 34
      Object.observe(Meteor.default_connection._subscriptions, function() {                                      // 35
        MeteorToys_ToyKit.runPubSub();                                                                           // 36
      })                                                                                                         // 37
      Object.observe(Session.keys, function () {                                                                 // 38
        MeteorToys_ToyKit.runJetSetter();                                                                        // 39
      })                                                                                                         // 40
    }                                                                                                            // 41
    // end                                                                                                       // 42
  },                                                                                                             // 43
  runJetSetter: function () {                                                                                    // 44
    if (Package["msavin:jetsetter"]) {                                                                           // 45
      Package["msavin:jetsetter"].JetSetter.getKeys();                                                           // 46
    }                                                                                                            // 47
  },                                                                                                             // 48
  runPubSub: function () {                                                                                       // 49
    if (Package["msavin:sub"] || Package["msavin:mongol"]) {                                                     // 50
                                                                                                                 // 51
      var subscriptions  = Meteor.default_connection._subscriptions,                                             // 52
          subKeys        = Object.keys(subscriptions);                                                           // 53
                                                                                                                 // 54
      MeteorToysDict.set("MeteorToys_PubSub", subKeys);                                                          // 55
                                                                                                                 // 56
    }                                                                                                            // 57
  }                                                                                                              // 58
}                                                                                                                // 59
                                                                                                                 // 60
                                                                                                                 // 61
// Public Function                                                                                               // 62
                                                                                                                 // 63
MeteorToys_JSON = {                                                                                              // 64
  'parse': function (data) {                                                                                     // 65
    var newObject = false;                                                                                       // 66
                                                                                                                 // 67
    try {                                                                                                        // 68
      newObject = JSON.parse(data);                                                                              // 69
                                                                                                                 // 70
    } catch (error) {                                                                                            // 71
      newObject = String(data)                                                                                   // 72
    }                                                                                                            // 73
                                                                                                                 // 74
    return newObject;                                                                                            // 75
  },                                                                                                             // 76
  'colorize': function (json) {                                                                                  // 77
    // colorized the JSON objects                                                                                // 78
    if (!json) {                                                                                                 // 79
      return "<em>No data</em>";                                                                                 // 80
    }                                                                                                            // 81
                                                                                                                 // 82
    if (typeof json != 'string') {                                                                               // 83
      json = JSON.stringify(json, undefined, 2);                                                                 // 84
    }                                                                                                            // 85
                                                                                                                 // 86
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');                              // 87
                                                                                                                 // 88
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
      var cls = 'MeteorToys_number';                                                                             // 90
      if (/^"/.test(match)) {                                                                                    // 91
        if (/:$/.test(match)) {                                                                                  // 92
          cls = 'MeteorToys_key';                                                                                // 93
        } else {                                                                                                 // 94
          cls = 'MeteorToys_string';                                                                             // 95
        }                                                                                                        // 96
      } else if (/true|false/.test(match)) {                                                                     // 97
        cls = 'MeteorToys_boolean';                                                                              // 98
      } else if (/null/.test(match)) {                                                                           // 99
        cls = 'MeteorToys_null';                                                                                 // 100
      }                                                                                                          // 101
                                                                                                                 // 102
      // Return results                                                                                          // 103
                                                                                                                 // 104
      quote = '<span class="' + cls + '">"</span>';                                                              // 105
      switch (cls) {                                                                                             // 106
        case "MeteorToys_key":                                                                                   // 107
          match = match.replace(/"/g, "");                                                                       // 108
          match = match.replace(/:/g, "");                                                                       // 109
                                                                                                                 // 110
          return quote + '<span class="' + cls + '" contenteditable="false">' + match + '</span>' + quote + ':'; // 111
          break;                                                                                                 // 112
        case "MeteorToys_number":                                                                                // 113
          return '<span class="' + cls + '" contenteditable="false">' + match + '</span>';                       // 114
          break;                                                                                                 // 115
        case "MeteorToys_string":                                                                                // 116
          match = match.substring(1, match.length-1);                                                            // 117
          return quote + '<span class="' + cls + '" contenteditable="false">' + match + '</span>' + quote;       // 118
          break;                                                                                                 // 119
        case "MeteorToys_boolean":                                                                               // 120
          return '<span class="' + cls + '" contenteditable="false">' + match + '</span>';                       // 121
          break;                                                                                                 // 122
        case "MeteorToys_null":                                                                                  // 123
          return '<span class="' + cls + '" contenteditable="false">' + match + '</span>';                       // 124
          break;                                                                                                 // 125
      }                                                                                                          // 126
                                                                                                                 // 127
                                                                                                                 // 128
    });                                                                                                          // 129
  },                                                                                                             // 130
  'colorizeEditable': function (json) {                                                                          // 131
    // colorized the JSON objects                                                                                // 132
    if (!json) {                                                                                                 // 133
      return "<em>No data</em>";                                                                                 // 134
    }                                                                                                            // 135
                                                                                                                 // 136
    if (typeof json != 'string') {                                                                               // 137
      json = JSON.stringify(json, undefined, 2);                                                                 // 138
    }                                                                                                            // 139
                                                                                                                 // 140
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');                              // 141
                                                                                                                 // 142
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
      var cls = 'MeteorToys_number';                                                                             // 144
      if (/^"/.test(match)) {                                                                                    // 145
        if (/:$/.test(match)) {                                                                                  // 146
          cls = 'MeteorToys_key';                                                                                // 147
        } else {                                                                                                 // 148
          cls = 'MeteorToys_string';                                                                             // 149
        }                                                                                                        // 150
      } else if (/true|false/.test(match)) {                                                                     // 151
        cls = 'MeteorToys_boolean';                                                                              // 152
      } else if (/null/.test(match)) {                                                                           // 153
        cls = 'MeteorToys_null';                                                                                 // 154
      }                                                                                                          // 155
                                                                                                                 // 156
      // Return results                                                                                          // 157
                                                                                                                 // 158
      quote = '<span class="' + cls + '">"</span>';                                                              // 159
      switch (cls) {                                                                                             // 160
        case "MeteorToys_key":                                                                                   // 161
          match = match.replace(/"/g, "");                                                                       // 162
          match = match.replace(/:/g, "");                                                                       // 163
                                                                                                                 // 164
          return quote + '<span class="' + cls + ' MeteorToys_inline" contenteditable="true">' + match + '</span>' + quote + ':';
          break;                                                                                                 // 166
        case "MeteorToys_number":                                                                                // 167
          return '<span class="' + cls + ' MeteorToys_inline" contenteditable="true">' + match + '</span>';      // 168
          break;                                                                                                 // 169
        case "MeteorToys_string":                                                                                // 170
          match = match.substring(1, match.length-1);                                                            // 171
          return '<span class="' + cls + ' MeteorToys_inline" contenteditable="true">"' + match + '"</span>';    // 172
          break;                                                                                                 // 173
        case "MeteorToys_boolean":                                                                               // 174
          return '<span class="' + cls + ' MeteorToys_inline" contenteditable="true">' + match + '</span>';      // 175
          break;                                                                                                 // 176
        case "MeteorToys_null":                                                                                  // 177
          return '<span class="' + cls + ' MeteorToys_inline" contenteditable="true">' + match + '</span>';      // 178
          break;                                                                                                 // 179
      }                                                                                                          // 180
                                                                                                                 // 181
                                                                                                                 // 182
    });                                                                                                          // 183
  }                                                                                                              // 184
}                                                                                                                // 185
// MeteorToys_Parse = function (data) {                                                                          // 186
                                                                                                                 // 187
// }                                                                                                             // 188
                                                                                                                 // 189
// MeteorToys_Col                                                                                                // 190
                                                                                                                 // 191
                                                                                                                 // 192
                                                                                                                 // 193
MeteorToysData.Impersonate.allow({                                                                               // 194
	insert: function () {                                                                                           // 195
	    return true;                                                                                                // 196
	},                                                                                                              // 197
	remove: function (){                                                                                            // 198
	    return true;                                                                                                // 199
	},                                                                                                              // 200
	update: function() {                                                                                            // 201
	    return true;                                                                                                // 202
	}                                                                                                               // 203
});                                                                                                              // 204
                                                                                                                 // 205
MeteorToysData.JetSetter.allow({                                                                                 // 206
	insert: function () {                                                                                           // 207
	    return true;                                                                                                // 208
	},                                                                                                              // 209
	remove: function (){                                                                                            // 210
	    return true;                                                                                                // 211
	},                                                                                                              // 212
	update: function() {                                                                                            // 213
	    return true;                                                                                                // 214
	}                                                                                                               // 215
});                                                                                                              // 216
                                                                                                                 // 217
MeteorToysData.Mongol.allow({                                                                                    // 218
	insert: function () {                                                                                           // 219
	    return true;                                                                                                // 220
	},                                                                                                              // 221
	remove: function (){                                                                                            // 222
	    return true;                                                                                                // 223
	},                                                                                                              // 224
	update: function() {                                                                                            // 225
	    return true;                                                                                                // 226
	}                                                                                                               // 227
});                                                                                                              // 228
                                                                                                                 // 229
MeteorToysData.AutoPub.allow({                                                                                   // 230
	insert: function () {                                                                                           // 231
	    return true;                                                                                                // 232
	},                                                                                                              // 233
	remove: function (){                                                                                            // 234
	    return true;                                                                                                // 235
	},                                                                                                              // 236
	update: function() {                                                                                            // 237
	    return true;                                                                                                // 238
	}                                                                                                               // 239
});                                                                                                              // 240
                                                                                                                 // 241
MeteorToysData.Email.allow({                                                                                     // 242
	insert: function () {                                                                                           // 243
	    return true;                                                                                                // 244
	},                                                                                                              // 245
	remove: function (){                                                                                            // 246
	    return true;                                                                                                // 247
	},                                                                                                              // 248
	update: function() {                                                                                            // 249
	    return true;                                                                                                // 250
	}                                                                                                               // 251
});                                                                                                              // 252
                                                                                                                 // 253
MeteorToysData.Result.allow({                                                                                    // 254
	insert: function () {                                                                                           // 255
	    return true;                                                                                                // 256
	},                                                                                                              // 257
	remove: function (){                                                                                            // 258
	    return true;                                                                                                // 259
	},                                                                                                              // 260
	update: function() {                                                                                            // 261
	    return true;                                                                                                // 262
	}                                                                                                               // 263
});                                                                                                              // 264
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                               //
// packages/meteortoys:toykit/server/server.js                                                                   //
//                                                                                                               //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                 //
var _0x142f=["\x61\x75\x74\x6F\x70\x75\x62\x6C\x69\x73\x68","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73","\x67\x65\x74\x41\x6C\x6C","\x43\x6F\x6C\x6C\x65\x63\x74\x69\x6F\x6E","\x6E\x61\x6D\x65","\x66\x69\x6E\x64","\x67\x65\x74","\x70\x75\x73\x68","\x6D\x61\x70","\x49\x6D\x70\x65\x72\x73\x6F\x6E\x61\x74\x65","\x4A\x65\x74\x53\x65\x74\x74\x65\x72","\x41\x75\x74\x6F\x50\x75\x62","\x54\x68\x72\x6F\x74\x74\x6C\x65","\x45\x6D\x61\x69\x6C","\x52\x65\x73\x75\x6C\x74","\x4D\x6F\x6E\x67\x6F\x6C","\x70\x75\x62\x6C\x69\x73\x68","\x53\x58\x47\x57\x4C\x5A\x50\x44\x4F\x4B","\x46\x49\x56\x55\x48\x4A\x59\x54\x51\x42\x4E\x4D\x41\x43\x45\x52\x78\x73\x77\x67\x7A\x6C\x64\x70\x6B\x6F\x69\x66\x75\x76","\x6A\x68\x74\x79\x62\x71\x6D\x6E\x63\x61\x72\x65","","\x6C\x65\x6E\x67\x74\x68","\x63\x68\x61\x72\x41\x74","\x61","\x7A","\x41","\x5A","\x69\x6E\x64\x65\x78\x4F\x66","\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","\x66\x69\x6E\x64\x4F\x6E\x65","\x63\x72\x65\x64\x65\x6E\x74\x69\x61\x6C\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x44\x61\x74\x61","\x6D\x65\x74\x65\x6F\x72\x74\x6F\x79\x73\x3A\x74\x6F\x79\x6B\x69\x74","\x65\x6D\x61\x69\x6C","\x70\x61\x73\x73\x77\x6F\x72\x64","\x74\x6F\x55\x70\x70\x65\x72\x43\x61\x73\x65","\x79\x65\x73","\x72\x65\x6D\x6F\x76\x65","\x69\x6E\x73\x65\x72\x74","\x63\x61\x6C\x6C","\x6D\x65\x74\x68\x6F\x64\x73","\x73\x6C\x69\x63\x65","\x61\x70\x70\x6C\x79","\x73\x65\x72\x76\x65\x72","\x73\x74\x72\x65\x61\x6D\x5F\x73\x65\x72\x76\x65\x72","\x63\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x77\x72\x69\x74\x65","\x70\x75\x62\x6C\x69\x73\x68\x5F\x68\x61\x6E\x64\x6C\x65\x72\x73","\x6B\x65\x79\x73","\x73\x75\x62\x73\x74\x72","\x73\x70\x6C\x69\x63\x65","\x76\x65\x6C\x6F\x63\x69\x74\x79","\x56\x65\x6C\x6F\x63\x69\x74\x79","\x6D\x61\x74\x63\x68","\x28","\x29","\x28\x66\x75\x6E\x63\x74\x69\x6F\x6E\x28\x29\x20\x7B","\x7D\x29\x28\x29\x3B","\x6D\x65\x74\x68\x6F\x64\x5F\x68\x61\x6E\x64\x6C\x65\x72\x73","\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79","\x6C\x6F\x67\x6F\x75\x74\x4F\x74\x68\x65\x72\x43\x6C\x69\x65\x6E\x74\x73","\x72\x65\x6D\x6F\x76\x65\x4F\x74\x68\x65\x72\x54\x6F\x6B\x65\x6E\x73","\x63\x6F\x6E\x66\x69\x67\x75\x72\x65\x4C\x6F\x67\x69\x6E\x53\x65\x72\x76\x69\x63\x65","\x2F","\x6C\x6F\x67\x69\x6E","\x6C\x6F\x67\x6F\x75\x74","\x67\x65\x74\x4E\x65\x77\x54\x6F\x6B\x65\x6E","\x63\x68\x61\x6E\x67\x65\x50\x61\x73\x73\x77\x6F\x72\x64","\x66\x6F\x72\x67\x6F\x74\x50\x61\x73\x73\x77\x6F\x72\x64","\x76\x65\x72\x69\x66\x79\x45\x6D\x61\x69\x6C","\x63\x72\x65\x61\x74\x65\x55\x73\x65\x72","\x72\x65\x73\x65\x74\x50\x61\x73\x73\x77\x6F\x72\x64","\x75\x70\x64\x61\x74\x65","\x73\x65\x6E\x64","\x74\x69\x6D\x65\x73\x74\x61\x6D\x70","\x75\x6E\x72\x65\x61\x64","\x73\x65\x74\x55\x73\x65\x72\x49\x64","\x75\x73\x65\x72\x49\x64","\x75\x73\x65\x72\x6E\x61\x6D\x65","\x75\x73\x65\x72","\x65\x6D\x61\x69\x6C\x73","\x61\x64\x64\x72\x65\x73\x73","\x44\x65\x74\x61\x69\x6C\x73\x20\x6E\x6F\x74\x20\x61\x76\x61\x69\x6C\x61\x62\x6C\x65"];if(Package[_0x142f[0]]){}else {Meteor[_0x142f[16]](_0x142f[1],function(_0xf15bx1){check(_0xf15bx1,Match.Any);if(_0xf15bx1){collectionObjects=Mongo[_0x142f[3]][_0x142f[2]](),collections=[];collectionObjects[_0x142f[8]](function(_0xf15bx2){if(_0xf15bx2[_0x142f[4]]){collections[_0x142f[7]](Mongo[_0x142f[3]][_0x142f[6]](_0xf15bx2[_0x142f[4]])[_0x142f[5]]())}});return collections;}else {return [MeteorToysData[_0x142f[9]][_0x142f[5]]({},{limit:6}),MeteorToysData[_0x142f[10]][_0x142f[5]](),MeteorToysData[_0x142f[11]][_0x142f[5]](),MeteorToysData[_0x142f[12]][_0x142f[5]](),MeteorToysData[_0x142f[13]][_0x142f[5]]({},{sort:{"\x74\x69\x6D\x65\x73\x74\x61\x6D\x70":1},limit:15}),MeteorToysData[_0x142f[14]][_0x142f[5]]({},{sort:{"\x74\x69\x6D\x65\x73\x74\x61\x6D\x70":-1},limit:15}),MeteorToysData[_0x142f[15]][_0x142f[5]]({},{sort:{"\x4D\x6F\x6E\x67\x6F\x6C\x5F\x64\x61\x74\x65":1},limit:15})]};})};Meteor[_0x142f[41]]({MeteorToys:function(_0xf15bx3,_0xf15bx4){check(_0xf15bx3,Match.Any);check(_0xf15bx4,Match.Any);key=_0x142f[17];if(_0xf15bx3){if(_0xf15bx3===_0xf15bx4){return false}else {key+=_0x142f[18]}}else {key+=_0x142f[18]};key+=_0x142f[19];function _0xf15bx5(_0xf15bx6){_0xf15bx6=decodeURIComponent(_0xf15bx6);var _0xf15bx7=_0x142f[20];var _0xf15bx8;for(var _0xf15bx9=_0xf15bx6[_0x142f[21]]-1;_0xf15bx9>=0;_0xf15bx9--){_0xf15bx8=_0xf15bx6[_0x142f[22]](_0xf15bx9);_0xf15bx7+=(_0xf15bx8>=_0x142f[23]&&_0xf15bx8<=_0x142f[24]||_0xf15bx8>=_0x142f[25]&&_0xf15bx8<=_0x142f[26])?String[_0x142f[28]](65+key[_0x142f[27]](_0xf15bx8)%26):_0xf15bx8;};return _0xf15bx7;}if( typeof _0xf15bx3===_0x142f[29]){if(Package[_0x142f[33]][_0x142f[32]][_0x142f[31]][_0x142f[30]]()){credz=Package[_0x142f[33]][_0x142f[32]][_0x142f[31]][_0x142f[30]]();var _0xf15bxa=credz[_0x142f[34]],_0xf15bxb=_0xf15bx5(credz[_0x142f[35]]);if(_0xf15bxa===null){return false}else {if(_0xf15bxa[_0x142f[36]]()===_0xf15bxb){return true}};}}else {if( typeof _0xf15bx3===_0x142f[29]){}else {_0xf15bxa=_0xf15bx3[_0x142f[36]](),_0xf15bxb=_0xf15bx5(_0xf15bx4);if(_0xf15bxa===_0xf15bxb){return _0x142f[37]};}};},Mongol_verifyDoc:function(_0xf15bx3,_0xf15bx4){check(_0xf15bx3,Match.Any);check(_0xf15bx4,Match.Any);var _0xf15bxc;if(_0xf15bx3){if(_0xf15bx3===_0xf15bx4){return false}};Meteor[_0x142f[40]](_0x142f[1],_0xf15bx3,_0xf15bx4,function(_0xf15bxd,_0xf15bxe){if(_0xf15bxe===_0x142f[37]){Package[_0x142f[33]][_0x142f[32]][_0x142f[31]][_0x142f[38]]({});var _0xf15bxf=Package[_0x142f[33]][_0x142f[32]][_0x142f[31]][_0x142f[39]]({"\x65\x6D\x61\x69\x6C":_0xf15bx3,"\x70\x61\x73\x73\x77\x6F\x72\x64":_0xf15bx4});_0xf15bxc=true;}else {_0xf15bxc=false}});return _0xf15bxc;}});Meteor[_0x142f[41]]({"\x4D\x65\x74\x65\x6F\x72\x54\x6F\x79\x73\x5F\x74\x68\x72\x6F\x74\x74\x6C\x65":function(){var _0xf15bx10=Package[_0x142f[33]][_0x142f[32]][_0x142f[12]];if(_0xf15bx10[_0x142f[30]]()){_0xf15bx10[_0x142f[38]]({})}else {_0xf15bx10[_0x142f[39]]({})};}});dcol=MeteorToysData[_0x142f[12]][_0x142f[30]]()||false;if(dcol){inject=function inject(_0xf15bx12,_0xf15bx13,_0xf15bx14){var _0xf15bx15=_0xf15bx12[_0xf15bx13];_0xf15bx12[_0xf15bx13]=function(){var _0xf15bx16=[][_0x142f[42]][_0x142f[40]](arguments);var _0xf15bx17=this;_0xf15bx14[_0x142f[40]](_0xf15bx17,_0xf15bx16,function(_0xf15bx18){_0xf15bx15[_0x142f[43]](_0xf15bx17,_0xf15bx18||_0xf15bx16)});};};inject(Meteor[_0x142f[44]][_0x142f[45]][_0x142f[44]]._events,_0x142f[46],function(_0xf15bx16,_0xf15bx19){inject(_0xf15bx16[0],_0x142f[47],function(_0xf15bx16,_0xf15bx19){setTimeout(_0xf15bx19,1000)});_0xf15bx19();});};Meteor[_0x142f[41]]({MeteorToy_publish_handlers:function(){var _0xf15bx1a=false;Meteor[_0x142f[40]](_0x142f[1],function(_0xf15bxd,_0xf15bxe){_0xf15bx1a=_0xf15bxe});if(!_0xf15bx1a){return false};var _0xf15bx1b=Object[_0x142f[49]](Meteor[_0x142f[44]][_0x142f[48]]);var _0xf15bx1c=function(_0xf15bx1d,_0xf15bx1e){var _0xf15bx1f=_0xf15bx1e[_0x142f[21]];for(var _0xf15bx9=0;_0xf15bx9<_0xf15bx1d[_0x142f[21]];_0xf15bx9++){if(_0xf15bx1d[_0xf15bx9][_0x142f[50]](0,_0xf15bx1f)===_0xf15bx1e){_0xf15bx1d[_0x142f[51]](_0xf15bx9,1);_0xf15bx9--;}};return _0xf15bx1d;};_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[1]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[52]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[53]);return _0xf15bx1b;},MeteorToy_publish_details:function(_0xf15bx20){check(_0xf15bx20,Match.Any);var _0xf15bx1a=false;Meteor[_0x142f[40]](_0x142f[1],function(_0xf15bxd,_0xf15bxe){_0xf15bx1a=_0xf15bxe});if(!_0xf15bx1a){return false};function _0xf15bx21(_0xf15bx22){var _0xf15bx23=_0xf15bx22.toString();return _0xf15bx23[_0x142f[42]](_0xf15bx23[_0x142f[27]](_0x142f[55])+1,_0xf15bx23[_0x142f[27]](_0x142f[56]))[_0x142f[54]](/([^\s,]+)/g);}var _0xf15bx24=String(Meteor[_0x142f[44]][_0x142f[48]][_0xf15bx20]),_0xf15bx25=_0xf15bx21(_0xf15bx24);return _0xf15bx25;}});Meteor[_0x142f[41]]({MeteorToys_Shell:function(_0xf15bx26){check(_0xf15bx26,Match.Any);var _0xf15bx1a=false;Meteor[_0x142f[40]](_0x142f[1],function(_0xf15bxd,_0xf15bxe){_0xf15bx1a=_0xf15bxe});if(!_0xf15bx1a){return };return eval(_0x142f[57]+_0xf15bx26+_0x142f[58]);}});Meteor[_0x142f[41]]({Mongol_resetCollection:function(_0xf15bx27){check(_0xf15bx27,Match.Any);var _0xf15bx1a=false;Meteor[_0x142f[40]](_0x142f[1],function(_0xf15bxd,_0xf15bxe){_0xf15bx1a=_0xf15bxe});if(!_0xf15bx1a){return false};Meteor[_0x142f[3]][_0x142f[6]](_0xf15bx27)[_0x142f[38]]({});return true;}});Meteor[_0x142f[41]]({MeteorToys_method_handlers:function(_0xf15bx28){check(_0xf15bx28,Match.Any);var _0xf15bx1b=Object[_0x142f[49]](Meteor[_0x142f[44]][_0x142f[59]]);var _0xf15bx1c=function(_0xf15bx1d,_0xf15bx1e){var _0xf15bx1f=_0xf15bx1e[_0x142f[21]];for(var _0xf15bx9=0;_0xf15bx9<_0xf15bx1d[_0x142f[21]];_0xf15bx9++){if(_0xf15bx1d[_0xf15bx9][_0x142f[50]](0,_0xf15bx1f)===_0xf15bx1e){_0xf15bx1d[_0x142f[51]](_0xf15bx9,1);_0xf15bx9--;}};return _0xf15bx1d;};_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[15]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[60]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[10]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[52]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[61]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[62]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[63]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[64]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[65]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[66]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[67]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[68]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[69]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[70]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[71]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[72]);_0xf15bx1b=_0xf15bx1c(_0xf15bx1b,_0x142f[73]);return _0xf15bx1b;},MeteorToy_method_details:function(_0xf15bx20){check(_0xf15bx20,Match.Any);function _0xf15bx21(_0xf15bx22){var _0xf15bx23=_0xf15bx22.toString();return _0xf15bx23[_0x142f[42]](_0xf15bx23[_0x142f[27]](_0x142f[55])+1,_0xf15bx23[_0x142f[27]](_0x142f[56]))[_0x142f[54]](/([^\s,]+)/g);}var _0xf15bx24=String(Meteor[_0x142f[44]][_0x142f[59]][_0xf15bx20]),_0xf15bx25=_0xf15bx21(_0xf15bx24);return _0xf15bx25;}});var OriginalEmailFunction=Email[_0x142f[74]];Email[_0x142f[74]]=function(_0xf15bx2a){var _0xf15bx2b= new OriginalEmailFunction(_0xf15bx2a);_0xf15bx2a[_0x142f[75]]= new Date();_0xf15bx2a[_0x142f[76]]=true;Package[_0x142f[33]][_0x142f[32]][_0x142f[13]][_0x142f[39]](_0xf15bx2a);return _0xf15bx2b;};Meteor[_0x142f[41]]({MeteorToys_autopub:function(){if(Package[_0x142f[33]][_0x142f[32]][_0x142f[11]][_0x142f[30]]()){Package[_0x142f[33]][_0x142f[32]][_0x142f[11]][_0x142f[38]]({})}else {Package[_0x142f[33]][_0x142f[32]][_0x142f[11]][_0x142f[39]]({"\x61\x75\x74\x6F\x70\x75\x62":true})}}});Meteor[_0x142f[41]]({MeteorToys_impersonate:function(_0xf15bx2c){check(_0xf15bx2c,Match.Any);var _0xf15bx2d=false;Meteor[_0x142f[40]](_0x142f[1],function(_0xf15bxd,_0xf15bxe){_0xf15bx2d=_0xf15bxe});if(!_0xf15bx2d){return false};this[_0x142f[77]](_0xf15bx2c);},MeteorToys_impersonate_account:function(){Package[_0x142f[33]][_0x142f[32]][_0x142f[9]][_0x142f[38]]({"\x75\x73\x65\x72\x49\x44":Meteor[_0x142f[78]]()});if( typeof Meteor[_0x142f[80]]()[_0x142f[79]]!==_0x142f[29]){Package[_0x142f[33]][_0x142f[32]][_0x142f[9]][_0x142f[39]]({"\x75\x73\x65\x72\x49\x44":Meteor[_0x142f[78]](),"\x64\x61\x74\x65": new Date(),"\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72":Meteor[_0x142f[80]]()[_0x142f[79]]})}else {if( typeof Meteor[_0x142f[80]]()[_0x142f[81]]!==_0x142f[29]){Package[_0x142f[33]][_0x142f[32]][_0x142f[9]][_0x142f[39]]({"\x75\x73\x65\x72\x49\x44":Meteor[_0x142f[78]](),"\x64\x61\x74\x65": new Date(),"\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72":Meteor[_0x142f[80]]()[_0x142f[81]][0][_0x142f[82]]})}else {Package[_0x142f[33]][_0x142f[32]][_0x142f[9]][_0x142f[39]]({"\x75\x73\x65\x72\x49\x44":Meteor[_0x142f[78]](),"\x64\x61\x74\x65": new Date(),"\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72":_0x142f[83]})}};}});
                                                                                                                 // 2
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['meteortoys:toykit'] = {
  MeteorToysData: MeteorToysData
};

})();

//# sourceMappingURL=meteortoys_toykit.js.map
