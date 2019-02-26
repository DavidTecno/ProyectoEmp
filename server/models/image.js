var mongoose = require("mongoose");

var ImageSchema = new mongoose.Schema({
    filename: String,
    created: {
        type: Date,
        default: Date.now
    },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
});

module.exports = mongoose.model("Image", ImageSchema);