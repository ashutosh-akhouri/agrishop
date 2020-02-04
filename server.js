var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var app = express();

var dbOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, auto_reconnect: true };

mongoose.connect("mongodb+srv://bz:bz@cluster0-li9qp.mongodb.net/agrishop?retryWrites=true&w=majority", dbOptions);

mongoose.connection.on('connected', function () {

    console.log("Connected to DB");

})

mongoose.connection.on('error', function (err) {

    console.log("Error while connecting to DB: " + err);

})


var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    promotionOpted: Boolean,
});

var User = mongoose.model('User', userSchema);



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/dist/basics'));

// backend routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/basics/index.html');
});

app.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.json({ 'msg': 'err happened' });
        } else {
            res.json(users);
        }
    })
});
// create new entry - CRUD
app.post('/users', (req, res) => {
    console.log('somebody called post on users');
    console.log(req.body);
    var newuser = new User(req.body);
    newuser.save((err, obj) => {
        if (err) {
            res.json({ 'msg': 'err happened' });
        } else {
            res.json({ 'msg': 'success', 'res': obj });
        }
    });
})

app.post('/login', (req, res) => {
    var email = req.body.email;
    var pwd = req.body.password;

    User.find({ 'email': email }, (err, usr) => {
        if(err){
            res.json({ 'msg': 'failed' });
        } else {
            if(usr.length > 0){
                if(usr[0].password == pwd){
                    res.json({'msg':'Login success'});
                } else {
                    res.json({'msg':'wrong password'});
                }
            } else {
                res.json({'msg':'No registed user found'});
            }
        }
    })
})

app.listen(5000, () => {
    console.log("server running");
});

