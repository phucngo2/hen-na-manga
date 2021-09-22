const cryptoRandomString = require("crypto-random-string");
const bcrypt = require("bcrypt");

const User = require("../../models/User");
const { sendMail } = require("../../utils/emailHandler");

module.exports = {
    Query: {
        verifyResetToken: async (parent, { resetToken }) => {
            const existResetToken = await User.findOne({
                "recover.token": resetToken,
            });

            if (!existResetToken) {
                throw new Error("Verify failed!");
            }

            if (existResetToken.recover.expiresIn < new Date().toISOString()) {
                throw new Error("Token expired!");
            }

            return "OK!";
        },
    },

    Mutation: {
        forgotPassword: async (parent, { email }) => {
            const existUser = await User.findOne({ email });

            if (!existUser) {
                throw new Error("Email does not exist in our data!");
            }

            var resetToken = "";
            while (true) {
                // Generate new fileName and check if name exist in db
                resetToken = cryptoRandomString({
                    length: 32,
                    type: "url-safe",
                });

                const existTokenCount = await User.countDocuments({
                    "recover.token": resetToken,
                });

                if (existTokenCount === 0) break;
            }

            try {
                await sendMail(existUser.email, resetToken);
            } catch (err) {
                throw new Error("Failed to send mail!");
            }

            existUser.recover = {
                token: resetToken,
                // Date.now + 20 min
                expiresIn: new Date(
                    new Date().getTime() + 20 * 60000
                ).toISOString(),
            };

            await existUser.save();

            return "We sent you an email to recover password!";
        },

        recoverPassword: async (parent, { resetToken, password }) => {
            const existUser = await User.findOne({
                "recover.token": resetToken,
            });

            if (!existUser) {
                throw new Error("Verify faild!");
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);
            existUser.password = hashedPassword;

            existUser.recover = undefined;

            await existUser.save();

            return "Recovered account successfully, now you can login!";
        },
    },
};
