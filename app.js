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




app.post('/sendmail', async function(req,res,next) {

    // this one is mail jet 
    // name: hien tran
    // password same as school 
    // email: school email
    // check back 30 days to see if you can send email 
    // it says trial end in 30 days
    // cannot use send grid cause it flags my ip or something
  
    
    try {
        let transporter =  nodemailer.createTransport({
            service: "Mailgun",
        
            auth: {    
                user:  'postmaster@sandbox0e1061f83241468daaf982f6d9fe7997.mailgun.org',
                pass:  '12812e91dade6228722cbe9dbf4fb52c-ed4dc7c4-504e097a'
              }
        });
 console.clear()
        // console.log(req.body.email)
    
            let result = await transporter.sendMail({   
              from: req.body.email , // sender address
              to: "hient766@gmail.com", // list of receivers
              subject: "Message Sent From Your WebSite", // Subject line
              text:  req.body.message, // plain text body   
             
              html: `<p>${ req.body.message}</P>`
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