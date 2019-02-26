var mongoose = require("mongoose");

var ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    //Usar si quieres guardar los clientes en la base de datos
    //client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    client: String,
    firstDate: { type: Date, required: true},
    finishDate: Date,
    limitDate: { type: Date, required: true},
});

module.exports = mongoose.model("Project", ProjectSchema);