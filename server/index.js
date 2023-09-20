const express = require('express');
const cors = require('cors')
require('./db');
const dotenv = require('dotenv').config()
const Data = require('./DataModel');

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true // to allow cookies to be sent with the request
}));

app.use(express.json());

const requestLogger = (req, res, next) => {

    console.log(`${req.method} ${req.originalUrl} - ${new Date()}`);
    next();
};
app.use(express.json({ limit: '50mb' }));

app.use(requestLogger);


const port = 8000;

app.get('/', (req, res) => {
    res.send({ code: '200', message: 'Welcome To Coffee Api' })
})



app.get('/api/coffee', async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/api/coffee', async (req, res) => {
    try {
        const insertedData = await Data.insertMany(req.body);
        res.status(201).json(insertedData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
