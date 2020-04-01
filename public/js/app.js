//Check if a service worker is supported by the browser
// if('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('./sw.js')
//         .then(()=> console.log("Service worker registered successful!"))
//         .catch(function(error) {
//             console.log("Service worker was not able to be registered with error: " + error.message);
//         });
// }

// This sections contains all of the page switches
function removeAppChildren() {
    let app = document.getElementById("app");
    while(app.firstChild){
        app.removeChild(app.lastChild);
    }
}
function loadMenu() {
    removeAppChildren();
    //Replacing the view with the menu view
    let menuBlock = document.createElement("div");
    let nameBlock = document.createElement("div");
    menuBlock.classList.add("menu");
    nameBlock.id = "menu-user";
    let bluetooth = document.createElement("button");
    let viewData = document.createElement("button");
    let userSettings = document.createElement("button");
    let signoutButton = document.createElement("button");

    bluetooth.classList.add("btn", "btn-secondary", "btn-lg", "btn-space");
    bluetooth.onclick = loadBluetooth;
    bluetooth.textContent = "Bluetooth";

    viewData.classList.add("btn", "btn-secondary", "btn-lg", "btn-space");
    viewData.textContent = "View / Record Data";

    userSettings.classList.add("btn", "btn-secondary", "btn-lg", "btn-space");
    userSettings.textContent = "User Settings";

    signoutButton.classList.add("btn", "btn-secondary", "btn-lg", "btn-space");
    signoutButton.textContent = "Sign Out";
    signoutButton.id = "menu-signout";
    signoutButton.onclick = signout;

    menuBlock.appendChild(nameBlock);
    menuBlock.appendChild(bluetooth);
    menuBlock.appendChild(viewData);
    menuBlock.appendChild(userSettings);
    menuBlock.appendChild(signoutButton);

    document.getElementById("app").appendChild(menuBlock);
    // Changing the style of the menu
    document.getElementById('app-style').href='css/menu.css';

    // Grabbing name / local data needs to be changed to firebase implementation
    try {
        document.getElementById("menu-user").innerHTML = "Welcome " + getUserInfo()["name"];
    } catch (e) {
        document.getElementById("menu-user").innerHTML = e.message;
    }
}
function loadLogin(){
    removeAppChildren();
    let loginBlock = document.createElement("div");
    let signBlock = document.createElement("div");

    loginBlock.classList.add("login");
    loginBlock.textContent = "Log In";
    signBlock.classList.add("signup");
    signBlock.textContent = "Sign Up";

    let loginForm = document.createElement("div");
    let emailLogin = document.createElement("input");
    emailLogin.type = "text";
    emailLogin.onkeydown = hideLoginError;
    emailLogin.placeholder = "Email";
    emailLogin.classList.add("input");
    emailLogin.id = "login-email";
    let passLogin = document.createElement("input");
    passLogin.type = "password";
    passLogin.onkeydown = hideLoginError;
    passLogin.placeholder = "Password";
    passLogin.classList.add("input");
    passLogin.id = "login-pass";
    let loginButton = document.createElement("div");
    loginButton.textContent = "Log In";
    loginButton.classList.add("btn");
    loginButton.onclick = login;
    let googleButton = document.createElement("a");
    googleButton.id = "google-button";
    googleButton.classList.add("btn", "btn-block", "btn-social", "btn-google");
    googleButton.onclick = googleSignIn;   
    let googleIcon = document.createElement("i");
    googleIcon.classList.add("fa", "fa-google");
    googleIcon.textContent = "Sign in with Google";
    googleButton.appendChild(googleIcon);
    let loaderIcon = document.createElement("div");
    loaderIcon.classList.add("loader");
    let loginError = document.createElement("div");
    loginError.id = "login_error";
    let forgotPass = document.createElement("div");
    forgotPass.id = "forgot_pass";
    forgotPass.textContent = "Forgot Username or Password";

    loginForm.appendChild(emailLogin);
    loginForm.appendChild(passLogin);
    loginForm.appendChild(loginButton);
    loginForm.appendChild(googleButton);
    loginForm.appendChild(loaderIcon);
    loginForm.appendChild(loginError);
    loginForm.appendChild(forgotPass);

    let signupForm = document.createElement("div");
    let emailSign = document.createElement("input");
    emailSign.type = "text";
    emailSign.onkeydown = emailSignOnChange;
    emailSign.placeholder = "Your Email Address";
    emailSign.classList.add("input");
    emailSign.id = "signup-email";
    let userSign = document.createElement("input");
    userSign.type = "text";
    userSign.classList.add("input");
    userSign.placeholder = "Your Full Name";
    userSign.id = "signup-user";
    let passSign = document.createElement("input");
    passSign.type = "password";
    passSign.onkeydown = passSignOnChange;
    passSign.placeholder = "Choose a Password";
    passSign.classList.add("input");
    passSign.id = "signup-pass";
    let passTip = document.createElement("div");
    passTip.id = "pass_tip";
    passTip.textContent = "A valid password is at least 8 characters in length!";
    let signButton = document.createElement("div");
    signButton.textContent = "Create Account";
    signButton.classList.add("btn");
    signButton.onclick = signup;
    let passError = document.createElement("div");
    passError.id = "pass_error";

    signupForm.appendChild(emailSign);
    signupForm.appendChild(userSign);
    signupForm.appendChild(passSign);
    signupForm.appendChild(passTip);
    signupForm.appendChild(signButton);
    signupForm.appendChild(passError);
    signupForm.appendChild(loaderIcon);
    
    
    let appWarning = document.createElement("div");
    appWarning.id = "app-warning";

    let initialPageBlock = document.createElement("div");
    initialPageBlock.appendChild(loginBlock);
    initialPageBlock.appendChild(signBlock);
    initialPageBlock.appendChild(loginForm);
    initialPageBlock.appendChild(signupForm);
    initialPageBlock.appendChild(appWarning);
    document.getElementById("app").appendChild(initialPageBlock);
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

    // Changing the style of the menu
    document.getElementById('app-style').href='css/login.css';
}
function loadBluetooth() {
    let block = "    <div id=\"bluetooth-scan\">\n" +
        "        <div id=\"bluetooth-header\">Bluetooth</div>" +
        "        <button type=\"button\" class=\"btn btn-secondary btn-lg\" id=\"bluetooth-scan\" onclick=\"scanDevices()\">Scan for Devices</button><br>" +
        "        <button type=\"button\" class=\"btn btn-secondary btn-lg\" id=\"bluetooth-scan\" onclick=\"disconnect()\">Disconnect from Device</button><br>" +
        "        <button type=\"button\" class=\"btn btn-secondary btn-lg\" id=\"bluetooth-return\" onclick=\"loadMenu()\">Back to Menu</button>\n" +
        "    </div>";
    document.getElementById("app").innerHTML = block;
    // Changing the style of the menu
    document.getElementById('app-style').href='css/bluetooth.css';
}