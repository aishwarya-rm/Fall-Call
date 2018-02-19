const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const tel = '5034309550';
const tel2 = '4255307834';
const homeLat = 0.0;
const homeLong = 0.0;

/*
* Makes a call to a person then hits the webhook
* @param {double} latitude
* @param {double} longitude
* @returns {string}
*/

module.exports = (latitude = 0.0, longitude = 0.0, context, callback) => {
    console.log('level 1');

    var distance = Math.sqrt((latitude - homeLat)*(latitude - homeLat) + (longitude - homeLong)*(longitude - homeLong));
    if (distance > 1.0) {
        console.log("too far, going to level 2");
        client.calls
        .create({
            url: process.env.CALL_URL,
            to: `+1${tel2}`,
            from: process.env.TWILIO_NUMBER, 
            statusCallback: 'https://taisei.lib.id/fallcall@0.0.5/level3',
            statusCallbackEvent: ["completed"],
            statusCallbackMethod: 'GET',
            method : 'GET'
        })
        .then(call => callback(null, `Grandpa fell! Called ${tel2}`));
    } else {
        client.calls
        .create({
            url: process.env.CALL_URL,
            to: `+1${tel}`,
            from: process.env.TWILIO_NUMBER, 
            statusCallback: 'https://taisei.lib.id/fallcall@0.0.5/level2',
            statusCallbackEvent: ["completed"],
            statusCallbackMethod: 'GET',
            method : 'GET'
        })
        .then(call => callback(null, `Grandpa fell! Called ${tel}`));
    }
};
