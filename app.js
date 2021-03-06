const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const path = require('path')
const dotenv = require('dotenv').config();
const mg = require('nodemailer-mailgun-transport');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static( path.join(__dirname, 'public')));

app.get('/', function (req, res,next) {
    res.send(path.join(__dirname, '/public/index.html'))
});
console.clear()



app.post('/sendmail', async function(req,res,next) {

    
    try {
        let transporter =  nodemailer.createTransport({
                    
           
         service: "Gmail",

            auth: {    
                user: process.env.UserEmail,
                pass: process.env.PassEmail
                }
        });
 console.clear()
        // console.log(req.body.email)
    
            let result = await transporter.sendMail({   
              from: process.env.UserEmail , // sender address
              to: process.env.receiver, // list of receivers
              subject: "Message Sent From Your WebSite", // Subject line
              text:  req.body.message, // plain text body   
             
              html: `<p>Original Sender: ${req.body.email} </p> <p>Message: ${ req.body.message}</P>`
            }); 

           
            console.log(result)
            res.status(200).json({
                status: 'Sucess',
                message: 'I received your message; I will reply soon'
            })

    } catch (error) {
        console.log(error)
        res.status(403).json({
            status: 'fail',
            message: 'Can not send Email\nSomething Wrong with our Gmail Service'
        })
    }


})


const port = process.env.PORT ||3000;
 const server =  app.listen(port, ()=>{
    console.log(`running on port ${port}`)
    });