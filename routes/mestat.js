var express = require('express');
var router = express.Router();
var fs = require("fs");
var paikat = require("../paikat.json") //tämä johtaa GETin json-tiedostoon (H.V. & D.B.)


//tuo näkyviin koko lista (H.V. & D.B.)
router.route('/')
    .get(function (req, res) {
        res.send(paikat);
    })

    //lisää uusi kohde (H.V. & D.B.)
    .post(function (req, res) {
        let uusi = req.body;
        paikat.push(uusi);
        fs.writeFile("paikat.json", JSON.stringify(paikat), (err) => {
            if (err) throw err;
            res.end(respdata);
        })
        res.status(201).json(uusi);
    })

router.route('/:paikka')
    .get(function (req, res) {
        for (var kohde of paikat) {
            if (kohde.paikka == req.params.paikka) {
                res.json(kohde);
                return;
            }
        }
        res.json("{'msg': 'Ei sellaista kohdetta!'}"); //jos haetun nimistä paikkaa ei löydy (H.V. & D.B.)
    })

    .put(function (req, res) {
        console.log("Put: " + req.params.paikka)
        for (let item of paikat) {
            if (item.paikka === req.params.paikka) {
                const change = req.body;
                if (change.arvio) {
                    item.arvio = change.arvio
                    // console.log(item.arvio);
                }
                if (change.kuvaus) {
                    item.kuvaus = change.kuvaus
                    // console.log(item.kuvaus);
                }
                fs.writeFile("paikat.json", JSON.stringify(paikat), (err) => {
                })
                res.json('Muutettu');
                return;
            }
        }
        res.status(404);
        res.json("{'msg': 'Tämän nimistä paikkaa ei löytynyt!'}");
    });


//lisää uusi kohde (H.V. & D.B.)
router.post("/", function (req, res) {
    let uusi = req.body;
    paikat.push(uusi);
    fs.writeFile("paikat.json", JSON.stringify(paikat), (err) => {
        if (err) throw err;
        res.end("postattu");
    })
    res.status(201).json(uusi);
})

//hae paikannimellä (H.V. & D.B.)
router.route('/:paikka')
    .get(function (req, res) {
        for (var kohde of paikat) {
            if (kohde.paikka == req.params.paikka) {
                res.json(kohde);
                return;
            }
        }
        res.json("{'msg': 'Ei sellaista kohdetta!'}"); //jos haetun nimistä paikkaa ei löydy (H.V. & D.B.)
    })

    .delete(function (req, res, next) {
        for (let kohde in paikat) {
            if (paikat[kohde].paikka == req.params.paikka) {
                paikat.splice(kohde, 1);

                fs.writeFile('paikat.json', JSON.stringify(paikat), (err) => {
                })
                res.json('kohde poistettu');
                return;
            }
        }
        res.json('kohdetta ei löytynyt');
    });

module.exports = router;