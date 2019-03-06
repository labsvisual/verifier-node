# `Email Verifier` - Official Node.js Client
This package is the **only official** package for the [Verifier](https://verifier.meetchopra.com) web-service by [Meet Chopra](https://twitter.com/meet__chopra).

## Installation
Installing the library is actually pretty simple. With just: `npm i -S verifier-node` you will be on your way to build something wickedly awesome!

## Rationale
`verifier-node` is a tiny library which wraps around the Verifier API for validating spam emails based on a variety of factors such as invalid MX records, invalid or inaccessible domain names, etc. [Click here](https://verifier.meetchopra.com) to know more about the project.

## Show me code!

Using the library is pretty simple:
```javascript
const Verifier = require('verifier-node');
const verifierInstance = new Verifier('YOUR_API_KEY');

async function getResults() {

    try {

        const validationResult = await verifierInstance.verify('EMAIL_HERE');

        if (!validationResult.isValid) {

            console.log('The email is not valid!');

            console.log(
                'Error code: %d; message: %s, description: %s',
                validationResult.validationError.code,
                validationResult.validationError.message,
                validationResult.validationError.description
            );

        } else {
            console.log('Woohoo! The email is valid!');
        }

    } catch (error) {
        console.error('Oops! %O', error);
    }

}

getResults();
```

Since the function returns a `Promise` you can also use `.then()` and `.catch()` chains if you fancy.

### Validation Singleton
You can also just import the `verifyEmail` function from the `verifier-node` package and use it. It is the core function which powers this library and has the following signature:

`verifyEmail(API_KEY: string, EMAIL: string): Promise<validationResult: object | error>`

Example:

```javascript
const { verifyEmail } = require('verifier-node');

// ---
// ---
// your code here
// ---
```

This might be useful when you want to use the library one-off. Or if you want to be lazy. Up to you.

## API Documentation
The official API documentation can be found [here](https://verifier.meetchopra.com/docs#/); be sure to check it out!

## Contributing
Feel free to raise a PR with whatever additions you have; any and every form of _constructive_ criticism is welcome!

## License
Copyright 2019 Meet Chopra

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.