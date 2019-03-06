const test = require('tape');
const nock = require('nock');

const Utils = require('../lib');
const { verifyEmail } = require('../');

const TEST_TOKEN = 'abc';
const TEST_DOMAIN = 'bar.com';
const TEST_EMAIL_CASE = `foo@${TEST_DOMAIN}`;

function mock(errorCode = 0) {

    const responseCode = errorCode === 0 || errorCode === 1|| errorCode === 2 || errorCode === 3
        || errorCode === 4 || errorCode === 5 ? 200 : errorCode;

    const responseBody = {
        status: errorCode === 0
    };

    if (errorCode === 0) {
        responseBody.email = TEST_EMAIL_CASE;
        responseBody.domain = TEST_DOMAIN;
    } else if (errorCode > 0 && errorCode <= 5) {
        responseBody.error = {
            code: errorCode,
            message: Utils.parseErrorType(errorCode)
        };
    } else {
        responseBody.error = {
            code: errorCode,
            message: errorCode === 403 ? 'Unauthorized' : 'Server Error'
        }
    }

    nock('https://verifier.meetchopra.com/verify')
        .get(`/${TEST_EMAIL_CASE}?token=${TEST_TOKEN}`)
        .reply(responseCode, responseBody);

}

test('#Verifier > correctly parses a successful response', async t => {

    try {

        mock();

        const verifyResponse = await verifyEmail(TEST_TOKEN, TEST_EMAIL_CASE);

        t.ok(verifyResponse.isValid, 'the isValid flag is true');
        t.equal(verifyResponse.__response.email, TEST_EMAIL_CASE, 'the email parameter is correct');
        t.equal(verifyResponse.__response.domain, TEST_DOMAIN, 'the domain parameter is correct');

        t.end();

    } catch (error) {
        throw error;
    }

});

for (let i = 1; i <= 5; i++) {

    test(`#Verifier > correctly parses an unsuccessful validation (code = ${i})`, async t => {

        try {

            mock(i);

            const verifyResponse = await verifyEmail(TEST_TOKEN, TEST_EMAIL_CASE);

            t.notOk(verifyResponse.isValid, `the isValid flag is false`);
            t.equal(verifyResponse.validationError.code, i, 'the error code is correctly defined');
            t.equal(verifyResponse.validationError.message, Utils.parseErrorType(i),
                'the error message is correctly defined');

            t.end();

        } catch (error) {
            throw error;
        }

    });

}

test(`#Verifier > correctly responds to a 403 error`, async t => {

    try {

        mock(403);

        await verifyEmail(TEST_TOKEN, TEST_EMAIL_CASE);

        t.fail('No error was thrown for status code 403.');

    } catch (error) {

        t.equal(error.message, 'Request failed with status code 403',
            'the Error object contains the correct error message');
        t.end();

    }

});

test(`#Verifier > correctly responds to a 500 error`, async t => {

    try {

        mock(500);

        await verifyEmail(TEST_TOKEN, TEST_EMAIL_CASE);

        t.fail('No error was thrown for status code 500.');

    } catch (error) {

        t.equal(error.message, 'Request failed with status code 500',
            'the Error object contains the correct error message');
        t.end();

    }

});