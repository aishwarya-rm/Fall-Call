const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  

const grandpa = ["5034309550", "5034309550", "5034309550"];

/*
* Makes a call to a person then hits the webhook
* @param {double} latitude
* @param {double} longitude
* @returns {string}
*/

module.exports = (latitude = 0.0, longitude = 0.0, context, callback) => {
    console.log('level 1');
/*
    var distance = Math.sqrt((latitude - process.env.HOME_LAT)*(latitude - process.env.HOME_LAT) + (longitude - process.env.HOME_LONG)*(longitude - process.env.HOME_LONG)) - process.env.LEVEL2_DISTANCE;

    if (distance > process.env.LEVEL2_DISTANCE) {
        
        return callback(null, 'going to level 2');
    }

*/
    
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

