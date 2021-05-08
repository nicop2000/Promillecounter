async function adWine() {
    console.log("clicked");
    const name = "Mederano";
    const sorte = "rot";
    const bewertung = 5;

    const result = await fetch('/api/wine/addWine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
             wine: {
                name: "Mederanooooo",
                farbe: "rot"}
                // sort: "trocken",
                // rating: 5,
                // shop: "Rewe",
                // price: 2.99
            // }
        })
    }).then(res => res.json())

    if(result.status === 'ok') {
        console.log('Updated', result.data);

        alert('...')
        //everything went fine
    } else {

        alert(result.error);
    }

}