const https = require('https');

const Utils = require('./lib');

/**
 * Initializes a new instance of the email verifier library.
 *
 * @param {string} apiToken - the API token given to you after sign up
 */
function Verifier(apiToken) {
    this.__apiToken = apiToken;
}

/**
 * Verifies the email by calling the API with the corresponding parameters.
 *
 * @param {string} apiToken - the API token given to you after signing up
 * @param {string} email - the email to verify
 *
 * @returns {Promise} A Promise which, when resolved, gives access to the
 * response; on reject, gives the error.
 */
const verifyEmail = function (apiToken, email) {

    return new Promise((resolve, reject) => {

        let response = '';

        https.get(`https://verifier.meetchopra.com/verify/${email}?token=${apiToken}`, res => {

            if (res.statusCode < 200 || res.statusCode > 299) {
                reject(new Error(`Request failed with status code ${res.statusCode}`));
            } else {
                res.on('data', data => response += data);
                res.on('end', () => resolve(new Utils.Container(response)));
            }

        }).on('error', err => reject(err));

    });
};

/**
 * Verifies the email by calling the API with the corresponding parameters.
 *
 * @param {string} email - the email to verify
 *
 * @returns {Promise} A Promise which, when resolved, gives access to the
 * response; on reject, gives the error.
 *
 * @see {@link verifyEmail}
 */
Verifier.prototype.verify = function(email) {
    return verifyEmail(this.__apiToken, email);
}

/*
 * This way the user always has access to an object scoped
 * consumeable which they can then destructure.
 */
module.exports = Verifier;
module.exports.verifyEmail = verifyEmail;