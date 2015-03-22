var configuration = localStorage.getItem('configValueV0.1') ? 
    localStorage.getItem('configValueV0.1') : 
'{"project":"https://www.kickstarter.com/projects/597507018/pebble-time-awesome-smartwatch-no-compromises","fontRNS":true,"fontHWT":false}';

// var xhrRequest = function (url, type, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//         callback(this.responseText);
//     };
//     xhr.open(type, url);
//     xhr.send();
// };

function sendData() {

    var style2 = +JSON.parse(configuration).fontRNS;
    var style3 = +JSON.parse(configuration).fontHWT;
    // Assemble dictionary using our keys
    var dictionary = {
        "SETTING_1": 0,
        "SETTING_2": style2,
        "SETTING_3": style3
    };

    // Send to Pebble
    Pebble.sendAppMessage(dictionary,
                          function(e) {
                              console.log("Settings sent to Pebble successfully!");
                          },
                          function(e) {
                              console.log("Error sending settings to Pebble!");
                          }
                         );
}      




// Listen for when the watchface is opened
Pebble.addEventListener('ready', 
                        function(e) {
                            console.log("PebbleKit JS ready!");
                            sendData();
                        }
                       );

// Listen for when an AppMessage is received
Pebble.addEventListener('appmessage',
                        function(e) {
                            console.log("AppMessage received!");
                            sendData();
                        }                     
                       );

Pebble.addEventListener('showConfiguration', function(e) {
    console.log('Input Config: ' + '"' + configuration + '"');
    Pebble.openURL('http://pebble.tomprice.ca/pebbleConfig?' + encodeURIComponent(configuration));
});

Pebble.addEventListener('webviewclosed', function(e) {
    if (e.response == "") {
        console.log("Empty response");
    } else {
        console.log('Outpt Config: ' + '"' + e.response + '"');
        configuration = decodeURIComponent(e.response);
        localStorage.setItem('configValueV0.1', configuration);
        sendData();
    }
});