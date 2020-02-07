//inputit
const pNimi = document.getElementById('poistaNimi');
const eNimi = document.getElementById('etsiNimi');
const uusiKuvaus = document.getElementById('uusiKuvaus');
const uusiArvio = document.getElementById('uusiArvio');

//napit
const poistaNappi = document.getElementById('poistaNappi');
const etsiNappi = document.getElementById('etsi');
const arvioiNappi = document.getElementById('arvioi');
const lisaaNappi = document.getElementById("lisaa");

//kentät
const pVastaus = document.getElementById('poistaVastaus');
const arvostelut = document.getElementById('arvostelut');
const toive = document.getElementById("output");
const uusiNimi = document.getElementById("uusiNimi");
const eiKohdetta = document.getElementById("eikohdetta");
const arvioVirhe = document.getElementById("arvioVirhe");
const arvioLisatty = document.getElementById("arvioLisatty");

//eventlistenerit
toive.addEventListener('click', poistaKohde);
etsiNappi.addEventListener('click', etsiKohde);
arvioiNappi.addEventListener('click', muutaArviota);
arvostelut.addEventListener('click', naytaKuvaus);
lisaaNappi.addEventListener("click", addMesta);

//Toivelista näkyy kun käyttäjä tulee sivulle (H.V. ja D.B)
function myFunction() {
    fetch("./api/mestat")
        .then(res => res.json())
        .then(paikat => {
            let output = ""
            for (i = 0; i < paikat.length; i++) {
                if (paikat[i].arvio == 0) {
                    output += `<li><span>${paikat[i].paikka}</span><button id="poistaNappi">❌</button></li>`
                };
            }
            toive.innerHTML = output;
        })
}

myFunction();

//käyttäjä lisää selaimessa uuden kohteen listalle.
//Tämä scripti lisää sen POStilla paikat.jsoniin (H.V. ja D.B)
function addMesta() {
    if (uusiNimi.value == null || uusiNimi.value == undefined || uusiNimi.value == "") {
        console.log('Tyhjää ei voi syöttää')
    } else {
        const kohde = uusiNimi.value

        fetch(`http://localhost:3000/api/mestat/${kohde}`)
            .then(function (res) {
                return res.json();
            })
            .then((json) => {
                if (kohde == json.paikka) {
                    console.log(`Kohde on jo olemassa`);
                    uusiNimi.value = `${kohde} on jo listalla!!!`
                } else {
                    let title = uusiNimi.value
                    fetch("./api/mestat", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ paikka: title, kuvaus: "", arvio: 0 })
                    })
                        .then(res => res.json())

                    //tämä on GET pyyntö palauttaa lisäyksen jälkeen näkyviin toivelistalle paikat, 
                    //jolla ei ole arviota (H.V. ja D.B)
                    myFunction();
                    uusiNimi.value = "";
                }
            })
    }
}



//Kutsuu ajantasaista listaa kaikista kohteista
listaaArviot();

// Poistaa kohteen JSON-tiedostosta
function poistaKohde(event) {
    console.dir(event.target.localName)
    if (event.target.localName == 'button') {

        console.log(event.path[1].children[1])
        const kohde = event.path[1].children[0].innerText
        console.log(event.path[1].children[0].innerText)

        fetch(`http://localhost:3000/api/mestat/${kohde}`, {
            method: 'DELETE',
        })
            .then(function (res) {
                return res.json();
            })
            .then((json) => {
                if (json == 'kohde poistettu') {
                    console.log(`${kohde} poistettu toivelistalta`);
                } else {
                    console.log(`Kohdetta ei löytynyt`);
                }
                return;
            })
        myFunction();
    }
};


//Etsi kohteen kaikki tiedot klikkaamalla "Etsi kohde Arvioi kohde kohdassa"
function etsiKohde() {
    eiKohdetta.innerHTML = ""
    arvioLisatty.innerHTML= ""
    arvioVirhe.innerHTML = ""

    if (eNimi.value == null || eNimi.value == undefined || eNimi.value == "") {
        console.log('Tyhjää ei voi syöttää')
        eiKohdetta.innerHTML = "Tyhjää ei voi syöttää."
    } else {
        const kohde = eNimi.value

        fetch(`http://localhost:3000/api/mestat/${kohde}`)
            .then(function (res) {
                return res.json();
            })
            .then((json) => {
                if (json == `{'msg': 'Ei sellaista kohdetta!'}`) {
                    console.log(`Kohdetta ei löytynyt`);
                    eiKohdetta.innerHTML = "Kohdetta ei löytynyt."
                } else {
                    if (json.arvio == 0){
                        uusiArvio.value = 0
                        }                    
                        else {
                            uusiKuvaus.value=json.kuvaus
                            uusiArvio.value=json.arvio
                        }
                    // console.log(json.paikka);
                    // console.log(json.arvio);
                    eiKohdetta.innerHTML="Kohde haettu.";
                    arvioLisatty.innerHTML="";
                }
                return;
            })
    }
}

function muutaArviota() {
    eiKohdetta.innerHTML = ""
    arvioLisatty.innerHTML= ""
    arvioVirhe.innerHTML = ""
    const kohde = eNimi.value
    let paivitettyKuvaus = { kuvaus: uusiKuvaus.value, arvio: parseInt(uusiArvio.value) }
    if (kohde == null || kohde == " " || kohde == "") {
        console.log('Tyhjää ei voi syöttää')
        arvioLisatty.innerHTML = "Tyhjää ei voi syöttää"
    } else {
        if (uusiArvio.value < 1 || uusiArvio.value > 5) {
            arvioVirhe.innerHTML = `HUOM! Arvion pitää olla 1 ja 5 välillä puolen desimaalin tarkkuudella`
        } else {

            fetch(`http://localhost:3000/api/mestat/${kohde}`)
                .then(function (res) {
                    return res.json();
                })
                .then((json) => {
                    if (json == `{'msg': 'Ei sellaista kohdetta!'}`) {
                        console.log(`Kohdetta ei löytynyt`);
                        fetch("./api/mestat", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ paikka: kohde, kuvaus: uusiKuvaus.value, arvio: parseInt(uusiArvio.value) })
                        })
                            .then(res => res.json())
                            arvioLisatty.innerHTML = "Arvio tallennettu."
                    } else {
                        fetch(`http://localhost:3000/api/mestat/${kohde}`, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(paivitettyKuvaus)
                        }).then(res => res.json()).then(message => {
                            console.log(message);
                        })
                        arvioLisatty.innerHTML="Kohde päivitetty.";
                    }
                    listaaArviot();
                    myFunction();
                    return;
                })
            arvioVirhe.innerHTML = "";
            eiKohdetta.innerHTML="";
        }
    }
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
                    if (json[i].arvio !== 0 && json[i].kuvaus !== "") {
                        const paikka = json[i].paikka;
                        const kuvaus = json[i].kuvaus;
                        const arvio = json[i].arvio;
                        let tahtiArvio;

                        switch (arvio) {
                            case 1:
                                tahtiArvio = '★'
                                break;
                            // case 1.5:
                            //     tahtiArvio = '★'
                            //     break;
                            case 2:
                                tahtiArvio = '★★'
                                break;
                            // case 2.5:
                            //     tahtiArvio = `★★½`
                            //     break;
                            case 3:
                                tahtiArvio = '★★★'
                                break;
                            // case 3.5:
                            //     tahtiArvio = '★★★½'
                            //     break;
                            case 4:
                                tahtiArvio = '★★★★'
                                break;
                            // case 4.5:
                            //     tahtiArvio = '★★★★½'
                            //     break;
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
            }
            //Nollaa kentät nappipanalluksen jälkeen(DB)
            eNimi.value = ""
            uusiKuvaus.value = ""
            uusiArvio.value = ""
            return;
        })
}

function naytaKuvaus(event) {
    const kuvaus = event.target.lastChild;
    if (kuvaus.style.display == 'none' || kuvaus.style.display == "") {
        kuvaus.style.display = 'block';
    } else {
        kuvaus.style.display = 'none';
    }
}