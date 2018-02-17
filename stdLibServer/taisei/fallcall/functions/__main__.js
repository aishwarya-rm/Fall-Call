const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
/**
* Makes a call to a person
* @param {string} tel The telephone number to call
* @returns {string}
*/

module.exports = (tel, context, callback) => {

    client.calls
        .create({
            url: process.env.CALL_URL,
            to: `+1${tel}`,
            from: process.env.TWILIO_NUMBER
        })
        .then(call => callback(null, `called ${tel}`));
};
