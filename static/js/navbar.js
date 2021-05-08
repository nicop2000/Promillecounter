function toggleMenu() {
    if ($('#menu').is(':hidden')) {
        $('#menu').show(200);
    } else {
        $('#menu').hide(200);
    }
}

let nav = document.createElement("nav");
nav.className = "navbar navbar-dark bg-dark"
let button = document.createElement("button");
button.type = "button";
button.onclick = toggleMenu
button.className = "navbar-toggler"
button.innerHTML = '<span class="navbar-toggler-icon"></span>'
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

let about = document.createElement("li");
about.innerHTML = '<a href="/about" id="about" class="nav-link"">Weiteres</a>';
about.className = "nav-item"


ul.appendChild(home);
ul.appendChild(login);
ul.appendChild(register);
ul.appendChild(account);
ul.appendChild(about);
nav.append(button)
nav.appendChild(ul);

document.getElementsByTagName("header")[0].append(nav);


