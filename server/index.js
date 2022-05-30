const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');
const app = new express();
const mongoURI = 'mongodb://127.0.0.1:27017/sessions';

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
}))

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res => console.log("MongoDB Connected") );

const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'auth-sessions'
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'CHANGE_THAT',
    resave: false,
    saveUninitialized: false,
    store
}));

app.use('/auth', require('./routes/auth') );

app.use('/user', require('./routes/user') );

app.listen(666, console.log("Server started"));