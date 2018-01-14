var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
});

UserSchema.pre('save', function (next){
    if(this.isNew) {

    }
    next()
})

UserSchema.statics = {
    fetch: function (cb){
        return this.find({}).sort('age').exec(cb);
    },
    findById: function (id,cb) {
        return this.findOne({_id:id}).sort('age').exec(cb);
    }
}

module.exports = UserSchema;