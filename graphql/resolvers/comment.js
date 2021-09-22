const mongoose = require("mongoose");
const Comment = require("../../models/Comment");
const User = require("../../models/User");

const { authenticate } = require("../../utils/tokenHandler");

module.exports = {
    Query: {
        listCommentsByMangaId: async (parent, { mangaId }) => {
            try {
                const comments = await Comment.find({
                    manga: { $in: mangaId },
                })
                    .sort({ createdAt: -1 })
                    .populate("user");

                return comments;
            } catch (err) {
                throw new Error(err);
            }
        },

        listCommentsByUserId: async (
            parent,
            { userId, page, limit, keyword = "" }
        ) => {
            try {
                const existUser = await User.findById(userId);

                if (!existUser) {
                    throw new Error("User not found!");
                }

                const skip = (page - 1) * limit;

                const commentCount = await Comment.countDocuments({
                    user: { $in: userId },
                    body: { $regex: keyword, $options: "i" },
                });

                const comments = await Comment.find({
                    user: { $in: userId },
                    body: { $regex: keyword, $options: "i" },
                })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .populate("manga");

                return {
                    commentCount,
                    comments,
                };
            } catch (err) {
                throw new Error(err);
            }
        },

        listFlaggedComments: async (parent, { page, limit, keyword = "" }) => {
            try {
                const skip = (page - 1) * limit;

                const commentCount = await Comment.countDocuments({
                    body: { $regex: keyword, $options: "i" },
                    "flags.0": { $exists: true },
                });

                const comments = await Comment.find({
                    body: { $regex: keyword, $options: "i" },
                    "flags.0": { $exists: true },
                })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit)
                    .populate("manga")
                    .populate("user");

                return {
                    commentCount,
                    comments,
                };
            } catch (err) {
                throw new Error(err);
            }
        },
    },

    Mutation: {
        addComment: async (parent, { mangaId, body }, context) => {
            const user = authenticate(context);

            if (!user) {
                throw new Error("Action not allowed!");
            }

            const existUser = await User.findById(user.id);

            if (!existUser) {
                throw new Error("User not found!");
            }

            const newComment = new Comment({
                manga: new mongoose.Types.ObjectId(mangaId),
                user: new mongoose.Types.ObjectId(user.id),
                body,
                createdAt: new Date().toISOString(),
            });

            const result = await newComment.save();
            await result.populate("user");

            return result;
        },

        removeComment: async (parent, { commentId }, context) => {
            const existComment = await Comment.findById(commentId);

            if (!existComment) {
                throw new Error("Not Found!");
            }

            const user = authenticate(context);

            if (
                !user ||
                (!existComment.user.equals(user.id) && !user.isAdmin)
            ) {
                throw new Error("Action not allowed!");
            }

            await Comment.deleteOne({ _id: commentId });

            return "Comment deleted!";
        },

        flagComment: async (parent, { commentId, body }, context) => {
            const user = authenticate(context);

            if (!user) {
                throw new Error("Action not allowed!");
            }

            const existComment = await Comment.findById(commentId);

            if (!existComment) {
                throw new Error("Not Found!");
            }

            if (!existComment.flags) {
                existComment.flasg = [];
            }

            existComment.flags.unshift({
                username: user.username,
                body,
                createdAt: new Date().toISOString(),
            });

            await existComment.save();

            return "Your report was sent to admin and waiting to be approve...";
        },

        unflagComment: async (parent, { commentId, body }, context) => {
            const user = authenticate(context);

            if (!user || !user.isAdmin) {
                throw new Error("Action not allowed!");
            }

            const existComment = await Comment.findById(commentId);

            if (!existComment) {
                throw new Error("Not Found!");
            }

            existComment.flags = undefined;

            await existComment.save();

            return "Ok!";
        },
    },
};
