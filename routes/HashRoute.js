function HashRoute(express, hashService) {

    var router = express.Router();

/**
    POST /hash
    { text: "pleaseHashDis" }

    return:
    { hash: "hudbfuiwbcn3897cb23h8c3c32cb923c3" }
*/
    router.post('/', function(req, res) {
        var text = req.body.text;

        hashService.textToHash(text, function(err, hash) {
            if (err) {
                console.error(err);
                return res.status(500).send();
            }

            return res.send({hash: hash});
        });
    });

    return router;

}

module.exports = HashRoute;
