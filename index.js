"use strict";
const nodemailer = require("nodemailer");
var fs = require("fs");
var handlebars = require("handlebars");
console.log(
  "================================ START --tt ================================="
);

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  var readHTML = function (path, callback) {
    fs.readFile(path, { encoding: "utf8" }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      } else {
        callback(null, html);
      }
    });
  };
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail", // true for 465, false for other ports
    secure: false, // true for 465, false for other ports
    auth: {
      user: "msait25034@gmail.com", // generated ethereal user
      pass: "g6822.Mhmt", // generated ethereal password
    },
  });

  readHTML(__dirname + "/send-mail.html", function (err, html) {
    var template = handlebars.compile(html);
    var replacements = {
        username: "John Doe",
    };
    var htmlToSend = template(replacements);
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: "msait25034@gmail.com", // sender address
        to: "mhmtranas@gmail.com", // recipient addresslist of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: htmlToSend, // html body
    });
    
});
  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
