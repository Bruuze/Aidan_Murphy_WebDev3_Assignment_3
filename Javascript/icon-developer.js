var drawing = [];
var currentPath = [];
var isDrawing = false;
var saveName = document.getElementById('imageName');
var colourPicker = document.getElementById('html5colorpicker')
//var range = document.getElementById()
var theUid = localStorage.getItem("uid");

function setup() {
    canvas = createCanvas(200, 200);


    canvas.mousePressed(startPath);
    canvas.parent('canvascontainer');
    canvas.mouseReleased(endPath);

    var saveButton = select('#saveButton');
    saveButton.mousePressed(saveDrawing);

    var clearButton = select('#clearButton');
    clearButton.mousePressed(clearDrawing);


    var ref = database.ref('users/' + theUid + '/icons');
    console.log(ref);
    ref.on('value', gotData, errData);
}

function startPath() {
    isDrawing = true;
    currentPath = [];
    drawing.push(currentPath);
}

function endPath() {
    isDrawing = false;
}

function draw() {
    background('rgba(0,255,0, 0)');

    if (isDrawing) {
        var point = {
            x: mouseX,
            y: mouseY
        }
        currentPath.push(point);
    }

    stroke(colourPicker.value);
    strokeWeight(4);
    noFill();
    for (var i = 0; i < drawing.length; i++) {
        var path = drawing[i];
        beginShape();
        for (var j = 0; j < path.length; j++) {
            vertex(path[j].x, path[j].y)
        }
        endShape();
    }


}


function saveDrawing() {
    //var ref = database.ref('users/' + theUid + '/drawings');
    var imageName = saveName.value;
    //var data = {
    //    name: imageName,
    //    drawing: drawing
   // }
    if (imageName !== ""){
    firebase.database().ref('users/' + theUid + '/icons/' + imageName ).set({
        drawing: drawing
    });}
    else
    {

        alert("Fill in text box to save!");

    }

    //var result = ref.push(data, dataSent);
   // console.log(result.key);

    //function dataSent(err, status) {
   //     console.log(status);
    //}
}

function gotData(data) {

    // clear the listing
    var elts = selectAll('.listing');
    for (var i = 0; i < elts.length; i++) {
        elts[i].remove();
    }

    var drawings = data.val();
    console.log(drawings);
    var keys = Object.keys(drawings);
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        //console.log(key);
        var li = createElement('li', '');
        li.class('listing');
        var ahref = createA('javascript:void(0)', key);
        ahref.mousePressed(showDrawing);
        ahref.parent(li);

        li.parent('drawinglist');
    }
}

function errData(err) {
    console.log(err);
}

function showDrawing(key) {
    //console.log(arguments);
    clear();
    if (key instanceof MouseEvent) {
        key = this.html();
    }

    var ref = database.ref('users/' + theUid + '/icons/' + key);
    ref.once('value', oneDrawing, errData);

    function oneDrawing(data) {
        var dbdrawing = data.val();
        drawing = dbdrawing.drawing;
        //console.log(drawing);
    }

}


function clearDrawing() {
    drawing = [];
    clear();
}

$('#saveImage').click(function () {

    var c = canvas;
    saveCanvas(c, 'Icon', 'png');

});

firebase.auth().onAuthStateChanged(firebaseUser => {

    if(firebaseUser){

        $('#userSaveOptions').css('display', 'block');
        $('.col-sm-9').removeClass().addClass("col-sm-6");
        $('#savedOptions').css('display', 'block');

        var userIdSwap = firebase.auth().currentUser.uid;
        var ref = database.ref('users/' + userIdSwap + '/icons');
        ref.on('value', gotData, errData);
    }
    else{

        $('#userSaveOptions').css('display', 'none');
        $('.body .col-sm-6').removeClass().addClass("col-sm-9");
        $('#savedOptions').css('display', 'none');

}

});