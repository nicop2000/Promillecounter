const form = document.getElementById('add-wine-form');
form.addEventListener('submit', addWineToList);
let picture = ""

function clearImageUpload() {
    document.getElementById('clear-image-upload').reset();
}

function checkInput(color, kind, rating) {

    if (!color || color === 'non') {
        return 'Bitte Weinfarbe auswählen';
    }
    if (!kind || kind === 'non') {
        return 'Bitte Geschmack auswählen';
    }
    if (!rating) {
        return 'Bitte Bewertung abgeben';
    }
}

const uploadImageForm = document.getElementById('image-upload');
uploadImageForm.addEventListener('submit', uploadImage);

async function uploadImage(event) {
    event.preventDefault()
    console.log("clicked upload image");

}

async function addWineToList(event) {
    event.preventDefault()
    let responseImage = await fetch('/api/wine/uploadImage', {
        method: 'POST',
        body: new FormData(uploadImageForm)
    });
    let resultImage = await responseImage.json();
    if(resultImage.status === 'ok') {
        picture = resultImage.path;
    }
    console.log('PICTURE', picture)

    console.log("clicked");
    console.log(picture)
    const name = $('#wine-name').val()
    const color = $('#wine-color').val()
    const kind = $('#wine-kind').val()
    const rating = $("input[name='wineRating']:checked").val();
    const price = $('#wine-price').val()
    const shop = $('#wine-shop').val()

    console.log(name, typeof color, kind, typeof price, typeof rating, shop)
    $('#error-adding-wine').text('');
    let err = await checkInput(color, kind, rating);
    if (err) {
        $('#error-adding-wine').text(err);
        return
    }

    const result = await fetch('/api/wine/addWine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({

            wine: {
                name,
                color,
                kind,
                rating,
                price,
                shop,
                picture

            }
        })
    }).then(res => res.json())

    if (result.status === 'ok') {
        console.log('Updated', result.data);
        document.getElementById('add-wine-form').reset();
        document.getElementById('image-upload').reset();
        document.getElementById('wine-confirmation').innerHTML += `<p>Der Wein ${result.wine.name} wurde erfolgreich hinzugefügt</p>`;
        $('#exampleModal').modal()

        alert('...')
        //everything went fine
    } else {

        alert(result.error);
    }

}

function reToWines() {
    location.href = '/show-wine'
}

function reToHome() {
    location.href = '/home'
}
