// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDQdQmLlxQlGbTKOPq8ZrjJyIwz7F7n3IY",
    authDomain: "roflex-d529d.firebaseapp.com",
    databaseURL: "https://roflex-d529d.firebaseio.com",
    projectId: "roflex-d529d",
    storageBucket: "roflex-d529d.appspot.com",
    messagingSenderId: "184821631971",
    appId: "1:184821631971:web:ea0f73ce7b2459dbde6ed6",
    measurementId: "G-7E8DF98YB1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function login() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-pass").value;
    if(!emailIsValid(email)){
        document.getElementById("login_error").innerHTML = "Email field is invalid!"
        $("#login_error").show();
    } else {
        $(".btn").hide();
        $(".loader").show();
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function () {
                return firebase.auth().signInWithEmailAndPassword(email, password)
                    .then(() => {
                        splashscreen();
                    })
                    .catch(function (error) {
                        $(".btn").show();
                        $(".loader").hide();
                        document.getElementById("login_error").innerHTML = error.message;
                        $("#login_error").show();
                    });
            })
            .catch(function (error) {
                $(".btn").show();
                $(".loader").hide();
                document.getElementById("login_error").innerHTML = error.message;
                $("#login_error").show();
            });
    }
}
function signup() {
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-pass").value;
    if(!emailIsValid(email)){
        document.getElementById("pass_error").innerHTML = "Email field is invalid!"
        $("#pass_error").show();
    } else if(!passIsValid(password)) {
        document.getElementById("pass_error").innerHTML = "Password field is invalid!"
        $("#pass_error").show();
        alert("Please enter a valid password!");
    } else {
        $(".btn").hide();
        $(".loader").show();
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                splashscreen();
            })
            .catch(function (error) {
                $(".btn").show();
                $(".loader").hide();
                document.getElementById("pass_error").innerHTML = error.message;
                $("#pass_error").show();
            });
    }
}
function signout() {
    firebase.auth().signOut().then(function() {
        signscreen();
    }).catch(function(error) {
        console.log(error.message + " with error code : " + error.code);
    });
}