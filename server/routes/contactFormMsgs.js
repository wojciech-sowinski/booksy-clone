const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
// const config = require("../config");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Place = require("../models/place");

const transport = nodemailer.createTransport({
    host: process.env.NODE_APP_SMTP_HOST,
    secureConnection: false, 
    port: process.env.NODE_APP_SMTP_PORT, 
    auth: {
        user: process.env.NODE_APP_SMTP_AUTH_USER,
        pass: process.env.NODE_APP_SMTP_AUTH_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});
  

router.post('/contactsendmsg',(req, res) => {

    const {name,email,message} = req.body

    if(name && email && message){
        transport.sendMail(
            {
                from: process.env.NODE_APP_SMTP_AUTH_USER,
                to: process.env.NODE_APP_SMTP_AUTH_USER,
                subject: 'Wiadomość wysłana z formularza kontaktowego OwlieDev.pl',
                html: `
                <p>Wiadomość wysłana z formularza kontaktowego OwlieDev.pl</p>
                <p>
                    <b>Wiadomość od:</b> ${name}
                </p>
                <p>
                    <b>Email:</b> ${email}
                </p>
                <p>
                    <b>Treść:</b>
                    </br>${message}
                </p>`
              }
            , function(error, info){
            if (error) {
                res.status(500).json({
                    result:'fail'
                })
            } else {
                res.status(200).json({
                    result:'message sent'
                })
            }
          });
    }else{
        res.status(200).json({
            result:'fail'
        })
    }
})

module.exports = router;
