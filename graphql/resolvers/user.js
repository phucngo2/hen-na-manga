const bcrypt = require("bcrypt");

const User = require("../../models/User");
const Session = require("../../models/Session");
const Comment = require("../../models/Comment");
const { deleteAvatar, writeAvatar } = require("../../utils/cloudinaryHandler");
const { authenticate } = require("../../utils/tokenHandler");
const { UserInputError } = require("apollo-server-errors");

module.exports = {
    Query: {
        getUser: async (parent, { userId }) => {
            try {
                const existUser = await User.findById(userId);

                if (!existUser) {
                    throw new Error("user not found");
                }

                return {
                    id: userId,
                    avatar: existUser.avatar,
                    email: existUser.email,
                };
            } catch (err) {
                throw new Error(err);
            }
        },

        paginateUser: async (parent, { page, limit, keyword = "" }) => {
            try {
                const skip = (page - 1) * limit;

                const userCount = await User.countDocuments({
                    $or: [
                        { username: { $regex: keyword, $options: "i" } },
                        { email: { $regex: keyword, $options: "i" } },
                    ],
                });

                const users = await User.find({
                    $or: [
                        { username: { $regex: keyword, $options: "i" } },
                        { email: { $regex: keyword, $options: "i" } },
                    ],
                })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit);

                return {
                    userCount,
                    users,
                };
            } catch (err) {
                throw new Error(err);
            }
        },
    },

    Mutation: {
        updateAvatar: async (parent, { userId, avatar }, context) => {
            const user = authenticate(context);

            if (!user || user.id !== userId) {
                throw new Error("Action not allowed!");
            }

            // Await upload
            const avatarFile = await avatar;

            const existUser = await User.findById(userId);

            if (!existUser) throw new Error("User not found!");

            if (existUser.avatar) {
                const avatarArr = existUser.avatar.split("/");
                const fileName = avatarArr[avatarArr.length - 1];

                await deleteAvatar(fileName);
            }

            const newAvatarUrl = await writeAvatar(avatarFile);

            // Update avtar url in db
            existUser.avatar = newAvatarUrl;
            await existUser.save();

            return "Avatar updated successfully!";
        },

        updateProfile: async (parent, { userId, email }, context) => {
            const user = authenticate(context);

            if (!user || user.id !== userId) {
                throw new Error("Action not allowed!");
            }

            const existUser = await User.findById(userId);

            if (!existUser) {
                throw new Error("User not found!");
            }

            const existEmailUser = await User.findOne({ email });

            if (existEmailUser && existEmailUser.id !== existUser.id) {
                throw new Error("Email has already existed!");
            }

            existUser.email = email;
            await existUser.save();

            return "Email updated successfully!";
        },

        updatePassword: async (
            parent,
            { userId, oldPassword, password },
            context
        ) => {
            const user = authenticate(context);

            if (!user || user.id !== userId) {
                throw new Error("Action not allowed!");
            }

            const existUser = await User.findById(userId);

            if (!existUser) {
                throw new Error("User not found!");
            }

            // Check password
            const match = await bcrypt.compare(oldPassword, existUser.password);
            if (!match) {
                throw new UserInputError("Wrong credential!");
            }

            existUser.password = await bcrypt.hash(password, 12);
            await existUser.save();

            return "Password updated successfully!";
        },

        deleteUser: async (parent, { userId }, context) => {
            const user = authenticate(context);

            if (!user || (user.id !== userId && !user.isAdmin)) {
                throw new Error("Action not allowed!");
            }

            const existUser = await User.findById(userId);

            if (!existUser) {
                throw new Error("User not found!");
            }

            // Delete avatar
            if (existUser.avatar) {
                const avatarArr = existUser.avatar.split("/");
                const fileName = avatarArr[avatarArr.length - 1];

                await deleteAvatar(fileName);
            }

            // Delete session
            await Session.deleteMany({ userId });

            // Delete comments
            await Comment.deleteMany({ user: { $in: userId } });

            // Delete user
            await User.deleteOne({ _id: userId });
            return "User deleted!";
        },
    },
};
