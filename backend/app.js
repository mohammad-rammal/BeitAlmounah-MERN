const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const nodemailer = require('nodemailer');
const xss = require("xss-clean");
const helmet = require("helmet");
const hpp = require("hpp");
const rateLimiting = require("express-rate-limit");
const creditCardRoutes = require("./routes/creditCard");
const ordersRoutes = require("./routes/orders");
const productsRouter = require("./routes/products");
const usersRoutes = require("./routes/users");
const workshopRoutes = require("./routes/workshop");
const workshopChatRoutes = require("./routes/workshopChat");
const workshopParticipantsRoutes = require("./routes/workshopParticipants");
const authPath = require("./routes/auth");
const passPath = require("./routes/passwordRoute");
const paymentsController = require('./controllers/paymentsController');

const categoryPath = require("./routes/categoriesRoute");
const emailRoutes = require("./routes/contact");
const postsRouter = require("./routes/postsRoute");
const categoriesRouter = require("./routes/categoriesRoute");

const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errors");
const { connectToDB } = require("./config/connect");

const bodyParser = require("body-parser");
const swaggerSetup = require("./swagger");
dotenv.config();

// Connection To Database
connectToDB();

// Initialize App
const app = express();

// Apply Middlewares
app.use(express.json());
app.use(logger);

//Security Headers (helmet)
app.use(helmet());

//Prevent Http Param Pollution
app.use(hpp());

// Prevent XSS(Cross Site Scripting) Attacks
app.use(xss());

// Rate Limiting
app.use(rateLimiting({
    window: 5 * 60 * 1000, //5 mins
    max: 300,
}));

//Cors Policy
app.use(cors({
    origin: 'http://localhost:3000',
}));


// app.options('/api/send-email', (req, res) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'POST');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     // Respond with a 200 status code to indicate that the actual request is allowed
//     res.sendStatus(200);
// });


// Routes
app.use("/api/credit-cards", creditCardRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRoutes);
app.use("/api/workshops", workshopRoutes);
app.use("/api/workshop-chat", workshopChatRoutes);
app.use("/api/workshop-participants", workshopParticipantsRoutes);
app.use("/api/auth", authPath);
app.use("/api/password", passPath);
app.use("/api/categories", categoryPath);
app.use("/api/posts", postsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/send-email", emailRoutes);

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)



app.post('/api/payments', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd'
        });
        res.status(200).send(paymentIntent.client_secret);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

function sendmailPorduct({ email, subject, message }) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "beitalmonah@gmail.com",
                pass: "lsyq whia kurd bpmx",
            }
        });

        const mail_configs = {
            from: "beitalmonah@gmail.com",
            to: email,
            subject: "Payment Processed Successfully",
            html: `<div style="font-family: Arial, sans-serif; font-size: 14px;">
                    <p>Dear,</p>
                    <p style="margin-bottom: 15px;">We are delighted to inform you that your recent payment has been processed successfully. Thank you for your prompt action in settling the outstanding amount.</p>
                    <p style="margin-bottom: 15px;">If you have any questions or require further assistance, please don't hesitate to contact us. We're here to help!</p>
                    <p style="margin-bottom: 15px;">Thank you for choosing Beit almonah. We appreciate your business and look forward to serving you again in the future.</p>
                    <p>Best regards,</p>
                    <img src="https://res.cloudinary.com/dftxzx2zc/image/upload/v1708183455/zxzfgtktpxar4phfc6ss.png" alt="Order Image" style="display: block; max-width: 100%; height: auto; margin-top: 15px;">
                  </div>`,
            attachments: [
                {
                    filename: 'order.png',
                    path: 'https://res.cloudinary.com/dftxzx2zc/image/upload/v1708183455/zxzfgtktpxar4phfc6ss.png',
                    cid: 'unique@beitalmonah.com' // same cid value as in the html img src
                }
            ]
        };


        transporter.sendMail(mail_configs, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: `An error happened` })
            }
            return resolve({ message: "Order confirm email sent successfully." });
        });

    });
}

function sendEmail({ email, subject, message }) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "beitalmonah@gmail.com",
                pass: "lsyq whia kurd bpmx",
            }
        });

        const mail_configs = {
            from: email,
            to: "beitalmonah@gmail.com",
            subject: subject,
            text: message,
        };

        transporter.sendMail(mail_configs, function (error, info) {
            if (error) {
                console.log(error);
                return reject({ message: `An error happened` })
            }
            return resolve({ message: "Email sent successfully." });
        });

    });
}


app.get("/sendmail", (req, res) => {
    sendEmail(req.query)
        .then((response) => response.send(response.message))
        .catch((error) => res.status(500).send(error.message));
});
app.get("/sendmailPorduct", (req, res) => {
    sendmailPorduct(req.query)
        .then((response) => response.send(response.message))
        .catch((error) => res.status(500).send(error.message));
});





app.use(bodyParser.json());

// Load Swagger documentation
swaggerSetup(app);

app.use((req, res, next) => {
    console.log('Request Headers:', req.headers);
    next();
});




// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

// Running The Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));

app.get("/api/users", (req, res) => {
    res.status(200).json(users);
});


module.exports = app 