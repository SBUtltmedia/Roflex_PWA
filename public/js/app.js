//Check if a service worker is supported by the browser
if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(()=> console.log("Service worker registered successful!"))
        .catch(function(error) {
            console.log("Service worker was not able to be registered with error: " + error.message);
        });
}

// This sections contains all of the page switches
function loadMenu() {
    //Replacing the view with the menu view
    let block = "    <div class=\"menu\">\n" +
        "        <div id=\"menu-user\"></div>\n" +
        "        <button type=\"button\" class=\"btn btn-secondary btn-lg btn-space\" onclick='loadBluetooth()'>Bluetooth</button>\n" +
        "        <button type=\"button\" class=\"btn btn-secondary btn-lg btn-space\">View / Record Data</button>\n" +
        "        <button type=\"button\" class=\"btn btn-secondary btn-lg btn-space\">User Settings</button>\n" +
        "        <button type=\"button\" class=\"btn btn-secondary btn-lg btn-space\" id=\"menu-signout\" onclick=\"signout()\">Sign Out</button>\n" +
        "    </div>";
    document.getElementById("app").innerHTML = block;
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
    // Change the sign in page
    let block =
        "        <div class=\"login\">Log In</div>\n" +
        "        <div class=\"signup\">Sign Up</div>\n" +
        "\n" +
        "        <div class=\"login-form\">\n" +
        "          <input type=\"text\" onkeydown=\"hideLoginError()\" placeholder=\"Email\" class=\"input\" id=\"login-email\"><br />\n" +
        "          <input type=\"password\" onkeydown=\"hideLoginError()\" placeholder=\"Password\" class=\"input\" id=\"login-pass\"><br />\n" +
        "          <div class=\"btn\" onclick=\"login()\">Log In</div>\n" +
        "          <div class=\"loader\"></div>\n" +
        "          <div id=\"login_error\"></div>\n" +
        "          <div id=\"forgot_pass\"><span ><a href=\"#\">Forgot Username or Password</a></span> </div>\n" +
        "        </div>\n" +
        "        <div class=\"signup-form\">\n" +
        "          <input type=\"text\" onkeydown=\"emailSignOnChange()\" placeholder=\"Your Email Address\" class=\"input\" id=\"signup-email\"><br />\n" +
        "          <input type=\"text\" placeholder=\"Your Full Name\" class=\"input\" id=\"signup-user\"><br />\n" +
        "          <input type=\"password\" onkeydown=\"passSignOnChange()\" placeholder=\"Choose a Password\" class=\"input\" id=\"signup-pass\"><br />\n" +
        "          <div id=\"pass_tip\">A valid password is at least 8 characters in length!</div>\n" +
        "          <div class=\"btn\" onclick=\"signup()\">Create Account</div>\n" +
        "          <div id=\"pass_error\"></div>\n" +
        "          <div class=\"loader\"></div>\n" +
        "        </div>";
    document.getElementById("app").innerHTML = block;
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
        "        <div id=\"bluetooth-header\"> Bluetooth - Scan for Devices</div>\n" +
        "        <table class=\"table\">\n" +
        "            <thead class=\"thead-dark\">\n" +
        "            <tr>\n" +
        "                <th scope=\"col\">#</th>\n" +
        "                <th scope=\"col\">Profile</th>\n" +
        "                <th scope=\"col\"></th>\n" +
        "            </tr>\n" +
        "            </thead>\n" +
        "            <tbody>\n" +
        "            <tr>\n" +
        "                <th scope=\"row\">1</th>\n" +
        "                <td>Mark</td>\n" +
        "                <td>Otto</td>\n" +
        "            </tr>\n" +
        "            </tbody>\n" +
        "        </table>\n" +
        "        <button type=\"button\" class=\"btn btn-secondary btn-lg\" id=\"bluetooth-return\" onclick=\"loadMenu()\">Back to Menu</button>\n" +
        "    </div>";
    document.getElementById("app").innerHTML = block;
    // Changing the style of the menu
    document.getElementById('app-style').href='css/bluetooth.css';
}