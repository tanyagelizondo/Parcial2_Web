let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let userSchema = mongoose.Schema({
    name: { type: String, require: true },
    jobTitle: {type:String},
    jobDescription: {type: Array},
    startDate: {type: String},
    endDate: {type: String}
});

let User = mongoose.model('data', userSchema);

let UserList = {
    get: function (name) {
        if (name) {
            return User.findOne({ name: name })
                .then(user => {
                    return user;
                })
                .catch(error => {
                    throw Error(error);
                });
        } else {
            return User.find()
                .then(users => {
                    return users;
                })
                .catch(error => {
                    throw Error(error);
                });
        }

    },
    
//este es el post
    register: function(newUser) {
        return User.create(newUser)
            .then(user => {
                return user;
            })
            .catch(err => {
                throw Error(err);
            });
    }
};

module.exports = {UserList};