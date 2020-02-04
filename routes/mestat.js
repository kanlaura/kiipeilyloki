var express = require('express');
var router = express.Router();
<<<<<<< HEAD

const paikat = [
    { "paikka": "El Chorro", "kuvaus": "Siisti kiipeily mesta" },
    { "paikka": "Kalymnos", "kuvaus": "Kreikan tunnelmaa" },
    { "paikka": "Fontaine Bleau", "kuvaus": "Eating baquets" },
    { "paikka": "Affis", "kuvaus": "Paras bouldermesta Suomessa" }
];

router.route('/')
.get(function (req,res) {
    res.json(paikat); 
});              


router.route('/:paikka')
    .get(function (req, res) {
        for (var item of paikat) {
            if (item.paikka == req.params.paikka) {
                res.json(item);
                return;
            }
        }
    })

// router.route('/')
// .delete(function (req, res) {
//     for (var item in paikat) {
//         if (paikat[item].paikka === req.params.paikka) {
//             paikat.splice(item, 1);
//             res.json("{msg: 'Person removed'}"); return;
//         }
//     }
//     res.json("{'msg': 'Error, no such person!'}");
// })
    router.route('/')
    .put(function (req, res) {
        for (var item in paikat) {
            if (paikat[item].paikka === req.params.paikka) {
                const muuttunut = req.body;
                if (muuttunut.paikka ) {
                    paikat[item].paikka = muuttunut.paikka

                } if (muuttunut.kuvaus) {
                    paikat[item].kuvaus = muuttunut.kuvaus

                }
                res.status(204).send();
                return;
            }
        }

        res.status(404);
        res.json("{'msg': 'Tämän nimistä paikkaa ei löytynyt!'}");
    })


=======
var fs=require("fs");

var paikat = require("../paikat.json") //tämä johtaa GETin json-tiedostoon

//nämä tehty POSTia varten
// var tiedot=[];
// fs.readFile("paikat.json", (err, data) => {
// tiedot = JSON.parse(data);
// })


router.get('/', function (req, res) {
    res.send(paikat);
});


/*
router.post('/', function (req, res) {
    var kohde=req.body
    paikat.push(kohde)
    //fs että tiedot tallentuu jsoniin
    fs.writeFile("paikat.json", JSON.stringify(tiedot), () => { console.log("Tiedot tallennettu")
    })
    res.send('Got a POST request')
});
*/
>>>>>>> 295c997272fdaf3c683c415cdda68a4dacaadcd2
module.exports = router;