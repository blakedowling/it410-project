var path = require('path');
const express = require('express');
var session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
var mysql = require('mysql');
let router = express.Router();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.IP);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'blaked93',
    password: '',
    database: 'c9'
});


// app.set('views', __dirname + '/index.html');
// app.engine('html', require('ejs').renderFile);

// app.use(express.static(__dirname));

app.use(session({
    secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
router.use(bodyParser.json());
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
                // res.send(rows);
                var eventID = rows.insertId;
                res.redirect('/#event/' + eventID);
            }
        });
    });
});

app.get('/events', function(req, res) {
    connection.query("SELECT * FROM Event;", function (err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        // res.send(rows);
        
        res.send(JSON.stringify(rows));
    });
});

app.get('/event/:id', function(req, res) {
    connection.query("SELECT * FROM Event WHERE EventID = " + req.params.id + ";", function(err, rows, fields) {
        if (err) throw err;
        console.log(rows);
        res.send(JSON.stringify(rows[0]));
    });
});

app.get('/images/:eventid', function(req, res) {
    connection.query("SELECT * FROM Image WHERE EventID = " + req.params.eventid + ";", function(err, rows, fields) {
        if (err) throw err;
        console.log("Get images hit and it results in " + rows);
        res.send(JSON.stringify(rows));
    });
});
// function update() {
//     var pics = document.querySelector('section');
//     pics.innerHTML = 'HELLO!';
// }
app.post('/image', function(req, res) {
    connection.query("INSERT INTO Image (Name, Filename, EventID) VALUES ('" + req.body.name + "','" + req.body.pic + "'," + req.body.id + ");", function(err, rows, fields) {
        if (err) throw err;
        console.log("post image hit and it results in " + rows);
        // update();
        // res.send(JSON.stringify(rows));
    });
});

app.listen(process.env.PORT, process.env.IP);