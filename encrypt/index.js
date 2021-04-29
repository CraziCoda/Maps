const bcrypt = require('bcryptjs');

function hash(value){
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(value, salt);
}

function confirm(value, hash){
    return bcrypt.compare(value, hash);
}

module.exports = {hash, confirm}