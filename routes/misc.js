const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/feedback', (req, res) => {
    res.render('feedback')
});

router.get('/bug', (req, res) => {
    // res.render('reportbug')
    res.render('Report Bug!');
});

// router.post('/feedback', (req, res) => {
//     if (req.body.name === '' || req.body.email === ''|| req.body.message === '') {
//         res.send('Dont act smart dickhead!');
//         return false;
//     }
//
//     let smtpTransport = nodemailer.createTransport("SMTP", {
//         // host: "smtp.gmail.com",
//         secureConnection: false,
//         // port: 465,
//         auth: {
//             user: 'vinaysb200@gmail.com',
//             pass: '(vinay)150'
//         }
//     })
//
//     let mailOptions = {
//         from: "node mailer",
//         to: req.body.email,
//         subject: req.body.message,
//         text: "hello dumbfuck"
//     }
//     smtpTransport.sendMail(mailOptions, (err, res) => {
//         if (err){
//             res.send('errarta', err);
//         }else{
//             res.send('mail sent', res)
//         }
//     })
//
// });

module.exports = router;