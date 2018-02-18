const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


const grandpa = ["5034309550", "5034309550", "5034309550"];

/*
* Makes a call to a person then hits the webhook
* @returns {string}
*/

module.exports = (context, callback) => {
    console.log('level 1');
    
    tel = '5034309550';
    client.calls
        .create({
            url: process.env.CALL_URL,
            to: `+1${tel}`,
            from: process.env.TWILIO_NUMBER, 
            StatusCallback: 'https://taisei.lib.id/fallcall@dev/testhook/',
            statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
            StatusCalbackMethod: 'POST',
            method : 'GET'
        })
        .then(call => callback(null, `Grandpa fell! Called ${tel}`));
};
