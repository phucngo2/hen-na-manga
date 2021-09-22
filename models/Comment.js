const { model, Schema } = require("mongoose");

const CommentSchema = new Schema({
    manga: { type: Schema.Types.ObjectId, ref: "Manga" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    body: String,
    createdAt: String,
    flags: [
        {
            username: String,
            body: String,
            createdAt: String,
        },
    ],
});

module.exports = model("Comment", CommentSchema);
