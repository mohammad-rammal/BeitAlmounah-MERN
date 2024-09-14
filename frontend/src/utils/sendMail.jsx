const { config } = require("dotenv");
const nodemailer = require("nodemailer");
const path = require("path"); // Import the path module

require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 589,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL_ADDRESS,
        pass: process.env.USER_EMAIL_PASSWORD
    },
})


const mailOptions = {
    from: {
        name: 'Beit Almonah',
        address: process.env.USER_EMAIL_ADDRESS
    },
    to: ["zainabkaraki5@gmail.com"], // Specify at least one recipient email address
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
    attachments: [
        {
            filename: 'order.png',
            path: path.join(__dirname, 'order.png'),
            contentType: 'image/png'
        }
    ]
}


const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions); // Pass mailOptions here
        console.log("email sent");
    } catch (error) {
        console.log(error);
    }
}

sendMail(transporter, mailOptions);
