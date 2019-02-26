var mongoose = require("mongoose");

var ClientSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    phone: { type: Number, unique: true},
    direction: { type: String}
});

module.exports = mongoose.model("Client", ClientSchema);