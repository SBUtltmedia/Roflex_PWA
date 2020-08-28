// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyDQdQmLlxQlGbTKOPq8ZrjJyIwz7F7n3IY",
//     authDomain: "roflex-d529d.firebaseapp.com",
//     databaseURL: "https://roflex-d529d.firebaseio.com",
//     projectId: "roflex-d529d",
//     storageBucket: "roflex-d529d.appspot.com",
//     messagingSenderId: "184821631971",
//     appId: "1:184821631971:web:ea0f73ce7b2459dbde6ed6",
//     measurementId: "G-7E8DF98YB1"
// };
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyATYwBxXaLvg135M397c1txQ0oh2V2j8wA",
    authDomain: "roflexpwa.firebaseapp.com",
    databaseURL: "https://roflexpwa.firebaseio.com",
    projectId: "roflexpwa",
    storageBucket: "roflexpwa.appspot.com",
    messagingSenderId: "111760921764",
    appId: "1:111760921764:web:519054b8f348d7387b4231",
    measurementId: "G-W7XDL51KHG"
  };
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
db.enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            alert("More than 1 tab is open for this app. Only one of the apps can be accessed offline at a time!");
        } else if (err.code == 'unimplemented') {
            document.getElementById("app-warning").innerHTML = "The browser that you are using does not support offline";
        }
    });

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        loadMenu();
    }
});
/**
 * This function returns a JSON Object for adding a user to the "users" collection
 * @param {*} email The email of the user. Cannot be a duplicate of an email already in use.
 */
function generateUser(email, name){
    return {
        email: email,
        birthdate : firebase.firestore.Timestamp.fromDate(Date.parse('01 Jan 1970 00:00:00 GMT')), //Needs to be implemented
        creationDate : firebase.firestore.Timestamp.now(),
        firstName: name,
        lastName : "Null", // Needs to be implemented with field
        gender: "Female" // Needs to be implemented with field`
    };   
}
console.log("Firebase has successfully loaded");

// This section contains all of the queries
/**
 * This Function returns a JSON object for user data
 * The User data that is currently available is : email,
 * @returns {{email, name}}
 */
function getUserInfo() {
    let user = firebase.auth().currentUser;
    if (user != null) {
        return {email: user.email, name: user.displayName};
    } else {
        return {email: "error loading user", name: "error loading user"};
    }
}

function signIn(email, password){
    console.log("Attempting to sign in");
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    console.log("Attempting to load menu");
                    loadMenu();
                })
                .catch(function (error) {
                    $(".btn").show();
                    $(".loader").hide();
                    document.getElementById("login_error").innerHTML = error.message;
                    $("#login_error").show();
                });
        })
        .catch(function(error) {
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
        console.log("User signup sucessful!");
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log("Attempting to register user into DB");
                db.collection("user").add(generateUser(email, name)).then(function(docRef){
                    console.log("Added User info for " + email + " successfully with ID : " + docRef.id);
                }).catch(function(err){
                    console.log(err.message);
                });
                firebase.auth().currentUser.updateProfile({
                    displayName: name,
                }).then(function() {
                    console.log("Updated user display name successfully!");
                    signIn(email, password);
                }).catch(function(error) {
                    console.log(error.message);
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
    console.log("Attempting to signout");
    firebase.auth().signOut().then(function() {
        loadLogin();
        console.log("User has signed out successfully");
    }).catch(function(error) {
        loadLogin();
        console.log(error.message + " with error code : " + error.code);
    });
}
function googleSignIn(){
    $(".btn").hide();
    $(".loader").show();
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let token = result.credential.accessToken;
        // The signed-in user info.
        let user = result.user;
        // Not using all of the fields above yet
        loadMenu();
    }).catch(function(error) {
        $(".btn").show();
        $(".loader").hide();
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        // The email of the user's account used.
        let email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        let credential = error.credential;
        // Not using all of the fields yet
        document.getElementById("pass_error").innerHTML = errorMessage;
        $("#pass_error").show();
    });
}