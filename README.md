# Private Message

Private Message is a tiny tool which enables you to easily send and receive encrypted messages to GitHub users via pull requests or commits to repositories.

![Private Message Usage GIF](https://raw.githubusercontent.com/sadasystems/private-message/master/usage.gif)

This comes in handy when you want to message a developer but don't have their contact info.  It works by encrypting a plain text message with the user's latest public RSA key associated with their account. Inspired by [Jass](https://github.com/jschauma/jass).

### Dependencies
* node.js v0.12.4

### Usage: Decrypt a Message
```sh
$ node decrypt_message.js
Usage: node decrypt_message.js <private message file> <absolute path to private key (optional)>

$ # example
$ node decrypt_message.js secret/secret_message.out
Decrypt your message.  Your private key is not being stolen, read the code!

 ~/.ssh/id_rsa pass phrase: <enter passphrase>

   -------

     magic private message just for you appears here!
```

### Usage: Encrypt a Message

```sh
$ node encrypt_message.js
Usage: node encrypt_message <github username | absolute path to public key> <message file>

$ # example
$ node encrypt_message.js <github username> plain/message_<message text file> > secret/secret_message.out
$ git add secret_message.out
$ git commit -m "hey @github-user, accept this pull request with a private message just for you!"
$ git push remote master
```

* note: plain text messages stored in the `plain` directory, will be ignored by git.

### Installation
```sh
$ git clone https://github.com/sadasystems/private-message
$ cd private-message
$ npm install
```

### Key Types

* RSA keys (supported, tested)
* DSA keys (supported, not tested)
* ed25519 (not supported, pull requests welcome)

### Todo's

* send some private messages
* integrate ssh-agent

### Todont's

* commit plain text message to the repo

### Version
0.0.1

License
----

MIT
