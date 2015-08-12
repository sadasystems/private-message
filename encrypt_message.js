var fs = require("fs");
var https = require('https');
var sshKeyToPEM = require('ssh-key-to-pem');
var crypto = require("crypto");
var args = process.argv.slice(2);
var data = "";

if (args.length !== 2) {
  console.log('Usage: node encrypt_message <github username> <message file>');
  process.exit();
}

https.get('https://github.com/' + args[0] + '.keys', function(res) {
  res.on('data', function(d) {
    data += d;
  });
  res.on('end', function () {
    var pem_pub_key = sshKeyToPEM(data.split('\n').slice(-1)[0]); // convert rsa to pem

    var buffer = new Buffer(fs.readFileSync(args[1], 'utf8'));
    var chunks = [];
    // work around for 214 character limit for encrypting text with rsa pub key
    for (var i = 0; i <= (buffer.length / 214); i++) {
     chunks.push(buffer.slice(i * 214, (i * 214) + 214));
    }

    chunks.forEach(function (chunk) {
      var encrypted = crypto.publicEncrypt(pem_pub_key, new Buffer(chunk));
      console.log(encrypted.toString('base64'));
    });

  });
}).on('error', function(e) {
  console.error(e);
});
