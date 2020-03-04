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
console.log("Firebase has successfully loaded");

// This sections contains all of the page switches
function splashscreen() {
    window.location.replace("./pages/menu.html");
}
function signscreen() {
    window.location.replace("../index.html");
}

// This section contains all of the queries
/**
 * This Function returns a JSON object for user data
 * The User data that is currently available is : email,
 * @returns {{email}}
 */
function getUserInfo() {
    let user = firebase.auth().currentUser;
    if (user != null) {
        return {"email": user.email, "name": user.displayName};
    } else {
        return {"email": "error loading user", "name": "error loading user"};
    }
}

function signIn(email, password){
    console.log("Attempting to sign in");
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            localStorage.setItem("user", JSON.stringify(getUserInfo()));
            splashscreen();
        })
        .catch(function (error) {
            $(".btn").show();
            $(".loader").hide();
            document.getElementById("login_error").innerHTML = error.message;
            $("#login_error").show();
        });
}

function login() {
    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-pass").value;
    if(!emailIsValid(email)){
        document.getElementById("login_error").innerHTML = "Email field is invalid!"
        $("#login_error").show();
    } else {
        $(".btn").hide();
        $(".loader").show();
        signIn(email, password);
    }
}

function signup() {
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-pass").value;
    let name = document.getElementById("signup-user").value;
    if(!emailIsValid(email)){
        document.getElementById("pass_error").innerHTML = "Email field is invalid!"
        $("#pass_error").show();
    } else if(name.length <= 0) {
        document.getElementById("pass_error").innerHTML = "Name field is empty!"
        $("#pass_error").show();
    } else if(!passIsValid(password)) {
        document.getElementById("pass_error").innerHTML = "Password field is invalid!"
        $("#pass_error").show();
    } else {
        $(".btn").hide();
        $(".loader").show();
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                firebase.auth().currentUser.updateProfile({
                    displayName: name,
                }).then(function() {
                    signIn(email, password);
                }).catch(function(error) {
                    signIn(email, password);
                });
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
        localStorage.clear();
        signscreen();
        console.log("User has signed out successfully");
    }).catch(function(error) {
        localStorage.clear();
        signscreen();
        console.log(error.message + " with error code : " + error.code);
    });
}