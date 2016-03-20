function HashService(bcrypt) {

    this.textToHash = function(text, callback) {
        // generate a salt
        return bcrypt.genSalt(10, function (err, salt) {
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

                return callback(undefined, hash);
            });
        });
    };

    return this;
}

module.exports = HashService;
