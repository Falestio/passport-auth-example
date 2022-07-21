const express = require('express');
const app = express();

app.use(express.json());

const user = { id: 1, email: 'admin@gmail.com', password: 'admin' }

function verifyUser(email, password){
    if(email === user.email && password === user.password){
        return true;
    }
}

app.post('/login', (req, res) => {
    if(verifyUser(req.body.email, req.body.password)){
        res.send('Login success');
    }
})

// =================================================================================

app.get('/failure', (req, res) => {
    res.send("Login failed")
})

app.get('/dashboard', (req, res) => {
    res.send("this is the dashboard, you succesfully logged in")
})

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(3000, () => {
    console.log("listening on port 3000")
})