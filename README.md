# Secret Message

Secret Message is a tiny tool which enables you to easily send and recieve encrypted messages to users on Github via pull requests with the latest public rsa key associated with their account. Inspired by [Jass](https://github.com/jschauma/jass).

### Dependencies
* node.js v0.12.4

### Installation
```sh
$ git clone https://github.com/sadasystems/secretmessage
$ cd secretmessage
$ npm install
```

### Usage: Encrypt a Message
```sh
$ node encrypt_message.js <github username> plain/<message text file> > secret/secret_message.out
$ git add secret_message.out
$ git commit -m "hey @github-user, accept this pull request with a secret message just for you!"
$ git push remote master
```

### Usage: Decrypt a Message
```sh
$ node hello.js secret/secret_message.out
Decrypt your message.  I'm not stealing your private key, promise, read the code!

 ~/.ssh/id_rsa pass phrase: <enter passphrase>

   -------

     magic secret message just for you appears here!
```

### Todo's

     * send some secret messages

### Todont's
     * commit plain text messages to the repo

### Version
0.0.1

License
----

MIT