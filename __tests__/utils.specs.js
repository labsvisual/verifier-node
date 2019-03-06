const test = require('tape');

const { Container, ...Utils } = require('../lib');

test('#Container > .of() and "new" create an isomorphic object', t => {

    const testObj = {
        status: true,
        email: 'foo@bar.com',
        domain: 'bar.com'
    };

    const jsonObject = JSON.stringify(testObj);

    const containerOne = new Container(jsonObject);
    const containerTwo = Container.of(jsonObject);

    t.equal(containerOne.__value, containerTwo.__value, 'the raw responses are the same');
    t.deepEqual(containerOne.__response, containerTwo.__response, 'the parsed objects are the same');
    t.end();

});

test('#Container > .of() and "new" throw an error when initialization is attempted without any body', t => {

    t.throws(Container.of, Error, 'throws a generic error when .of() is called');
    t.throws(() => {
        new Container();
    }, Error, 'throws a generic error when the "new" keyword is used');

    t.end();

});

test('#Utils > .parseErrorType() returns a string for all cases', t => {

    for (let i = 1; i <= 5; i++) {
        t.ok(Utils.parseErrorType(i), `case ${i} is truthy`);
        t.equal(typeof Utils.parseErrorType(i), 'string', `case ${i} is a string`);
    }

    t.end();

});