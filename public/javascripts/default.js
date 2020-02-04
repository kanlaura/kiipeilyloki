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

// document.getElementById("lisaa").addEventListener("click", AddMesta);

// function AddMesta() {

//     fetch("http:/localhost/3000/api/mesta").then(res => res.json())
//     .then(paikat => {
//         console.dir(paikat);
//     })


// }

