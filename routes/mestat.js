var express = require('express');
var router = express.Router();
var fs = require("fs");

var paikat = require("../paikat.json") //tämä johtaa GETin json-tiedostoon (H.V. & D.B.)

//tuo näkyviin koko lista (H.V. & D.B.)
router.get('/', function (req, res) {
    res.send(paikat);

})

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
