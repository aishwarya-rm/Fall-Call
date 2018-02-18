const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


const grandpa = ["5034309550", "5034309550", "5034309550"];

/*
* Makes a call to a person
* @param {int} level calling level
* @returns {string}
*/

module.exports = (level = 1, context, callback) => {
    console.log(level);

    tel = grandpa[level];
    client.calls
        .create({
            url: process.env.CALL_URL,
            to: `+1${tel}`,
            from: process.env.TWILIO_NUMBER,
            StatusCallback: `https://taisei.lib.id/fallcall@dev/level3`,
            StatusCallbackEvent: ['queued','busy', 'no-answer', 'failed', 'completed'],
            StatusCallbackMethod: 'POST'
        })
        .then(call => callback(null, `Grandpa fell! Called ${tel}`))
        .catch(err => {
                console.log(err);
                return callback(err)
        });

    /*
    client.messages
        .create({
            from: process.env.TWILIO_NUMBER,
            to: `+1${tel}`,
            body: "Grandpa fell!"
        })
        .then((message) => console.log(`Sent text tp ${tel}`));
    */

};
