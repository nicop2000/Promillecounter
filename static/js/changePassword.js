const form = document.getElementById('change-password');
form.addEventListener('submit', change);


async function change(event) {
    event.preventDefault()

    const passwordNew = document.getElementById('password-new').value;
    const passwordNewRepeat = document.getElementById('password-new-repeat').value;

    if (! (passwordNew === passwordNewRepeat)) {
        alert('Passwörter stimmen nicht überein')
        console.log('wring');
        return;
    }

    const result = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({
            passwordNew,
            token: localStorage.getItem('token')
        })
    }).then(res => res.json())

    if(result.status === 'ok') {
        alert(result.data);
        console.log('Passwort geändert');
        //everything went fine
    } else {
        //error creatin user
        alert(result.error);
    }

}