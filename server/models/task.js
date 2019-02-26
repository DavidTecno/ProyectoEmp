var mongoose = require("mongoose");

var TaskSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    category: { type: String, required: true},
    hour: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        day: Date,
        duration: Number,
    }],
});

module.exports = mongoose.model("Task", TaskSchema);