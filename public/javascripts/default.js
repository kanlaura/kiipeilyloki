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
