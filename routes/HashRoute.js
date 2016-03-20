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
        var workFactor = parseInt(req.body.workFactor);

        if(!text) {
            return res.status(400).send({
                error: "Field must exist.",
                affectedField: "text"
            });
        } else if(req.body.workFactor && isNaN(workFactor)) {
            return res.status(400).send({
                error: "Field must be a number if specified.",
                affectedField: "workFactor"
            });
        }

        try{
            hashService.textToHash(text, workFactor, function(err, hashObject) {
                if (err) {
                    console.error(err);
                    return res.status(500).send();
                }

                return res.send({
                    hash: hashObject.hash,
                    workFactor: hashObject.workFactor
                });
            });
        } catch (e) {
            return res.status(500).send();
        }
    });

    return router;

}

module.exports = HashRoute;
