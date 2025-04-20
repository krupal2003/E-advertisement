const mailer = require("nodemailer");

const sendingMail = async (to, subject, text) => {
    try {
        const transporter = mailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'us210170116070@gmail.com',
                pass: 'xaqp plkg ofwz bhfe'  // Use the actual App Password
            },
            port: 587,         // Added SMTP port
            secure: false      // TLS requires `false` for Gmail
        });

        const mailOption = {
            from: '"Uday Manhas"<us210170116070@gmail.com>',
            to: to,
            subject: subject,
            text: text
        };

        const mailResponse = await transporter.sendMail(mailOption);
        console.log("Email sent successfully:", mailResponse);
        
        return mailResponse;
        
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;  // Throw the error for proper handling in calling function
    }
};

module.exports = {
    sendingMail
};
