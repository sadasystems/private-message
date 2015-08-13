var fs = require('fs');
var crypto = require("crypto");
var read = require('read');
var args = process.argv.slice(2);
var key = fs.readFileSync(process.env.HOME + '/.ssh/id_rsa', 'utf8');
var chunk = 0;

if (!args.length) {
  console.log('Usage: node hello <secret message file>');
  process.exit(0);
}

read({ prompt: 'Decrypt your message.  I\'m not stealing your private key, promise, read the code!\n\n ~/.ssh/id_rsa pass phrase:', silent: true }, function(er, pass) {

  console.log('\n\n--------\n');
  var secret_message = fs.readFileSync(args[0], 'utf8').split('\n');

  function type(string){
   (function writer(i){
    if (string.length <= i++) {
      chunk++;
      decrypt(chunk);
      return;
    }

    process.stdout.write(string.substring((i - 1), i));
    var rand = Math.floor(Math.random() * (100)) + 14;
    setTimeout(function(){writer(i);}, rand);

   })(0)
  }


  function decrypt(increment) {
      if (increment === secret_message.length - 1) process.exit(0);

      try {
        type(
            crypto.privateDecrypt({key: key, passphrase: pass },
              new Buffer(secret_message[increment], 'base64')).toString('utf8')
        );
      }
      catch (err) {
        if (err.toString().indexOf('bad decrypt') > 0) {
          console.log("Looks like the wrong passphrase, try again");
          process.exit(1);
        }
      }
  }

  decrypt(chunk);

});