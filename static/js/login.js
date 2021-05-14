const form = document.getElementById('login-form');
form.addEventListener('submit', loginUser);


async function loginUser(event) {
    event.preventDefault()
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const result = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then(res => res.json())
    console.log(result)

    if(result.status === 'ok') {
        document.getElementById('login-form').reset();

        alert('eingeloggt')
        location.href = '/'
        //everything went fine
    } else {
        //error creatin user
        alert(result.error);
    }

}