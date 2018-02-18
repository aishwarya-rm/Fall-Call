/*
* Makes a call to a person
* @returns {string}
*/

module.exports = (context, callback) => {
    console.log("hello it worked");
    return callback(null, 'hello it worked');
};
