function toggleMenu() {
    if ($('#mainNav').is(':hidden')) {
        $('#mainNav').show();
        // $('#mainNav').removeClass('overrideMenu');
        // $('#navButton').removeClass('navButton');

    } else {
        $('#mainNav').hide();
        // $('#mainNav').addClass('overrideMenu');
        // $('#navButton').addClass('navButton');

    }
}



let nav = document.createElement("nav");
nav.className = "navbar navbar-dark bg-dark"
nav.id = "mainNav"
let navForButton = document.createElement("nav");
navForButton.className = "navbar navbar-dark bg-dark"


let button = document.createElement("button");
button.type = "button";
button.onclick = toggleMenu
button.className = "navbar-toggler"
button.id = "navButton"
button.innerHTML = '<span class="navbar-toggler-icon"></span>'
button.setAttribute("style", "margin-left: 10px;")

navForButton.append(button)

let ul = document.createElement("ul");
ul.id = "menu";
ul.className = "nav flex-column"

let home = document.createElement("li");
home.innerHTML = '<a href="/" id="home" class="nav-link">Home</a>';
home.className = "nav-item"


// let register = document.createElement("li");
// register.innerHTML = '<a href="/register" id="register" class="nav-link">Registrierung</a>';
// register.className = "nav-item"
//
// let account = document.createElement("li");
// account.innerHTML = '<a href="/account" id="account" class="nav-link"">Mein Account</a>';
// account.className = "nav-item"




let about = document.createElement("li");
about.innerHTML = '<a href="/about" id="about" class="nav-link"">Weiteres</a>';
about.className = "nav-item"


let dropdown = document.createElement("li");
dropdown.className = "nav-item dropdown-menu-left";

let ddToggle = document.createElement('a');
ddToggle.className = "nav-link dropdown-toggle";
ddToggle.href = "#"
ddToggle.id = "accountDD"
ddToggle.setAttribute("data-toggle", "dropdown");
ddToggle.setAttribute("aria-haspopup", "true");
ddToggle.setAttribute("aria-expanded", "false");
ddToggle.innerHTML = "Account";


dropdown.append(ddToggle)
console.log(dropdown)


let dropDownMenuAccount = document.createElement('div');
dropDownMenuAccount.className = "dropdown-menu bg-info";
dropDownMenuAccount.setAttribute("aria-labelledby", "navbarDropdownMenuLink");

let login = document.createElement('a');
login.className = "dropdown-item";
login.id = "login";
login.href = "/login";
login.innerHTML = "Login"

let register = document.createElement('a');
register.className = "dropdown-item";
register.id = "register"
register.href = "/register";
register.innerHTML = "Registrieren"

let account = document.createElement('a');
account.className = "dropdown-item";
account.id = "account"
account.href = "/account";
account.innerHTML = "Mein Account"

let logout = document.createElement('a');
logout.innerHTML = '<form action="/api/user/logout" id="aLogout" method="post"/><button type="submit" id="logout-button" class="btn btn-link navbar-btn navbar-link">Log out</button>'
logout.className = "nav-item"


let dropdownWine = document.createElement("li");
dropdownWine.className = "nav-item dropdown-menu-left";

let ddToggleWine = document.createElement('a');
ddToggleWine.className = "nav-link dropdown-toggle";
ddToggleWine.href = "#"
ddToggleWine.id = "wineDD"
ddToggleWine.setAttribute("data-toggle", "dropdown");
ddToggleWine.setAttribute("aria-haspopup", "true");
ddToggleWine.setAttribute("aria-expanded", "false");
ddToggleWine.innerHTML = "Wein";

let addWine = document.createElement('a');
addWine.className = "dropdown-item";
addWine.id = "add-wine"
addWine.href = "/add-wine";
addWine.innerHTML = "Wein hinzufügen"

let showWine = document.createElement('a');
showWine.className = "dropdown-item";
showWine.id = "show-wine"
showWine.href = "/show-wine";
showWine.innerHTML = "Weine anzeigen"


dropdownWine.append(ddToggleWine)



let dropdownMenuWine = document.createElement('div');
dropdownMenuWine.className = "dropdown-menu bg-info";
dropdownMenuWine.setAttribute("aria-labelledby", "navbarDropdownMenuLink");

ul.appendChild(home);
ul.appendChild(dropdown)
if (getCookie('loggedIn') === 'true') {
    dropdownMenuWine.appendChild(addWine);
    dropdownMenuWine.appendChild(showWine);
    dropdownWine.appendChild(dropdownMenuWine);
    dropDownMenuAccount.appendChild(account);
    dropDownMenuAccount.appendChild(logout);
    ul.append(dropdownWine)

} else {
    dropDownMenuAccount.appendChild(login);
    dropDownMenuAccount.appendChild(register);
}
dropdown.appendChild(dropDownMenuAccount)
ul.appendChild(about);
nav.appendChild(ul);
let header = document.getElementsByTagName("header")[0];
header.append(navForButton);
header.append(nav);
$('#mainNav').hide();


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}