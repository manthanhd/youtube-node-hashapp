function HashService(bcrypt) {
    const DEFAULT_SALT_WORK_FACTOR = 10;

    this.textToHash = function(text, workFactor, callback) {
        if(!workFactor) {
            workFactor = DEFAULT_SALT_WORK_FACTOR;
        }

        if(!callback) {
            throw new Error("Callback to hash service must be defined!");
        }
        // generate a salt
        return bcrypt.genSalt(workFactor, function (err, salt) {
            if (err) {
                console.error(err);
                return callback(err);
            }

            // hash the password using our new salt
            return bcrypt.hash(text, salt, function (err, hash) {
                if (err) {
                    console.error(err);
                    return callback(err);
                }

                return callback(undefined, {hash: hash, workFactor: workFactor});
            });
        });
    };

    return this;
}

module.exports = HashService;
