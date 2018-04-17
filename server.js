var path = require('path');
const express = require('express');
var session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'blaked93',
    password: '',
    database: 'c9'
});


// app.set('views', __dirname + '/index.html');
// app.engine('html', require('ejs').renderFile);

// app.use(express.static(__dirname));

app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){
    if(req.session.email) {
        console.log('we have an email');
        app.use(express.static(path.join(__dirname, '')));
        res.sendFile(path.join(__dirname +'/'));
    }
    else {
        console.log('no email');
        app.use(express.static(path.join(__dirname, '')));
        res.sendFile(path.join(__dirname +'/login.html'));
    }
});

app.post('/login',function(req,res){
    console.log("User's login email is " + req.body.email);
    console.log("User's login password is " + req.body.pass);
    connection.query("SELECT * FROM User WHERE Email = '" + req.body.email + "'  AND Password = '" + req.body.pass + "'", function (err, rows, fields) {
        if (err) throw err;
        if(rows.length) {
            req.session.email=req.body.email;
            res.end('done');
        }
    });
});

app.post('/signup',function(req,res){
    console.log("User's login email is " + req.body.email);
    console.log("User's login password is " + req.body.pass);
    
    connection.query("INSERT INTO User (Email, Password) Values ('" + req.body.email + "', '" + req.body.pass + "');", function (err, rows, fields) {
        if (err) {
            throw err;
        } else {
            req.session.email=req.body.email;
            res.end('done');
            // res.sendFile(path.join(__dirname +'/'));
        }
    });
});

app.get('/logout',function(req,res) {
    req.session.destroy(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.post('/createEvent', function(req, res) {
    var name = req.body.name;
    var datetime = req.body.date;
    var location = req.body.venue;
    
    var getID = new Promise(function(resolve, reject) {
        connection.query("SELECT UserID FROM User WHERE Email = '" + req.session.email + "';", function (err, rows, fields) {
            if (err) {
                throw err;
            } else {
                resolve(rows[0].UserID);
            }
        });
    });
    
    getID.then(function(value) {
        connection.query("INSERT INTO Event (Name, EventTime, Location, UserID) Values ('" + name + "', '" + datetime + "', '" + location + "', " + value + ");", function (err, rows, fields) {
            if (err) {
                throw err;
            } else {
                res.redirect('/#calendar');
            }
        });
    });
});

// app.get('/users', function(req, res) {
//     connection.query
// });

app.listen(process.env.PORT, process.env.IP);