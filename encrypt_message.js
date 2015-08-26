var fs = require("fs");
var https = require('https');
var crypto = require("crypto");
var sshKeyToPEM = require('ssh-key-to-pem');
var args = process.argv.slice(2);
var data = "";

if (args.length !== 2) {
  console.log('Usage: node encrypt_message <github username | absolute path to public key> <message file>');
  process.exit();
}

if (args[0][0] === '/') { // we have a public key file
  encrypt(fs.readFileSync(args[0], 'utf8'), args[1]);
}
else { // we need to snag the public key from a github user
  https.get('https://github.com/' + args[0] + '.keys', function(res) {

    res.on('data', function(d) {
      data += d;
    });

    res.on('end', function() { // pull the last key in the account
      encrypt(data.split('\n').slice(-1)[0], args[1]);
    });

  }).on('error', console.error);
}

function encrypt(public_key, file) {
 var pem_pub_key = sshKeyToPEM(public_key); // convert rsa to pem

 var chunks = [];
 var buffer = new Buffer(fs.readFileSync(file, 'utf8'));

 // work around for 214 character limit for encrypting
 // text with small openssh rsa pub key
 for (var i = 0; i <= (buffer.length / 214); i++) {
  chunks.push(buffer.slice(i * 214, (i * 214) + 214));
 }

 chunks.forEach(function(chunk) {
   var encrypted = crypto.publicEncrypt(pem_pub_key, new Buffer(chunk));
   console.log(encrypted.toString('base64'));
 });
}
