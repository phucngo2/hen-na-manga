var nodemailer = require("nodemailer");

const { MAIL_FROM, MAIL_PWD, CLIENT_URL } = require("../config");

exports.sendMail = async (userEmail, resetToken) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: MAIL_FROM,
            pass: MAIL_PWD,
        },
    });

    const mailOptions = {
        from: MAIL_FROM,
        to: userEmail,
        subject: "[H] Password Recovery",
        html: getHtmlBody(resetToken),
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
};

function getHtmlBody(resetToken) {
    return `Click the button to reset your password<br><br><a href="${CLIENT_URL}/recover/${resetToken}"><button style=\"background-color: green;border: none; border-radius: 8rem;height: 40px; width: 120px;color: white;\">Reset Password</button></a><br><br>This link will expired after 30 minutes!`;
}
