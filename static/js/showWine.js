async function getWine() {
    const result = await fetch('/api/wine/showWine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    }).then(res => res.json())

    if (result.status === 'ok') {
        const wines = result.data;
        console.log(wines)
        for (let i = 0; i < wines.length; i += 2) {
            let divRow = document.createElement('div');
            divRow.className = "row";
            let divCol1 = document.createElement('div');
            if(wines[i] != null) {
                let shopTemp = wines[i].shop;
                let shop = shopTemp !== "" ? "Gekauft bei: " + shopTemp : "Kein Laden verfügbar";
                let priceTemp = wines[i].price;
                let price = priceTemp !== "" ? priceTemp + " €" : "Kein Preis verfügbar";
                divCol1.innerHTML = `
                <table>
                <th>${wines[i].name}</th>
                <tr><td>${wines[i].color}</td></tr>
                <tr><td>${wines[i].kind}</td></tr>
                <tr><td>${price}</td></tr>
                <tr><td>${wines[i].rating}</td></tr>
                <tr><td>${shop}</td></tr>
                <tr><td><img src="${wines[i].picture}" alt="Kein Bild verfügbar"></td></tr>
            </table>`;
                divCol1.className = "col";
                divRow.appendChild(divCol1);
            } else {
                let divCol1 = document.createElement('div');
                divCol1.innerHTML = ""
                divRow.appendChild(divCol1);
                divCol1.className = "col";
            }
            let j = i + 1;
            if (j < wines.length  && wines[j] !== null) {
                let shopTemp = wines[j].shop;
                let shop = shopTemp !== "" ? "Gekauft bei: " + shopTemp : "Kein Laden verfügbar";
                let priceTemp = wines[j].price;
                let price = priceTemp !== "" ? priceTemp + " €" : "Kein Preis verfügbar";
                let divCol2 = document.createElement('div');
                divCol2.innerHTML = `
                <table>
                <th>${wines[j].name}</th>
                <tr><td>${wines[j].color}</td></tr>
                <tr><td>${wines[j].kind}</td></tr>
                <tr><td>${price}</td></tr>
                <tr><td>${wines[j].rating}</td></tr>
                <tr><td>${shop}</td></tr>
                <tr><td><img src="${wines[j].picture}" alt="Kein Bild verfügbar"></td></tr>
            </table>`;
                divRow.appendChild(divCol2);
                divCol2.className = "col";
            } else {
                let divCol2 = document.createElement('div');
                divCol2.innerHTML = ""
                divRow.appendChild(divCol2);
                divCol2.className = "col";
            }
            let k = j + 1;
            if (k < wines.length && wines[k] !== null) {
                let shopTemp = wines[k].shop;
                let shop = shopTemp !== "" ? "Gekauft bei: " + shopTemp : "Kein Laden verfügbar";
                let priceTemp = wines[k].price;
                let price = priceTemp !== "" ? priceTemp + " €" : "Kein Preis verfügbar";
                let divCol3 = document.createElement('div');
                divCol3.innerHTML = `
                <table>
                <th>${wines[k].name}</th>
                <tr><td>${wines[k].color}</td></tr>
                <tr><td>${wines[k].kind}</td></tr>
                <tr><td>${price}</td></tr>
                <tr><td>${wines[k].rating}</td></tr>
                <tr><td>${shop}</td></tr>
                <tr><td><img src="${wines[k].picture}" alt="Kein Bild verfügbar"></td></tr>
            </table>`;
                divRow.appendChild(divCol3);
                divCol3.className = "col";
            } else {
                let divCol3 = document.createElement('div');
                divCol3.innerHTML = ""
                divRow.appendChild(divCol3);
                divCol3.className = "col";
            }
            document.getElementById('main-container-wines').appendChild(divRow);
        }
        let img = document.createElement("img");
        img.src = wines[wines.length - 1].picture;
        console.log(img);
        // document.body.appendChild(img);
        let x = document.getElementsByClassName('col');
        console.log(x)
        x[x.length - 1].style.borderBottom = "0px solid black"
        x[x.length - 2].style.borderBottom = "0px solid black"
        x[x.length - 3].style.borderBottom = "0px solid black"


    } else if (result.data === 'none') {
        let errH1 = document.createElement('h1');
        errH1.innerHTML = result.error;
        document.body.appendChild(errH1)


    } else {
        alert(result.error);
    }
}