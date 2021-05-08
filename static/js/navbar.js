//const auth = require('./authenticateAsUser')

const auth = require("../helpers/authenticateAsUser");

function toggleMenu() {
    if ($('#menu').is(':hidden')) {
        $('#menu').show();
    } else {
        $('#menu').hide();
    }
}

let nav = document.createElement("nav");
nav.className = "navbar navbar-dark bg-dark"
let button = document.createElement("button");
button.type = "button";
button.onclick = toggleMenu
button.className = "navbar-toggler"
button.innerHTML = '<span class="navbar-toggler-icon"></span>'
button.setAttribute("style", "margin-left: 10px;")

let ul = document.createElement("ul");
ul.id = "menu";
ul.className = "nav nav-pills nav-fill"

let home = document.createElement("li");
home.innerHTML = '<a href="/" id="home" class="nav-link">Home</a>';
home.className = "nav-item"

let login = document.createElement("li");
login.innerHTML = '<a href="/login" id="login" class="nav-link">Login</a>';
login.className = "nav-item"

let register = document.createElement("li");
register.innerHTML = '<a href="/register" id="register" class="nav-link">Registrierung</a>';
register.className = "nav-item"

let account = document.createElement("li");
account.innerHTML = '<a href="/account" id="account" class="nav-link"">Mein Account</a>';
account.className = "nav-item"

let addWine = document.createElement("li");
addWine.innerHTML = '<a href="/add-wine" id="add-wine" class="nav-link"">Wein hinzufügen</a>';
addWine.className = "nav-item"

let about = document.createElement("li");
about.innerHTML = '<a href="/about" id="about" class="nav-link"">Weiteres</a>';
about.className = "nav-item"

let token = localStorage.getItem('token');

const userAuth = auth.verifyJWT(token)
//if(!userAuth.auth) {
    ul.appendChild(register);
    console.log('Not auth')
//} else {
    console.log('auth')
    ul.appendChild(login);
    ul.appendChild(account);
    ul.appendChild(addWine);
//}
console.log('next')
ul.appendChild(home);
ul.appendChild(about);
nav.append(button)
nav.appendChild(ul);

document.getElementsByTagName("header")[0].append(nav);


