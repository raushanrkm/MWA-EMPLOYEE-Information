var express = require('express');
var ObjectID = require('mongodb').ObjectID;

var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const collection_name = "customer";


router.get('/searchCustomer/:accNo', function (req, res, next) {
    let db = req.db;
    db.collection(collection_name).find({ AccountNo: req.params.accNo}).toArray(function (err, docs) {
        if (err) throw err;
        console.log(docs);
        res.send(docs);
        res.end();
    });
});

router.post('/createCustomer', function (req, res, next) {
    console.log(req.headers);
    let db = req.db;
    db.collection(collection_name).insert(req.body, (err, docInserted) => {
        if (err) throw err;
        console.log(`Success: ${JSON.stringify(docInserted.ops)}!`);
     //   sendEmail(req.body.email);
        res.json(docInserted);
        res.end();
    });
});

router.post('/updateCustomer:accNo', function (req, res, next) {
    let db = req.db;
    db.collection(collection_name).findAndModify({ AccountNo: req.params.accNo}, {}, { $set: { status: 'Active', updated_date: new Date() } }, { new: true }, (err, result) => {
        if (err) throw err;
        console.log(`Success: ${JSON.stringify(result)}!`);
        res.json(result);
    });

});

router.delete('/deleteCustomer/:accNo', function (req, res, next) {
    let db = req.db;
    db.collection(collection_name).findAndModify({ AccountNo: req.params.accNo}, {}, { $set: { status: 'InActive', updated_date: new Date() } }, { new: true }, (err, result) => {
        console.log("Result: " + JSON.stringify(result));
        res.send(JSON.stringify(result));
    });
});

router.get('/InActive', function (req, res, next) {
    let db = req.db;
    db.collection(collection_name).find({ status: 'InActive' }).toArray(function (err, docs) {
        if (err) throw err;
        console.log(docs);
        res.send(docs);
        // res.render('task_completed', {data: docs});
    });

});



function sendEmail( email,){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'raushnmahaseth@gmail.com',
          pass: 'rkm5481rkm5481'
        }
      });

      var mailOptions = {
        from: 'raushnmahaseth@gmail.com',
        to: email,
        subject: 'confirmation email',
        text: ' information sucessfull added'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = router;
