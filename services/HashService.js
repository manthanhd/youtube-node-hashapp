function HashService(bcrypt) {
    const SALT_WORK_FACTOR = 10;

    this.textToHash = function(text, callback) {
        if(!callback) {
            throw new Error("Callback to hash service must be defined!");
        }
        // generate a salt
        return bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
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
