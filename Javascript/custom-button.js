var theUid = localStorage.getItem("uid");
var saveName = document.getElementById('saveName')
var theSaveButton = document.getElementById('saveButton')
var inlineCss = "";
var cssArray = new Array();
//Main Options
cssArray['buttonPadding'] = "10.5px 21px";
cssArray['buttonFontSize'] = "16px";
cssArray['buttonBorderThickness'] = "2px solid black";
cssArray['buttonRoundness'] = "0px";
cssArray['buttonTransition'] = "0s";

//Normal Options
cssArray['textColour'] = "#000000";
cssArray['borderColour'] = '#000000';
cssArray['backgroundColour'] = '#FFFFFF';

cssArray['textColourHover'] = "#818181;";
cssArray['borderColourHover'] = '#000000';
cssArray['backgroundColourHover'] = '#FFFFFF';

cssArray['textColourActive'] = "#000000";
cssArray['borderColourActive'] = '#000000';
cssArray['backgroundColourActive'] = '#FFFFFF';

function updateCss() {

    inlineCss = ".tooltip-button {";
    inlineCss += "cursor: pointer;";
    inlineCss += "padding:" + cssArray['buttonPadding']+ ";";
    inlineCss += "font-size:" + cssArray['buttonFontSize']+ ";";
    inlineCss += "border:" + cssArray['buttonBorderThickness']+ ";";
    inlineCss += "border-radius:" + cssArray['buttonRoundness']+ ";";
    inlineCss += "transition:" + cssArray['buttonTransition']+ ";";

    inlineCss += "color:" + cssArray['textColour']+ ";";
    inlineCss += "background-color:" + cssArray['backgroundColour']+ ";}";

    inlineCss += ".tooltip-button:hover {";
    inlineCss += "text-decoration:none;";
    inlineCss += "color:" + cssArray['textColourHover']+ ";";
    inlineCss += "border-color:" + cssArray['borderColourHover']+ ";";
    inlineCss += "background-color:" + cssArray['backgroundColourHover']+ ";}";

    inlineCss += ".tooltip-button:active {";
    inlineCss += "color:" + cssArray['textColourActive']+ ";";
    inlineCss += "border-color:" + cssArray['borderColourActive']+ ";";
    inlineCss += "background-color:" + cssArray['backgroundColourActive']+ ";}";



    $("#inline-css").replaceWith("<style id='inline-css'>" + inlineCss + "</style>");
    var inlineCss2 = inlineCss;
    inlineCss2 = inlineCss2.replace(/;/g,";<br />&nbsp;&nbsp;").replace(/{/g,"{<br />&nbsp;&nbsp;").replace(/}/g,"&nbsp;}<br />");

    $("#the-css").html(inlineCss2);
}





$("#buttonText").on("input change", function() {
    $(".tooltip-button").html($('#buttonText').val());
    var htmlText = "&lt;a href='javascript:void(0)' class='button'&gt;" + $('#buttonText').val() + "&lt;/a&gt;";
    $("#the-html").html(htmlText);
    updateCss();
});

$("#paddingRange").on("input change", function() {
    cssArray['buttonPadding'] = $("#paddingRange").val() + "px " + ($("#paddingRange").val() * 2.4) + "px";
    updateCss();
});

$("#fontRange").on("input change", function() {
    cssArray['buttonFontSize'] = $("#fontRange").val() + "px";
    updateCss();
});

$("#borderThicknessRange").on("input change", function() {
    cssArray['buttonBorderThickness'] = $("#borderThicknessRange").val() + "px solid" + $("#borderColor").val();
    updateCss();
});

$("#roundnessRange").on("input change", function() {
    cssArray['buttonRoundness'] = $("#roundnessRange").val() + "px";
    updateCss();
});

$("#transitionSpeedText").on("input change", function() {
    cssArray['buttonTransition'] = $("#transitionSpeedText").val() + "s";
    updateCss();
});

$("#textColor").on("input change", function() {
    cssArray['textColour'] = $("#textColor").val();
    updateCss();
});

$("#borderColor").on("input change", function() {
    cssArray['buttonBorderThickness'] = $("#borderThicknessRange").val() + "px solid" + $("#borderColor").val();
    updateCss();
});

$("#backgroundColor").on("input change", function() {
    cssArray['backgroundColour'] = $("#backgroundColor").val();
    updateCss();
});

$("#textColorHover").on("input change", function() {
    cssArray['textColourHover'] = $("#textColorHover").val();
    updateCss();
});

$("#borderColorHover").on("input change", function() {
    cssArray['borderColourHover'] = $("#borderColorHover").val();
    updateCss();
});

$("#backgroundColorHover").on("input change", function() {
    cssArray['backgroundColourHover'] = $("#backgroundColorHover").val();
    updateCss();
});

$("#textColorActive").on("input change", function() {
    cssArray['textColourActive'] = $("#textColorActive").val();
    updateCss();
});

$("#borderColorActive").on("input change", function() {
    cssArray['borderColourActive'] = $("#borderColorActive").val();
    updateCss();
});

$("#backgroundColorActive").on("input change", function() {
    cssArray['backgroundColourActive'] = $("#backgroundColorActive").val();
    updateCss();
});



$(function () {

    updateCss();
    var htmlText = "&lt;a href='javascript:void(0)' class='button'&gt;" + $('#buttonText').val() + "&lt;/a&gt;";
    $("#the-html").html(htmlText);

    var ref = database.ref('users/' + theUid + '/buttons');
    ref.on('value', gotData);

});

theSaveButton.addEventListener('click', e => {

    saveButton();

});

function saveButton() {
    var buttonName = saveName.value;
    if (buttonName !== ""){
        console.log(inlineCss);
        firebase.database().ref('users/' + theUid + '/buttons/' + buttonName).set({
            inlineCss: inlineCss
        });}
    else
    {
        alert("Fill in text box to save!");
    }

}

function gotData(data) {

    // clear the listing
    var elts = $('.listing');
    for (var i = 0; i < elts.length; i++) {
        elts[i].remove();
    }

    var buttons = data.val();
    var keys = Object.keys(buttons);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var li = document.createElement("LI");
        $(li).addClass('listing')
        var ahref = document.createElement('a');
        ahref.setAttribute('href', 'javascript:void(0)');
        ahref.innerHTML = key;

        ahref.addEventListener('click', e => {

            key = e.target.innerHTML;
            showDrawing(key);

        });

        $(li).append(ahref);

        $('#buttonlist').append(li);
    }
}

function showDrawing(key) {

    var ref = database.ref('users/' + theUid + '/buttons/' + key);
    ref.once('value', oneDrawing);

    function oneDrawing(data) {
        var dbbutton = data.val();
        inlineCss = dbbutton.inlineCss;
        updateCssDirectly();
    }

}

function updateCssDirectly() {

    $("#inline-css").replaceWith("<style id='inline-css'>" + inlineCss + "</style>");
    var inlineCss2 = inlineCss;
    inlineCss2 = inlineCss2.replace(/;/g,";<br />&nbsp;&nbsp;").replace(/{/g,"{<br />&nbsp;&nbsp;").replace(/}/g,"&nbsp;}<br />");

    $("#the-css").html(inlineCss2);

}