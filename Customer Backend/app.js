var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const taskRouter = require('./routes/tasks');
var mongoose = require('mongoose');
var User = require('./models/UserSchema');
var jwt = require('jsonwebtoken');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://root:root@ds035844.mlab.com:35844/mwbdb';
const taskDB = 'mwbdb';
mongoose.connect(url);
let db;
app.use(function (req, res, next) {
    if (!db) {
        MongoClient.connect(url, function (err, client) {
            if (err) throw err;
            db = client.db(taskDB);
            req.db = db;
            return next();
        });
    }
    else{
      req.db= db;
      return next();
    }
});


app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-type, Authorization, Origin, Accept, Content-Length');
  next();
});

app.use('/cs',ensureAuthorized,taskRouter);

app.post(['/authenticate','/signin'], function(req, res) {
  console.log('------1-----',req.body);
  User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
      if (err) {
          res.json({
              type: false,
              data: "Error occured: " + err
          });
      } else {
          console.log("----2----",user)
          if (user) {
             res.json({
                  type: true,
                  data: user,
                  token: user.token
              }); 
          } else {
              res.json({
                  type: false,
                  data: "Incorrect email/password"
              });    
          }
      }
  });
});


app.post('/signup', function(req, res) {
  User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
      if (err) {
          res.json({
              type: false,
              data: "Error occured: " + err
          });
      } else {
          if (user) {
              res.json({
                  type: false,
                  data: "User already exists!"
              });
          } else {
            

              var userModel = new User();
              userModel.email = req.body.email;
              userModel.password = req.body.password;
              userModel.save(function(err, user) {
                  user.token = jwt.sign({"email": user.email, "password": user.password }, 'MWA2018');
                  console.log(user.token);
                  user.save(function(err, user1) {
                      res.json({
                          type: true,
                          data: user1,
                          token: user1.token
                      });
                  });
              })
          }
      }
  });
});
function ensureAuthorized(req, res, next) {
    console.log(req.headers);
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        console.log("gkjvhj");
        console.log(req.body);
        console.log(req.headers);
        res.send(403);
    }
}


process.on('uncaughtException', function(err) {
  console.log(err);
});

// catch 404 and forward to error handler


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(4000,
()=>console.log("use port 4000 for express appliations"));
module.exports = app;
