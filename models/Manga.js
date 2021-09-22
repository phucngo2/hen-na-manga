const { model, Schema } = require("mongoose");

const MangaSchema = new Schema({
    code: Number,
    name: String,
    alias: String,
    language: String,
    artist: String,
    group: String,
    tags: [String],
    category: String,
    parodies: [String],
    characters: [String],
    uploadedAt: String,
    pages: [
        {
            pageNumber: Number,
            pageSrc: String,
        },
    ],
    viewCount: Number,
    favoriteCount: Number,
});

module.exports = model("Manga", MangaSchema);
