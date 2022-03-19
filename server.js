const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const enforce = require('express-sslify');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(enforce.HTTPS({ trustProtoHeader: true }));


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    });
}

const userRouter = require('./routers/users');
const sectionRouter = require('./routers/section');
const collectionRouter = require('./routers/collections');
const paymentRouter = require('./routers/payment');


app.use('/users', userRouter);
app.use('/sections', sectionRouter);
app.use('/collections', collectionRouter);
app.use('/payment', paymentRouter);

app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'))
});


//DB

mongoose.connect(process.env.CONNECTION_URL).then(() => {
    console.log("DB is ready"); 
    
})
    .catch(err => {
        console.log(err);
    });

//server
app.listen(process.env.PORT , () => {
    console.log(`Server is running http://localhost:${process.env.PORT}`);
});