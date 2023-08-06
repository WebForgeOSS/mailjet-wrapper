# mailjet-wrapper

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier/)

> A simple and extensible Mailjet API wrapper for Node.js.

## Install

```
$ npm install mailjet-wrapper
```

## Usage

```js
const MailjetWrapper = require("mailjet-wrapper");

const wrapper = new MailjetWrapper({
  apiKey: "YOUR_MAILJET_API_KEY",
  apiSecret: "YOUR_MAILJET_API_SECRET",
  dependencies: {
    mailjet: require('node-mailjet'),
    logger: console
  }
});

wrapper.send("Hello Mailjet", "This is a test email.", ["recipient@example.com"]);
```

## API

### `new MailjetWrapper(config)`

Creates a new instance of the MailjetWrapper.

**Parameters**:

| Param      | Type       | Description                                                           |
| ---------- | ---------- | --------------------------------------------------------------------- |
| config     | `Object`   | Configuration options, including `apiKey`, `apiSecret`, and others.   |

### `wrapper.send(subject, textContent, recipients, [fromEmail], [fromName])` ⇒ <code>Promise&lt;Object&gt;</code>

Sends an email using the Mailjet's API.

**Returns**: <code>Promise&lt;Object&gt;</code> - A promise that resolves with details about the sent message.

| Param        | Type       | Default                    | Description                     |
| ------------ | ---------- | -------------------------- | ------------------------------- |
| subject      | `string`   |                            | The subject of the email.       |
| textContent  | `string`   |                            | The textual content of the email.|
| recipients   | `string[]` |                            | List of email addresses to send the email to.|
| fromEmail    | `string`   | "your-email@example.com"   | Sender's email address.         |
| fromName     | `string`   | "Your Name"                | Sender's name.                  |

**Example**:

```js
wrapper.send("Hello Mailjet", "This is a test email.", ["recipient@example.com"]);
```

## License

MIT © [muceres](https://forgetheweb.eu)