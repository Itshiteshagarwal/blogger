const mongoose = require("mongoose");


const mongoUrl = "mongodb+srv://agarwalhitesh551:ATW9fBcJ6hJKfUnh@cluster0.bnytyvd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async()=>{
    await  mongoose.connect(mongoUrl);
    console.log("connect to mongo");
}

module.exports = connectToMongo;