//inputit
const pNimi = document.getElementById('poistaNimi');
const eNimi = document.getElementById('etsiNimi');
const uusiKuvaus = document.getElementById('uusiKuvaus');
const uusiArvio = document.getElementById('uusiArvio');

//napit
const poistaNappi = document.getElementById('poistaNappi');
const etsiNappi = document.getElementById('etsi');
const arvioiNappi = document.getElementById('arvioi');

//kentät
const pVastaus = document.getElementById('poistaVastaus');

//eventlistenerit
// poistaNappi.addEventListener('click', poistaKohde);
etsiNappi.addEventListener('click', etsiKohde);
arvioiNappi.addEventListener('click', muutaArviota);


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
            pVastaus.innerHTML = `${kohde} poistettu listalta`
        } else {
            pVastaus.innerHTML = `Kohdetta ei löytynyt`
        }
        return;
    })
};

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
            uusiKuvaus.value += json.kuvaus;
            uusiArvio.value += json.arvio;
            console.log(json.paikka);
        }
        return;
    })
}

function muutaArviota(){
    let paivitettyKuvaus={kuvaus:uusiKuvaus.value, arvio:uusiArvio.value}
    const kohde = eNimi.value;

        fetch(`http://localhost:3000/api/mestat/${kohde}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paivitettyKuvaus)
        }).then(res => res.json()).then(message => {                   
            console.dir(message);
        })
}
