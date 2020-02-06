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
const arvostelut = document.getElementById('arvostelut');

//eventlistenerit
// poistaNappi.addEventListener('click', poistaKohde);
etsiNappi.addEventListener('click', etsiKohde);
arvioiNappi.addEventListener('click', listaaArviot);
arvioiNappi.addEventListener('click', muutaArviota);
document.getElementById("lisaa").addEventListener("click", addMesta);

//Toivelista näkyy kun käyttäjä tulee sivulle (H.V. ja D.B)
function myFunction(){
    fetch("./api/mestat") 
    .then(res => res.json())
    .then(paikat => {
        //console.log(paikat)
        let output=""
        for (i=0; i<paikat.length; i++) {
            if (paikat[i].arvio == ""){
                console.log(paikat[i].paikka)
                output += `<li>${paikat[i].paikka}</li>`
            }
        ;
        //console.log(paikat[i].paikka)
        }
        document.getElementById("output").innerHTML = output;
    })
}

myFunction();

//käyttäjä lisää selaimessa uuden kohteen listalle.
//Tämä scripti lisää sen POStilla paikat.jsoniin (H.V. ja D.B)
function addMesta() {
    let title = document.getElementById("uusiNimi").value
    fetch("./api/mestat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paikka: title, kuvaus: "", arvio: "" })
    })
        .then(res => res.json())
        

     //tämä on GET pyyntö palauttaa lisäyksen jälkeen näkyviin toivelistalle paikat, 
     //jolla ei ole arviota (H.V. ja D.B)
    fetch("./api/mestat") 
    .then(res => res.json())
    .then(paikat => {
        //console.log(paikat)
        let output=""
        for (i=0; i<paikat.length; i++) {
            if (paikat[i].arvio == ""){
                console.log(paikat[i].paikka)
                output += `<li>${paikat[i].paikka}</li>`
            }
        ;
        //console.log(paikat[i].paikka)
        }
        document.getElementById("output").innerHTML = output;
    })
    }



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
                uusiKuvaus.value += json.kuvaus;
                uusiArvio.value += json.arvio;
                console.log(json.paikka);
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
                for (let i = 0; i < json.length; i++) {
                    const paikka = json[i].paikka;
                    const kuvaus = json[i].kuvaus;
                    const arvio = json[i].arvio;
                    let tahtiArvio;

                    switch (arvio) {
                        case 1:
                            tahtiArvio = '★'
                            break;
                        case 2:
                            tahtiArvio = '★★'
                            break;
                        case 3:
                            tahtiArvio = '★★★'
                            break;
                        case 4:
                            tahtiArvio = '★★★★'
                            break;
                        case 5:
                            tahtiArvio = '★★★★★'
                            break;
                    }

                    const uusiLI = document.createElement('li');
                    const uusiUL = document.createElement('ul');
                    const uusiKuvaus = document.createElement('li');
                    const uusiArvio = document.createElement('li');

                    uusiLI.innerHTML = `${paikka}`
                    uusiKuvaus.innerHTML = `Kohteen kuvaus: ${kuvaus}`;
                    uusiArvio.innerHTML = `Kohteen arvio: ${tahtiArvio}`;

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

arvostelut.addEventListener('click', naytaKuvaus);

function naytaKuvaus(event) {
    const kuvaus = event.target.lastChild;
    if (kuvaus.style.display == 'none') {
        kuvaus.style.display = 'block';
    } else {
        kuvaus.style.display = 'none';
    }
}


function muutaArviota() {
    let paivitettyKuvaus = { kuvaus: uusiKuvaus.value, arvio: uusiArvio.value }
    const kohde = eNimi.value;

    fetch(`http://localhost:3000/api/mestat/${kohde}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paivitettyKuvaus)
    }).then(res => res.json()).then(message => {
        console.dir(message);
    })
}

