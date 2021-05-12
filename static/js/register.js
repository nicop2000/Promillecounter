const form = document.getElementById('reg-form');
form.addEventListener('submit', registerUser);


async function registerUser(event) {
    event.preventDefault()
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
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