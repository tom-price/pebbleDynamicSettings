var example = { "form": [
    {"type":"title", "class":"mainTitle","value":"Dynamic Demo"},
    {"type":"heading", "class":"heading","value":"The First Heading"},
    {"type":"description", "class":"paragraphDescription","value":"This is a paragraph describing what the settings do"},
    {"type":"select", "id":"selects","label":"Selects:","elements":[{"option":"Option One"},{"option":"Option Two"}],"value":"Option Two"},
    {"type":"radio", "id":"radiogroup2","label":"Radio Group","elements":[{"id":"option12","option":"Radio One"},{"id":"option22","option":"Radio Two"}],"value":"Radio Two"},
    {"type":"input", "id":"input1","label":"Text Input","formType":"text","value":"Thomas Price"},
    {"type":"input", "id":"input2","label":"Email Input","formType":"email","value":"tom@tomprice.ca"},
    {"type":"input", "id":"input4","label":"Number Input","formType":"number","value":"1"},
    {"type":"input", "id":"input3","label":"URL Input","formType":"url","value":"http://www.tomprice.ca"},
    {"type":"checkbox", "id":"checkbox1","label":"Checkbox Input","value":true}]
}

var configuration = localStorage.getItem('configValueV0.91') ? 
    localStorage.getItem('configValueV0.91') : JSON.stringify(example);




// var xhrRequest = function (url, type, callback) {
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//         callback(this.responseText);
//     };
//     xhr.open(type, url);
//     xhr.send();
// };

function sendData() {
    console.log(JSON.parse(configuration).form[7].value);
//     var setting1 = +JSON.parse(configuration).form[7].value;
//     var setting2 = +JSON.parse(configuration).form[8].value;
    // Assemble dictionary using our keys
    var dictionary = {
        "SETTING_1": 0,
        "SETTING_2": 0,
        "SETTING_3": 0
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
    console.log('Input Config: ' + configuration);
    console.log('http://tomprice.ca/dynamicSettings?' + encodeURIComponent(configuration));
    Pebble.openURL('http://tomprice.ca/dynamicSettings?' + encodeURIComponent(configuration));
});

Pebble.addEventListener('webviewclosed', function(e) {
    if (e.response == "") {
        console.log("Empty response");
    } else {
        console.log('Outpt Config: ' + e.response);
        configuration = decodeURIComponent(e.response);
        localStorage.setItem('configValueV0.91', configuration);
        sendData();
    }
});