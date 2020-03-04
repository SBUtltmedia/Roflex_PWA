try{
    document.getElementById("menu-user").innerHTML = "Welcome " + JSON.parse(localStorage.getItem('user'))['name'];
} catch (e) {
    document.getElementById("menu-user").innerHTML = e.message;
}