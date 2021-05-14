const form = document.getElementById('level-calc');
form.addEventListener('submit', calculateTotalAlc);
let i = 1;

let dataTable = document.getElementById('data');
let intervalForChecking = setInterval(expandTable, 3000)


function expandTable() {
    let currentRowDrink = document.getElementById('row-' + i + '-drink');
    let currentRowCount = document.getElementById('row-' + i + '-count');
    let currentRowML = document.getElementById('row-' + i + '-ml');
    let currentRowAlc = document.getElementById('row-' + i + '-alcohol');
    console.log('Go')

    if (currentRowDrink.value !== '' && currentRowCount.value !== '' && currentRowML.value !== '' && currentRowAlc.value !== '') {
        i++;
        let newRow = document.createElement('tr');
        newRow.innerHTML = `
                <td><input type="text" id="row-${i}-drink" placeholder="Getränkname"/></td>
                <td><input type="number" id="row-${i}-count" placeholder="Anzahl der Getränke"/></td>
                <td><input type="number" id="row-${i}-ml" placeholder="Milliliter pro Getränk"/></td>
                <td><input type="number" id="row-${i}-alcohol" placeholder="Alkoholgehalt des Getränks"/></td>
                <td id="ergebnis-${i} &permil;"></td>
            `
        console.log('try to append')
        dataTable.appendChild(newRow);
        console.log('appended');
    } else {
        return;
    }

}

function calculateTotalAlc(event) {
    event.preventDefault()
    clearInterval(intervalForChecking)
    let total = 0;
    let data = {drink: [], count: [], ml: [], alc: []};
    let weight = document.getElementById('weight').value * 1;
    let gender = $("input[name='gender']:checked").val();
    let mult = gender === 'male' ? 0.7 : 0.6;
    let hoursSinceStart = getHoursSinceAlcohol();


    for (let j = 1; j <= i; j++) {
        let currentRowCount = document.getElementById('row-' + j + '-count').value * 1;
        let currentRowML = document.getElementById('row-' + j + '-ml').value * 1;
        let currentRowAlc = document.getElementById('row-' + j + '-alcohol').value * 1;
        let currentRowResult = document.getElementById('ergebnis-' + j);
        console.log(typeof currentRowCount, currentRowCount);
        console.log(typeof currentRowML, currentRowML);
        console.log(typeof currentRowAlc, currentRowAlc);

        let cleanAlcoholInGramms = currentRowML * (currentRowAlc / 100) * 0.8;
        console.log('ALC', cleanAlcoholInGramms)
        let perMill = (currentRowCount * cleanAlcoholInGramms) / (weight * mult);
        console.log('Mill', perMill)
        console.log('FIRST', (currentRowCount * cleanAlcoholInGramms))
        console.log(perMill);
        currentRowAlc = document.getElementById('row-' + j + '-alcohol');
        total += perMill
        console.log(typeof total, total, 'TOTAL')
        if (currentRowAlc.value !== '') {
            currentRowResult.innerHTML = perMill.toFixed(2);
        }


        data.count.push(currentRowCount);
        data.ml.push(currentRowML);
        data.alc.push(currentRowAlc);
    }
    console.log('ENDGÜLTIG TOTAL', total)
    console.log(hoursSinceStart)
    console.log(total - (hoursSinceStart * 0.125))
    if (total - (hoursSinceStart * 0.125) < 0.00) {

        document.getElementById('result-per-mill').innerHTML = 'Du bist ausgenüchtert! (0.00 &permil;)';
    } else {
        document.getElementById('result-per-mill').innerHTML = 'Noch Alkohol vorhanden: ' + (total - (hoursSinceStart * 0.125)).toFixed(2) + ' &permil; (Promille) – kein Autofahren, bitte! :D';
    }
}

function getHoursSinceAlcohol() {
    let startTime = document.getElementById('starttime').value.split(':');
    console.log('STARTTIME', startTime)
    let currentTime = new Date()
    let hours = currentTime.getHours()
    console.log(typeof hours, hours, 'HOUUUUURS')
    let minutes = currentTime.getMinutes()
    if (hours < startTime[0] * 1) {
        console.log('KLeiner')
        hours += 24;
        hours -= startTime[0] * 1;
    } else {

        hours -= (startTime[0] * 1);
    }

    if (minutes < startTime[1] * 1) {
        hours--;
        minutes += 60 - startTime[1] * 1
    }
    console.log(hours, typeof hours, 'HOURS ENDE')
    return hours;

}
