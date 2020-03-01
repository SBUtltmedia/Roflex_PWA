// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGpmOJvCRxU8DMTaSsDgZt8NrdpKnLSoI",
    authDomain: "campabilities-pwa.firebaseapp.com",
    databaseURL: "https://campabilities-pwa.firebaseio.com",
    projectId: "campabilities-pwa",
    storageBucket: "campabilities-pwa.appspot.com",
    messagingSenderId: "920688985025",
    appId: "1:920688985025:web:2d9258ebfd4b63ed9fa540",
    measurementId: "G-QWK71H69BX"
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