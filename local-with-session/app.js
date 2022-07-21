const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const app = express();
const mongoURI = 'mongodb://localhost:27017/local-with-session'

mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))

app.use(express.json());

const user = { id: 1, email: 'admin@gmail.com', password: 'admin' }

function verifyUser(email, password){
    if(email === user.email && password === user.password){
        return true;
    }
}

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: mongoURI}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    }
}))

app.post('/login', (req, res) => {
    if(verifyUser(req.body.email, req.body.password)){
        req.session.authorized = true;
        req.session.user = user
        res.send('Login success');
    }
})

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logout success');
})

app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/dashboard', (req, res) => {
    if(req.session.authorized){
        res.send("this is the dashboard, you succesfully logged in")
    } else {
        res.send("You are not logged in")
    }
})

app.listen(3000, () => {
    console.log("app listening on port 3000")
})