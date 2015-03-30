var fallback = {"form":[{"type":"title","class":"mainTitle","value":"Dynamic Demo"},{"type":"heading","class":"heading","value":"The First Heading"},{"type":"description","class":"paragraphDescription","value":"This is a paragraph describing what the settings do"},{"type":"select","id":"selects","label":"Selects:","elements":[{"option":"Option One"},{"option":"Option Two"}],"value":"Option Two"},{"type":"input","id":"input1","label":"Text Input","formType":"text","value":"Thomas Price"},{"type":"radio","id":"radiogroup2","label":"Radio Group","elements":[{"id":"option12","option":"Radio One"},{"id":"option22","option":"Radio Two"}],"value":"Radio Two"},{"type":"input","id":"input2","label":"Email Input","formType":"email","value":"tom@tomprice.ca"},{"type":"input","id":"input4","label":"Number Input","formType":"number","value":1},{"type":"input","id":"input3","label":"URL Input","formType":"url","value":"http://www.tomprice.ca"},{"type":"checkbox","id":"checkbox1","label":"Checkbox Input","value":true}]};
var configuration = localStorage.getItem("generatePersistentv0.2") ? 
    localStorage.getItem("generatePersistentv0.2") : fallback;

function sendData() {
    // Values from the Settings page
    // Example Value: "Option Two"
    var setting1 = configuration.form[3].value;

    // Example Value: "Thomas Price"
    var setting2 = configuration.form[4].value;

    // Example Value: "Radio Two"
    var setting3 = configuration.form[5].value;

    // Example Value: "tom@tomprice.ca"
    var setting4 = configuration.form[6].value;

    // Example Value: "1"
    var setting5 = +configuration.form[7].value;

    // Example Value: "http://www.tomprice.ca"
    var setting6 = configuration.form[8].value;

    // Example Value: "true"
    var setting7 = +configuration.form[9].value;


    console.log("setting1: "+ setting1);
    console.log("setting2: "+ setting2);
    console.log("setting3: "+ setting3);
    console.log("setting4: "+ setting4);
    console.log("setting5: "+ setting5);
    console.log("setting6: "+ setting6);
    console.log("setting7: "+ setting7);

    // Assemble dictionary using our keys
    var dictionary = {
    // "SETTING_1": setting1,
    // "SETTING_2": setting2,
    // "SETTING_3": setting3,
    // "SETTING_4": setting4,
    // "SETTING_5": setting5,
    // "SETTING_6": setting6,
    // "SETTING_7": setting7
    };
//     Send to Pebble
//     Pebble.sendAppMessage(dictionary,
//         function(e) {
//             console.log("Settings sent to Pebble successfully!");
//         },
//         function(e) {
//             console.log("Error sending settings to Pebble!");
//         }
//     );
}
// Listen for when the watchface is opened
Pebble.addEventListener("ready", 
    function(e) {
        console.log("PebbleKit JS ready!");
        sendData();
    }
);
// Listen for when an AppMessage is received
Pebble.addEventListener("appmessage",
    function(e) {
        console.log("AppMessage received!");
        sendData();
    }
);
Pebble.addEventListener("showConfiguration", function(e) {
    console.log("Input Config: " + JSON.stringify(configuration));
    // Using encodeURIComponent causes unresolved error
    console.log("https://tomprice.ca/dynamicSettings?" + JSON.stringify(configuration));
    Pebble.openURL("https://tomprice.ca/dynamicSettings?" + JSON.stringify(configuration));
});
Pebble.addEventListener("webviewclosed", function(e) {
    if (e.response == "") {
        console.log("Empty response");
    } else {
        console.log("Outpt Config: " + e.response);
        configuration = JSON.parse(decodeURIComponent(e.response));
        localStorage.setItem("generatePersistentv0.2", configuration);
        sendData();
    }
});