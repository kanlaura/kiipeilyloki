var express = require('express');
var router = express.Router();
var fs = require("fs");

var paikat = require("../paikat.json") //tämä johtaa GETin json-tiedostoon

//nämä tehty POSTia varten
// var tiedot=[];
// fs.readFile("paikat.json", (err, data) => {
// tiedot = JSON.parse(data);
// })

router.get('/', function (req, res) {
    res.send(paikat);
})


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

    .delete('/:paikka', function (req, res, next) {
        for (let kohde in paikat) {
            if (paikat[kohde].paikka == req.params.paikka) {
                paikat.splice(kohde, 1);
                res.send('kohde poistettu');
                return;
            }
        }
        res.send('paikkaa ei löytynyt');
    })
    
module.exports = router;
