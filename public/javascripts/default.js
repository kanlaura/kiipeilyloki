//inputit
const pNimi = document.getElementById('poistaNimi');
const eNimi = document.getElementById('etsiNimi');

//napit
const poistaNappi = document.getElementById('poistaNappi');
const etsiNappi = document.getElementById('etsi');
const arvioiNappi = document.getElementById('arvioi');

//kentät
const pVastaus = document.getElementById('poistaVastaus');
const arvostelut = document.getElementById('arvostelut');

//eventlistenerit
poistaNappi.addEventListener('click', poistaKohde);
etsiNappi.addEventListener('click', etsiKohde);
arvioiNappi.addEventListener('click', listaaArviot);

//Kutsuu ajantasaista listaa kaikista kohteista
listaaArviot()

// Poistaa kohteen JSON-tiedostosta
function poistaKohde() {
    const kohde = pNimi.value
    fetch(`http://localhost:3000/api/mestat/${kohde}`, {
        method: 'DELETE',
    })
        .then(function (res) {
            return res.json();
        })
        .then((json) => {
            if (json == 'kohde poistettu') {
                pVastaus.innerHTML = `${kohde} poistettu toivelistalta`
            } else {
                pVastaus.innerHTML = `Kohdetta ei löytynyt`
            }
            return;
        })
};

//Etsi kohteen kaikki tiedot klikkaamalla "Etsi kohde Arvioi kohde kohdassa"
function etsiKohde() {
    const kohde = eNimi.value
    fetch(`http://localhost:3000/api/mestat/${kohde}`)
        .then(function (res) {
            return res.json();
        })
        .then((json) => {
            if (json == `{'msg': 'Ei sellaista kohdetta!'}`) {
                console.log(`Kohdetta ei löytynyt`);
            } else {
                console.log(json);
            }
            return;
        })

}

//Listaa arvioidut kohteet kohtaan kaikki arvioidut kohteet
function listaaArviot() {
    fetch(`http://localhost:3000/api/mestat/`)
        .then(function (res) {
            return res.json();
        })
        .then((json) => {
            arvostelut.innerHTML = '';
            if (json == `{'msg': 'Ei sellaista kohdetta!'}`) {
                console.log(`Error`);
            } else {
                console.log(json);
                for (let i = 0; i < json.length; i++) {
                    const paikka = json[i].paikka;
                    const kuvaus = json[i].kuvaus;
                    const arvio = json[i].arvio;

                    const uusiLI = document.createElement('li');
                    const uusiUL = document.createElement('ul');
                    const uusiKuvaus = document.createElement('li');
                    const uusiArvio = document.createElement('li');

                    uusiLI.innerHTML = `${paikka}`
                    uusiKuvaus.innerHTML = `${kuvaus}`;
                    uusiArvio.innerHTML = `${arvio}`;

                    arvostelut.appendChild(uusiLI);
                    uusiLI.appendChild(uusiUL);
                    uusiUL.appendChild(uusiKuvaus);
                    uusiUL.appendChild(uusiArvio);

                    uusiLI.classList.add('aKohde');
                    uusiUL.classList.add('aLista');
                    uusiKuvaus.classList.add('aKuvaus');
                    uusiArvio.classList.add('aArvio');
                }
            }
            return;
        })
}
const bingoCard = document.getElementById('bingoCard');
bingoCard.addEventListener('click', checkNumber);

document.querySelectorAll('.aKohde').forEach(function (item) {
    item.addEventListener('click', function (event) {
        console.log('jee jee')
        const kuvaus = document.getElementsByClassName('aLista');
        if (kuvaus.style.display !== 'none') {
            kuvaus.style.display = 'none';
        } else {
            kuvaus.style.display = 'inline';
        }
    });
});