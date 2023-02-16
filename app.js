const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const userRoutes = require('./routes/restapi');

app.use(express.json());
app.use(cors());
app.use('/user', userRoutes);


mongoose.connect('mongodb+srv://abhi:abhi12345@cluster0.ejgxefl.mongodb.net/userDetails?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000);
    console.log('Connected!');
})
.catch((err) => {
    console.log(err);
})