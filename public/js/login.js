$(".signup-form").hide();
$(".loader").hide();
$(".signup").css("background", "none");
$("#pass_tip").hide();
$("#pass_error").hide();
$("#login_error").hide();

$(".login").click(function(){
    $(".signup-form").hide();
    $(".login-form").show();
    $(".signup").css("background", "none");
    $(".login").css("background", "#fff");
});

$(".signup").click(function(){
    $(".signup-form").show();
    $(".login-form").hide();
    $(".login").css("background", "none");
    $(".signup").css("background", "#fff");
});

$(".btn").click(function(){
    $(".input").val("");
});

let user = firebase.auth().currentUser;
if(user) {
    loadLogin();
} else {
    console.log("No local user detected. Please login!");
}
function hideLoginError() {
    $("#login_error").hide();
}
function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function passIsValid (password) {
    return password.length >= 8
}

function emailSignOnChange() {
    let emailSign = document.getElementById("signup-email");
    let email = emailSign.value;
    $("#pass_error").hide();
    if(emailIsValid(email)){
        emailSign.style.color = "black";
    } else {
        emailSign.style.color = "#dc3545";
    }
}
function passSignOnChange() {
    let passSign = document.getElementById("signup-pass");
    let password = passSign.value;
    $("#pass_error").hide();
    if(passIsValid(password)) {
        $("#pass_tip").hide();
    } else {
        $("#pass_tip").show();
    }
}