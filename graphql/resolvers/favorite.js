const mongoose = require("mongoose");
const Manga = require("../../models/Manga");
const User = require("../../models/User");
const { authenticate } = require("../../utils/tokenHandler");

module.exports = {
    Query: {
        paginateFavorite: async (
            parent,
            { userId, page, limit, keyword = "" }
        ) => {
            const existUser = await User.findById(userId);

            if (!existUser) {
                throw new Error("Not Found!");
            }

            const skip = (page - 1) * limit;

            const mangaCount = await Manga.countDocuments({
                _id: {
                    $in: existUser.favorites,
                },
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { alias: { $regex: keyword, $options: "i" } },
                    { artist: { $regex: keyword, $options: "i" } },
                    { group: { $regex: keyword, $options: "i" } },
                ],
            });

            const mangas = await Manga.find({
                _id: {
                    $in: existUser.favorites,
                },
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { alias: { $regex: keyword, $options: "i" } },
                    { artist: { $regex: keyword, $options: "i" } },
                    { group: { $regex: keyword, $options: "i" } },
                ],
            })
                .skip(skip)
                .limit(limit);

            return {
                mangaCount,
                mangas,
            };
        },
    },

    Mutation: {
        favoriteManga: async (parent, { userId, mangaId }, context) => {
            const user = authenticate(context);

            if (!user || user.id !== userId) {
                throw new Error("Action not allowed!");
            }

            const existUser = await User.findById(userId);
            const existManga = await Manga.findById(mangaId);

            if (!existUser || !existManga) {
                throw new Error("Not found!");
            }

            const newMangaId = mongoose.Types.ObjectId(mangaId);

            if (existUser.favorites.includes(newMangaId)) {
                // Remove favorite from list
                existUser.favorites = existUser.favorites.filter(
                    (id) => !id.equals(newMangaId)
                );
                // Decrease favoriteCount
                existManga.favoriteCount--;
            } else {
                // Add favorite to list
                existUser.favorites.unshift(newMangaId);
                // Increase favoriteCount
                existManga.favoriteCount++;
            }

            // Save changes
            await existUser.save();
            await existManga.save();

            return existManga.code;
        },
    },
};
