const form = document.getElementById('add-wine-form');
form.addEventListener('submit', addWineToList);
let picture = ""

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


    let response = await fetch('/api/wine/uploadImage', {
        method: 'POST',
        body: new FormData(uploadImageForm)
    });
    let result = await response.json();
    if(result.status === 'ok') {
        picture = result.path;
    }
}

async function addWineToList(event) {
    console.log('PICTURE', picture)
    event.preventDefault()
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

        alert('...')
        //everything went fine
    } else {

        alert(result.error);
    }

}


// Select the image
const img = document.querySelector('#my-image');
img.addEventListener('load', function (event) {
    const image = event.currentTarget;
    /*
upload image and save to server with datapath!!!!!
 */
});

// Auf neue Auswahl reagieren und gegebenenfalls Funktion dateiauswahl neu ausführen.
