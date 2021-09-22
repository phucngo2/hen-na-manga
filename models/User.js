const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    avatar: String,
    createdAt: String,
    isAdmin: Boolean,
    favorites: [{ type: Schema.Types.ObjectId, ref: "Manga" }],
    recover: {
        token: String,
        expiresIn: String,
    },
});

module.exports = model("User", UserSchema);
