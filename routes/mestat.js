var express = require('express');
var router = express.Router();
var fs = require("fs");

var paikat = require("../paikat.json") //tämä johtaa GETin json-tiedostoon

router.get('/', function (req, res) {
    res.send(paikat);

});
router.post("/", function (req, res) {
    let uusi = req.body;
    paikat.push(uusi);
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
        res.json("{'msg': 'Ei sellaista kohdetta!'}");
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
    })

module.exports = router;
