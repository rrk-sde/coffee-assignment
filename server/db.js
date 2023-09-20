const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);


const MONGO_ATLAS_URI = process.env.MONGO_ATLAS_URI;


(async () => {
    try {
        await mongoose.connect(MONGO_ATLAS_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Error in DB connection:', err);
    }
})();