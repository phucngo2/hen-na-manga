const { model, Schema } = require("mongoose");

const SessionSchema = new Schema({
    userId: String,
    token: String,
});

module.exports = model("Session", SessionSchema);
