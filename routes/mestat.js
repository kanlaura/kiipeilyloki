var express = require('express');
var router = express.Router();
var fs = require("fs");

var paikat = require("../paikat.json") //tämä johtaa GETin json-tiedostoon

router.get('/', function (req, res) {
    res.send(paikat);
});

// const paikat = [
//     { "paikka": "El Chorro", "kuvaus": "Siisti kiipeily mesta" },
//     { "paikka": "Kalymnos", "kuvaus": "Kreikan tunnelmaa" },
//     { "paikka": "Fontaine Bleau", "kuvaus": "Eating baquets" },
//     { "paikka": "Affis", "kuvaus": "Paras bouldermesta Suomessa" }
// ];

// router.route('/')
// .get(function (req,res) {
//     res.json(paikat); 
// });              


// router.route('/:paikka')
//     .get(function (req, res) {
//         for (var item of paikat) {
//             if (item.paikka == req.params.paikka) {
//                 res.json(item);
//                 return;
//             }
//         }
//     })
// })
router.route('/:paikka')
.put(function (req, res) {
    console.log("Put: " + req.params.paikka)
    console.dir(req.body)
    console.dir(paikat)
    for (let item of paikat) {
        if (item.paikka === req.params.paikka) {
            const change = req.body;
            if (change.arvio ) {
                item.arvio=change.arvio
                console.log(item.arvio);
            }
            if (change.kuvaus ) {
                item.kuvaus=change.kuvaus
                console.log(item.kuvaus);
            }
            res.json({Viesti:'Muutettu'});
            return;
            }
        }
        res.status(404);
        res.json("{'msg': 'Tämän nimistä paikkaa ei löytynyt!'}");
    });
    // router.put('/:paikka', function(req, res, next){
    //     let item=paikat.findIndex(p=>p.paikka==req.params.paikka);
    //     paikat[item]=req.body
    //     res.json({message: item+ " updated"});
    // })

module.exports = router;