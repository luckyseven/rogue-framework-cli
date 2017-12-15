module.exports = (rogue) => {

    return new rogue.mongoose.Schema({
        firstname: String,
        lastname: String
    }, {
        versionKey: false
    });
};