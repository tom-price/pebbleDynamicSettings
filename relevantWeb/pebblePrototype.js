$( document ).ready(function() {
    $("#b-cancel").click(function() {
        console.log("Cancel");
        console.log("pebblejs://close");
        document.location = "pebblejs://close";
    });

    $("#b-submit").click(function() {
        console.log("Submit");
        var location = "pebblejs://close#" + encodeURIComponent(JSON.stringify(saveOptions(obj)));
        console.log(location);
        document.location = location;
    });

    //Set form values to whatever is passed in.
    var input = window.location.search.substring(1);
    console.log('"' + input + '"');
    if (input == "") {
        console.log("There was an input error");
        //Could display error text on page
        $('<h2>This page requires a JSON string to display settings.</h2><a href="http://pebble.tomprice.ca/pebblePrototype?{%22form%22:{%22radioGroup%22:{%22label%22:%22Watchface%20Font:%22,%22elements%22:[{%22id%22:%22fontRNS%22,%22label%22:%22RNS%20Baruta%20Black%22,%22value%22:true},{%22id%22:%22fontHWT%22,%22label%22:%22HWT%20Artz%22,%22value%22:true}]},%22textBox%22:{%22id%22:%22project%22,%22label%22:%22URL%20of%20Project%20Page%22,%22value%22:%22https://www.kickstarter.com/projects/597507018/pebble-time-awesome-smartwatch-no-compromises%22}}}">Try This</a>' ).appendTo('#formSelector');
    } else {
        var sRaw = decodeURIComponent(input);
        var obj = jQuery.parseJSON(sRaw);

        $.each(obj, function( index, value ) {
            if (index == "form") {
                $.each(value, function( index, value ) {
                    if (index == "textBox") {
                        console.log(value.label);
                        $('<div class="websiteURL"><label for=' + value.id + '>' + value.label + '</label><input type="url" id=' + value.id + ' class="form-control" value=' + value.value +' placeholder="Enter full URL"/></div>').appendTo('#formSelector');

                    } else if (index == "radioGroup") {
                        $('<h4><strong>'+ value.label +'</strong></h4>').appendTo('#formSelector')
                        // Iterates through all of the elements in the radio group
                        console.log(value.elements.length);
                        var totalRadio = value.elements.length;
                        for ( var i = 0; i < totalRadio; i++) {
                            console.log(value.elements[i].label); 
                            // Ugly quick way to put the elements into the old div structure I was using
                            $('<div class="row" style="padding-bottom: 10px"><div class="col-xs-6 noMargin"><h4 class="noMargin">'+ value.elements[i].label +'</h4></div><div class="col-xs-6"><input type="radio" data-on-color="primary" name="radio-choice" id=' + value.elements[i].id + '></div>' ).appendTo('#formSelector');
                            $("#"+value.elements[i].id).prop("checked",value.elements[i].value);
                        }
                    }
                });
            }
        });
    }
});

function saveOptions(configuration) {
    // console.log(JSON.stringify(configuration));
    // var options = {}


    $('[type="url"]').each(function(){
        var div = this;
        $.each(configuration.form, function( index, value ) {
            if (index == "textBox") {
                if (value.id == $(div).attr('id')) {
                    value.value = $(div).val();                  
                }
            }
        });
    });
    $('[type="radio"]').each(function(){
        var div = this;
        $.each(configuration.form, function( index, value ) {
            if (index == "radioGroup") {
                var totalRadio = value.elements.length;
                // console.log(totalRadio);
                for ( var i = 0; i < totalRadio; i++) {
                    // console.log(value.elements[i].label);
                    if (value.elements[i].id == $(div).attr('id')) {
                        // console.log(value.elements[i].value + " becomes: ");
                        value.elements[i].value = $(div).is(':checked');
                        // console.log(value.elements[i].value);
                    }
                }
            }
        });
    });
    return configuration;
};
