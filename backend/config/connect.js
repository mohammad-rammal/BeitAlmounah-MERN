const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI_CLOUD, {
 
        });
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Connection Failed To MongoDB!", error);
    }
};



module.exports = { connectToDB };

