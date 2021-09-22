const Manga = require("../../models/Manga");
const { UserInputError } = require("apollo-server-express");

const {
    writeMangaPages,
    deleteMangaDir,
} = require("../../utils/cloudinaryHandler");
const { authenticate, verifyToken } = require("../../utils/tokenHandler");
const User = require("../../models/User");
const Comment = require("../../models/Comment");

module.exports = {
    Query: {
        listMangas: async () => {
            try {
                const mangas = await Manga.find();
                return mangas;
            } catch (err) {
                throw new Error(err);
            }
        },

        paginateManga: async (parent, { page, limit, keyword = "" }) => {
            try {
                const skip = (page - 1) * limit;

                const mangaCount = await Manga.countDocuments({
                    $or: [
                        { name: { $regex: keyword, $options: "i" } },
                        { alias: { $regex: keyword, $options: "i" } },
                        { artist: { $regex: keyword, $options: "i" } },
                        { group: { $regex: keyword, $options: "i" } },
                    ],
                });

                const mangas = await Manga.find({
                    $or: [
                        { name: { $regex: keyword, $options: "i" } },
                        { alias: { $regex: keyword, $options: "i" } },
                        { artist: { $regex: keyword, $options: "i" } },
                        { group: { $regex: keyword, $options: "i" } },
                    ],
                })
                    .sort({ uploadedAt: -1 })
                    .skip(skip)
                    .limit(limit);

                return {
                    mangaCount,
                    mangas,
                };
            } catch (err) {
                throw new Error(err);
            }
        },

        listPopularMangas: async () => {
            try {
                const mangas = await Manga.find()
                    .sort({ viewCount: -1 })
                    .limit(5);

                return mangas;
            } catch (err) {
                throw new Error(err);
            }
        },

        getManga: async (parent, { mangaId }) => {
            try {
                const manga = await Manga.findById(mangaId);
                return manga;
            } catch (err) {
                throw new Error(err);
            }
        },

        getMangaDetail: async (parent, { mangaCode }, context) => {
            try {
                // Get manga by code
                const manga = await Manga.findOne({ code: mangaCode });

                // Count view
                manga.viewCount++;
                await manga.save();

                // Check if user already favorited this manga
                var isFavorited = false;
                const user = verifyToken(context);

                if (user) {
                    const existUser = await User.findById(user.id);

                    if (existUser && existUser.favorites.includes(manga.id)) {
                        isFavorited = true;
                    }
                }

                return {
                    ...manga._doc,
                    id: manga.id,
                    isFavorited,
                };
            } catch (err) {
                throw new Error(err);
            }
        },

        searchManga: async (
            parent,
            {
                searchInput: {
                    page,
                    limit,
                    keyword = "",
                    tags,
                    category,
                    language,
                    filter,
                },
            },
            context
        ) => {
            try {
                const searchOption = getSearchOption(
                    keyword,
                    tags,
                    category,
                    language
                );

                const filterOption = getFilterOption(filter);

                // Count result
                const mangaCount = await Manga.countDocuments(searchOption);

                const skip = (page - 1) * limit;

                // Search manga
                const mangas = await Manga.find(searchOption)
                    .collation({ locale: "en" })
                    .sort(filterOption)
                    .skip(skip)
                    .limit(limit);

                return {
                    mangaCount,
                    mangas,
                };
            } catch (err) {
                throw new Error(err);
            }
        },

        listSimilarMangas: async (
            parent,
            { mangaId, artist, tags, category }
        ) => {
            try {
                // Array to hold id of found mangas
                var idNotInArr = [mangaId];

                // Find manga with similar artist & tags, but not duplicate id
                var mangas = await Manga.find({
                    _id: {
                        $nin: idNotInArr,
                    },
                    tags: { $in: tags },
                    artist: artist,
                }).limit(5);

                // Update id array of found mangas
                idNotInArr = [
                    ...idNotInArr,
                    ...mangas.map((manga) => manga.id),
                ];

                // If cannot find enough 5 manga -> find similar category
                if (mangas.length < 5) {
                    let limit = 5 - mangas.length;
                    const extras = await Manga.find({
                        _id: {
                            $nin: idNotInArr,
                        },
                        tags: { $in: tags },
                        category: category,
                    }).limit(limit);

                    // Update list of id again
                    idNotInArr = [
                        ...idNotInArr,
                        ...extras.map((manga) => manga.id),
                    ];

                    mangas = [...mangas, ...extras];
                }

                // If still cannot find enough 5 manga -> find similar tags
                if (mangas.length < 5) {
                    let limit = 5 - mangas.length;
                    const moreExtras = await Manga.find({
                        _id: {
                            $nin: idNotInArr,
                        },
                        tags: { $in: tags },
                    }).limit(limit);

                    // Update list of id again
                    idNotInArr = [
                        ...idNotInArr,
                        ...moreExtras.map((manga) => manga.id),
                    ];

                    mangas = [...mangas, ...moreExtras];
                }

                return mangas;
            } catch (err) {
                throw new Error(err);
            }
        },

        getRandomMangaId: async () => {
            try {
                const randomManga = await Manga.aggregate([
                    { $sample: { size: 1 } },
                ]);

                return randomManga[0].code;
            } catch (err) {
                throw new Error(err);
            }
        },
    },

    Mutation: {
        insertManga: async (parent, { mangaInput }, context) => {
            const user = authenticate(context);

            if (!user || !user.isAdmin) {
                throw new Error("Action not allowed!");
            }

            // Remove files prop. from mangaInput
            var files = mangaInput.files;
            delete mangaInput.files;

            // Find max code to handle code increment
            const findMax = await Manga.find().sort({ code: -1 }).limit(1);
            // collection.find will return an array
            const maxCodeManga = findMax[0] || {};
            const newMangaCode = maxCodeManga.code ? maxCodeManga.code + 1 : 1;

            // Write files
            const pages = await writeMangaPages(files, newMangaCode);

            // Config new manga prop
            mangaInput.code = newMangaCode;
            mangaInput.pages = pages;
            mangaInput.uploadedAt = new Date().toISOString();
            mangaInput.viewCount = 0;
            mangaInput.favoriteCount = 0;

            // Insert
            const newManga = new Manga(mangaInput);
            const result = await newManga.save();

            return result;
        },

        updateManga: async (parent, { mangaInput }, context) => {
            const user = authenticate(context);

            if (!user || !user.isAdmin) {
                throw new Error("Action not allowed!");
            }

            const manga = await Manga.findById(mangaInput.id);

            if (!manga) {
                throw new UserInputError("Error");
            }

            if (mangaInput.files.length !== 0) {
                await deleteMangaDir(manga.code);

                const pages = await writeMangaPages(
                    mangaInput.files,
                    manga.code
                );

                manga.pages = pages;
            }

            manga.name = mangaInput.name;
            manga.alias = mangaInput.alias;
            manga.artist = mangaInput.artist;
            manga.group = mangaInput.group;
            manga.language = mangaInput.language;
            manga.category = mangaInput.category;
            manga.tags = mangaInput.tags;
            manga.characters = mangaInput.characters;
            manga.parodies = mangaInput.parodies;

            const updatedManga = await manga.save();

            return updatedManga;
        },

        deleteManga: async (parent, { mangaId }, context) => {
            const user = authenticate(context);

            if (!user || !user.isAdmin) {
                throw new Error("Action not allowed!");
            }

            const existManga = await Manga.findById(mangaId);

            if (!existManga) {
                throw new UserInputError("Manga not exist!");
            }

            await deleteMangaDir(existManga.code);
            await Manga.deleteOne({ _id: mangaId });
            await Comment.deleteMany({
                manga: { $in: mangaId },
            });

            return "Manga deleted!";
        },
    },
};

function getSearchOption(keyword, tags, category, language) {
    var searchOption = {};

    if (keyword) {
        searchOption = {
            ...searchOption,
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { alias: { $regex: keyword, $options: "i" } },
                { artist: { $regex: keyword, $options: "i" } },
                { group: { $regex: keyword, $options: "i" } },
                { characters: { $regex: keyword, $options: "i" } },
                { parodies: { $regex: keyword, $options: "i" } },
            ],
        };
    }

    if (category) {
        searchOption = {
            ...searchOption,
            category: category,
        };
    }

    if (language) {
        searchOption = {
            ...searchOption,
            language: language,
        };
    }

    if (tags && tags.length > 0) {
        searchOption = {
            ...searchOption,
            tags: { $all: tags },
        };
    }

    return searchOption;
}

function getFilterOption(filter) {
    filter = filter.trim().toLowerCase();

    const filterOptions = {
        latest: { uploadedAt: -1 },
        atoz: { name: 1 },
        ztoa: { name: -1 },
        popular: { viewCount: -1 },
        favorite: { favoriteCount: -1 },
    };

    return filterOptions[filter];
}
