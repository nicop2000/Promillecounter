const form = document.getElementById('reg-form');
form.addEventListener('submit', registerUser);


async function registerUser(event) {
    event.preventDefault()
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const username = document.getElementById('username').value;
    const emailAddress = document.getElementById('mail').value;
    const password = document.getElementById('password').value;
    const passwordRepeat = document.getElementById('password-repeat').value;
    const created = new Date().toISOString()
    console.log(created)
    if (password !== passwordRepeat) {
        alert('Die eingegebenen Passwörter stimmen nicht überein!')
        return;
    }
    console.log('START REQ')
    const result = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            emailAddress,
            password,
            created
        })
    }).then(res => res.json())


    if (result.status === 'ok') {
        //everything went fine
        document.getElementById('reg-form').reset();
        alert('hat geklappt')
        location.href = '/'
    } else {
        //error creatin user
        alert(result.error);
    }

}