var database = firebase.database();
var userRef = database.ref('users');
var snapshot = firebase.database.DataSnapshot;
var userId;
var username;

//Btns
const loginHeader = document.getElementById('login');
const loginBackground = document.getElementById('exit-login');
const switchArrow = document.getElementById('switch-arrow');
var loginBoolean = new Boolean(true);
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');

const txtNameReg = document.getElementById('txtName');
const txtEmailReg = document.getElementById('txtEmail2');
const txtPasswordReg = document.getElementById('txtPassword2');

const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');
const welcome = document.getElementById('welcomeUser');


loginHeader.addEventListener('click', e => {

    $('#login-space').css("display", "flex");

});

loginBackground.addEventListener('click', e => {

    $('#login-space').css("display", "none");

});

switchArrow.addEventListener('click', e => {

    console.log("wow");

    if(loginBoolean == true){

        loginBoolean = false;
        $('#login-card').css("display", "none");
        $('#register-card').css("display", "block");

    }
    else{
        loginBoolean = true;
        $('#register-card').css("display", "none");
        $('#login-card').css("display", "block");
    }

});

//User, Login and Register
btnLogin.addEventListener('click', e => {

    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));

});

btnSignUp.addEventListener('click', e => {

    const email = txtEmailReg.value;
    const pass = txtPasswordReg.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email,pass);
    promise.catch(e => console.log(e.message));


});

btnLogout.addEventListener('click', e => {

    firebase.auth().signOut();

});

function writeUserData(userId, name, email, imageUrl) {
    firebase.database().ref('users/' + userId + '/details').set({
        username: name,
        email: email,
        profile_picture : imageUrl
    });
}

firebase.auth().onAuthStateChanged(firebaseUser => {

    if(firebaseUser){

        userRef.once("value")
            .then(function(snapshot) {

                if (snapshot.hasChild(userId)) {
                    console.log('exists');
                }
                else {
                    const name = txtNameReg.value;
                    const email = txtEmailReg.value;
                    writeUserData(userId,name,email,'something');
                }

            });

    }

});


firebase.auth().onAuthStateChanged(firebaseUser => {

    if(firebaseUser){

        userId = firebase.auth().currentUser.uid;
        console.log(firebaseUser);
        $('#login').css("display", "none");
        $('#btnLogout').css("display", "inline");
        if (typeof(Storage) !== "undefined") {
            // Store
            localStorage.setItem("uid", userId);
        }
        return firebase.database().ref('/users/' + userId + "/details").once('value').then(function(snapshot) {
            username = (snapshot.val() && snapshot.val().username);
            localStorage.setItem("username", username);
            welcome.innerHTML = username;
        });
    }
    else{
        $('#login').css("display", "inline");
        $('#btnLogout').css("display", "none");
        console.log('not logged in');
        userId = null;
        username = null;
        localStorage.setItem("uid", userId);
        localStorage.setItem("username", username);
        welcome.innerHTML = username;

}

});

