/**
 * Creates a new container to store the raw JSON response.
 * @class
 *
 * @param {string} rawData - the raw JSON response from the API
 */
function Container(rawData) {
    this.__value = rawData;
    this._parse();
}

/**
 * Creates a new instance of the Container object with the
 * provided raw JSON data.
 *
 * @param {string} rawData - the raw JSON response from the API
 * @returns {Container} A new instance of the Container object with parsed response data.
 */
Container.of = function (rawData) {

    if (typeof rawData === 'undefined' || rawData === null) {
        throw new Error('No raw payload was provided.');
    }

    return new Container(rawData);
}

/**
 * Parses the raw data contained within the current instance of the
 * Container object.
 */
Container.prototype._parse = function () {
    this.__response = JSON.parse(this.__value);
    this.isValid = !!this.__response.status;

    this.validationError = this.isValid ? null : {
        ...this.__response.error,
        description: parseErrorType(this.__response.error.code)
    };
}

/**
 * Maps the integer based error code to a more human readable format.
 *
 * @param {number} errorCode - the error code returned by the API
 * @returns {string} a well-formatted and comprehensible description for the error code
 */
const parseErrorType = function (errorCode) {
    switch (errorCode) {
        case 1:
            return 'The email does not conform to RFC 2822 and hence is invalid.';

        case 2:
            return 'The user tried to use a disposable email address.';

        case 3:
            return 'The domain name provided is invalid.';

        case 4:
            return 'No mail exchange (MX) records were found for the domain\'s DNS record set.';

        case 5:
        default:
            return 'The email does not exist.';
    }
};

exports.Container = Container;
exports.parseErrorType = parseErrorType;