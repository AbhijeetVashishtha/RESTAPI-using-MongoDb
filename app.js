const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');


require('dotenv').config();

const app = express();
const userRoutes = require('./routes/restapi');

app.use(express.json());
app.use(cors());
app.use('/user', userRoutes);

app.use(express.static(path.join(__dirname, 'view')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'userdetails.html'));
  });


mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    app.listen(process.env.PORT || 3000);
    console.log('Connected!');
})
.catch((err) => {
    console.log(err);
})