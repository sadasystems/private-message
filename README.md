# Secret Message

Secret Message is a tiny tool which enables you to easily send and recieve encrypted messages to Github users via pull requests or commits to repositories.

This comes in handy when you want to message a developer but don't have their contact info.  It works by encrypting a plain text mssage with the user's latest public RSA key associated with their account. Inspired by [Jass](https://github.com/jschauma/jass).

### Dependencies
* node.js v0.12.4

### Usage: Decrypt a Message
```sh
$ node hello.js
Usage: node hello <secret message file> <absolute path to private key (optional)>

$ node hello.js secret/secret_message.out
Decrypt your message.  Your private key is not being stolen, read the code!

 ~/.ssh/id_rsa pass phrase: <enter passphrase>

   -------

     magic secret message just for you appears here!
```

### Usage: Encrypt a Message

```sh
$ node encrypt_message.js
Usage: node encrypt_message <github username | absolute path to public key> <message file>

$ node encrypt_message.js <github username> plain/message_<message text file> > secret/secret_message.out
$ git add secret_message.out
$ git commit -m "hey @github-user, accept this pull request with a secret message just for you!"
$ git push remote master
```

* note: plain text messages stored in the `plain` directory, named message_[something] will be ignored by git.

### Installation
```sh
$ git clone https://github.com/sadasystems/secretmessage
$ cd secretmessage
$ npm install
```

### Key Types

* RSA keys (supported, tested)
* DSA keys (supported, not tested)
* ed25519 (not supported, pull requests welcome)

### Todo's

* send some secret messages

### Todont's

* commit plain text message to the repo

### Todont's
     * commit plain text messages to the repo

### Version
0.0.1

License
----

MIT