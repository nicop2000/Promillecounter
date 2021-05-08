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

    if(result.status === 'ok') {
        console.log('Got the token :', result.data);
        //TODO: XSS -> CSP .., sanatizing the user input (<script>... -> siehe Hackingnight), ...
        localStorage.setItem('token',result.data);
        alert('eingeloggt')
        //everything went fine
    } else {
        //error creatin user
        alert(result.error);
    }

}