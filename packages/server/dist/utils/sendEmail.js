"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
exports.sendEmail = async (email, link) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true,
        auth: {
            user: 'apikey',
            pass: process.env.SENDGRID_API_KEY,
        },
    });
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: email,
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: `<b>Hello world?</b> <a href="${link}">confirm Email</a>`,
    });
    console.log('Message sent: %s', info.messageId);
};
//# sourceMappingURL=sendEmail.js.map