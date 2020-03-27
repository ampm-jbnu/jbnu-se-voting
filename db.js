import mongoose from 'mongoose';

require('dotenv').config();

let db = mongoose.connection;

const handleOpen = function() {
    console.log('Connected to DB');   
}

const handleError = function() {
    console.log('Error on DB Connection:${error}');   
}

db.once("open", handleOpen);
db.on("error", handleError);

mongoose.connect(
    "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

export default db;