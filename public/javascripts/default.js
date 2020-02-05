//inputit
const pNimi = document.getElementById('poistaNimi');
const eNimi = document.getElementById('etsiNimi');

//napit
const poistaNappi = document.getElementById('poistaNappi');
const etsiNappi = document.getElementById('etsi');

//kentät
const pVastaus = document.getElementById('poistaVastaus');

//eventlistenerit
poistaNappi.addEventListener('click', poistaKohde);
etsiNappi.addEventListener('click', etsiKohde);


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
            console.log(json);
        }
        return;
    })
}

document.getElementById("etsi").addEventListener("click", ArvioKohde);

var paikkaId;

/// TÄSTÄ JATKUUUUUUU
function arvioiKohde(event) {

    fetch("/api/mestat/"+paikkaId).then(res => res.json()).then(paikka=>{
        console.dir(paikka);
        document.getElementById("uusiKuvaus").value=paikka.kuvaus;
        document.getElementById("uusiArvio").value=paikka.arvio;
    })
    document.getElementById("arvioi").style.display="block";
}

function savebeer(){
    let uusiKuvaus = document.getElementById("uusiKuvaus").value;
    let uusiArvio = document.getElementById("uusiArvio").value;
    let editoidutPaikat = new Paikka(uusiKuvaus, uusiArvio, paikkaId);
    console.dir()
    fetch('/api/beers/'+beerid, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedbeer)
    }).then(res => res.json()).then(message => {
        console.dir(message);
        document.getElementById("editform").style.display="none";
        getbeers();
    })
}