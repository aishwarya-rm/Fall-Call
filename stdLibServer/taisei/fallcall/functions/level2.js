const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const tel = '4255307834';
/*
* Makes a call to a person then hits the webhook
* @returns {string}
*/

module.exports = (context, callback) => {
    console.log('level 2');

    client.messages
  .create({
    to: '+15034309550',
    from: process.env.TWILIO_NUMBER,
    body: `Grandpa fell, we tried reaching you but failed. We are now calling ${tel} to notify about Grandpa.`
  })
  .then(message => console.log(message.sid));
    
    client.calls
        .create({
            url: process.env.CALL_URL,
            to: `+1${tel}`,
            from: process.env.TWILIO_NUMBER, 
            statusCallback: 'https://taisei.lib.id/fallcall@0.0.5/level3',
            statusCallbackEvent: ["completed"],
            statusCallbackMethod: 'GET',
            method : 'GET'
        })
        .then(call => callback(null, `Grandpa fell! Called ${tel}`));
};
