const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const tel2 = '4255307834';
const tel = '5034309550'; // change back to pretend 911 number
/*
* Makes a call to a person then hits the webhook
* @returns {string}
*/

module.exports = (context, callback) => {
    console.log('level 3');

    client.messages
    .create({
      to: '+15034309550',
      from: process.env.TWILIO_NUMBER,
      body: `Grandpa fell, we tried reaching ${tel2} but failed. We are now calling 911 to notify about Grandpa.`
    })
    .then(message => console.log(message.sid));

    client.messages
    .create({
      to: '+14255307834',
      from: process.env.TWILIO_NUMBER,
      body: 'Grandpa fell, we tried reaching you but failed. We are now calling 911 to notify about Grandpa.'
    })
    .then(message => console.log(message.sid));
    
    client.calls
        .create({
            url: process.env.CALL_URL,
            to: `+1${tel}`,
            from: process.env.TWILIO_NUMBER, 
            method : 'GET'
        })
        .then(call => callback(null, `Grandpa fell! Called ${tel}`));
};
