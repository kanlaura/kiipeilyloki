var express = require('express');
var router = express.Router();
var fs = require("fs");




var paikat = require("../paikat.json") //tämä johtaa GETin json-tiedostoon (H.V. & D.B.)

//tuo näkyviin koko lista (H.V. & D.B.)

router.get('/', function (req, res) {
    res.send(paikat);



});


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
            fs.writeFile("paikat.json", JSON.stringify(paikat),(err)=> {
                if (err) throw err;
            res.json({Viesti:'Muutettu'});
            return;
            })
            }
        }
        res.status(404);
        res.json("{'msg': 'Tämän nimistä paikkaa ei löytynyt!'}");
    });


//lisää uusi kohde (H.V. & D.B.)
router.post("/", function(req,res) {
    let uusi = req.body;
    paikat.push(uusi);
    fs.writeFile("paikat.json", JSON.stringify(paikat),(err)=> {
        if (err) throw err;
        res.end(respdata);
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

