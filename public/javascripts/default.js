
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