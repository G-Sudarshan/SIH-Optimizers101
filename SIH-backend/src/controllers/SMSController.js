

const sendSMS = (req, res) => {
    const accountSid = process.env.SID; 
    const authToken = process.env.AUTH_TOKEN; 
    const client = require('twilio')(accountSid, authToken); 
     
    client.messages 
          .create({ 
             body: req.body.body,  
             messagingServiceSid: process.env.MESSAGE_SID,      
             to: req.body.to
           }) 
          .then(message => res.status(200).json(message.sid)) 
          .done();
          //res.status(200).json(reasons);
  };
  
  module.exports = { sendSMS };
  