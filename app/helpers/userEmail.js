
const nodemailer = require('nodemailer');

const userEmail = async (user) => {
    try {

        const testAccount = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass
            }
        });

        const info = await transporter.sendMail({
            from: user.from,
            to: user.to,
            subject: user.subject,
            text: user.text,
            html: user.html
        });
         return info
    } catch (error) {
        return error
    }
}

module.exports = {
    userEmail
}
