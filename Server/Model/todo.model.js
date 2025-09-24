const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    status: { type: String, enum: ["Pending", "In-Progress", "Completed", "Closed"], default: "Pending" },
    description: { type: String, required: true },
    priority: { type: String, required: true },
}, {
    timestamps: true,
    versionKey: false
});

const todoModel = mongoose.model("todo", todoSchema);

module.exports = { todoModel };