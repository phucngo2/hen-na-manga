const { UserInputError } = require("apollo-server-express");
const bcrypt = require("bcrypt");

const User = require("../../models/User");
const Session = require("../../models/Session");
const {
    generateToken,
    generateRefresh,
    authenticate,
    verifyRefresh,
    verifyTokenIgnoreExpiration,
} = require("../../utils/tokenHandler");

module.exports = {
    Mutation: {
        register: async (parent, { username, password }) => {
            // Check if username exist
            const existUser = await User.findOne({ username });

            if (existUser) {
                throw new UserInputError("Username is taken!");
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Insert new user
            const newUser = new User({
                username,
                password: hashedPassword,
                createdAt: new Date().toISOString(),
            });

            await newUser.save();

            return "Register successfully!";
        },

        login: async (parent, { username, password }, context) => {
            // Check username exist
            const existUser = await User.findOne({ username });

            if (!existUser) {
                throw new UserInputError("Wrong credential!");
            }

            // Check password
            const match = await bcrypt.compare(password, existUser.password);
            if (!match) {
                throw new UserInputError("Wrong credential!");
            }

            // Token handle
            const accessToken = generateToken(existUser);
            const refreshToken = generateRefresh(existUser);

            await upsertSession(existUser._id, refreshToken);

            context.res.cookie("jwt", refreshToken, {
                signed: true,
                httpOnly: true,
                maxAge: 2 * 60 * 60 * 1000, // 2 hours
                sameSite: "none",
                secure: true,
            });

            // Check user role
            const loginUser = checkRole(existUser, accessToken);
            return loginUser;
        },

        firstLogin: async (parent, params, context) => {
            const user = authenticate(context);

            if (!user) {
                throw new Error("Authentication token failed");
            }

            const existUser = await User.findById(user.id);

            if (!existUser) {
                throw new Error("Authentication token failed");
            }

            const accessToken = generateToken(existUser);
            const refreshToken = generateRefresh(existUser);

            await upsertSession(existUser._id, refreshToken);

            context.res.cookie("jwt", refreshToken, {
                signed: true,
                httpOnly: true,
                maxAge: 2 * 60 * 60 * 1000, // 2 hours
                sameSite: "none",
                secure: true,
            });

            // Check user role
            const loginUser = checkRole(existUser, accessToken);
            return loginUser;
        },

        logout: async (parent, { userId }, context) => {
            const session = await Session.findOne({ userId });

            if (session) {
                await Session.deleteOne({ userId });
            }

            context.res.cookie("jwt", "", {
                signed: true,
                httpOnly: true,
                maxAge: 0, // 2 hours
                sameSite: "none",
                secure: true,
            });

            return "Logout successfully!";
        },

        refresh: async (parent, params, context) => {
            // Get refresh token from cookie
            const authRefreshToken = context.req.signedCookies.jwt;
            // Verify refresh token
            const user = verifyRefresh(authRefreshToken);

            if (!user) {
                throw new Error("Authentication failed!");
            }

            // Get access token
            const authHeader = context.req.headers.authorization;

            if (!authHeader) {
                throw new Error("Authorization header must be provided");
            }

            // Bearer [token]
            const token = authHeader.split("Bearer ")[1];

            if (!token) {
                throw new Error("Authentication token failed");
            }

            // Verify access token
            const accessTokenUser = verifyTokenIgnoreExpiration(token);

            // If data on both token are different users
            if (accessTokenUser.id !== user.id) {
                throw new Error("Authentication failed!");
            }

            // Find refresh token on Session
            const existToken = await Session.findOne({
                token: authRefreshToken,
            });

            if (!existToken) {
                throw new Error("Authentication failed!");
            }

            // Wrong credential
            if (existToken.userId !== user.id) {
                throw new Error("Authentication failed!");
            }

            const accessToken = generateToken(user);
            const refreshToken = generateRefresh(user);

            await upsertSession(user.id, refreshToken);

            context.res.cookie("jwt", refreshToken, {
                signed: true,
                httpOnly: true,
                maxAge: 2 * 60 * 60 * 1000, // 2 hours
                sameSite: "none",
                secure: true,
            });

            // Check user role
            const loginUser = checkRole(user, accessToken);
            return loginUser;
        },
    },
};

async function upsertSession(userId, refreshToken) {
    const existSession = await Session.findOne({ userId });

    if (existSession) {
        existSession.token = refreshToken;

        await existSession.save();
    } else {
        const newSession = new Session({
            userId: userId,
            token: refreshToken,
        });

        await newSession.save();
    }
}

function checkRole(existUser, accessToken) {
    if (existUser.isAdmin) {
        return {
            id: existUser._id,
            username: existUser.username,
            token: accessToken,
            isAdmin: existUser.isAdmin,
            avatar: existUser.avatar,
        };
    }

    return {
        id: existUser._id,
        username: existUser.username,
        token: accessToken,
        avatar: existUser.avatar,
    };
}
