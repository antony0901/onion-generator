var nodemailer = require('nodemailer');
var inlineBase64 = require('nodemailer-plugin-inline-base64');
var logoBase64 = require('./base64');

module.exports = {
  friendlyName: 'Send email',
  description: 'Send email by user email',
  inputs: {
    token: {
      type: 'string',
      description: 'user\'s token to send to user\' email',
      required: false
    },
    user: {
      type: 'ref',
      required: true
    },
    tokenType: {
      type: 'string',
      description: 'token type to decide email template',
      required: true
    }
  },
  exits: {
    invalid: {
      description: 'Invalid user or email info'
    }
  },
  fn: async function (inputs, exits) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '360f.noreply@gmail.com',
        pass: 'Abc@1234'
      }
    });

    var subject;
    var emailText;
    var html;

    if (inputs.tokenType === "forgot_password") {
      subject = "[360-Foresight®] Reset Your Password";
      emailText =
        sails.config.custom.adminPortalUrl +
        "/reset-password?token=" +
        inputs.token;
      html = `
          <div id="mail-template" style="border: 1px solid #e2e2e2;text-align:center;font-size: 15px;max-width: 742px;padding: 36px 0px 60px 0px; margin: auto;background-color: #fff; color:#333333">
          <img style="width:95px" src="${logoBase64.logo}"/>
          <h3 style="font-family:'Open Sans'; font-weight: lighter;font-size: 50px;margin-top: 27px;margin-bottom: 27px;">We are here to help</h3>
          <p style="font-size:14px;">Hi <strong>${
            inputs.user.name
          },</strong></p>
          <p style="font-family:'Open Sans'; font-weight: lighter;font-size: 14px; margin-top: 27px;margin-bottom: 38px;line-height: 1.3">
          Seems like you have forgotten your password <br/>
          for . If it is true, please click the button <br/>
          at below to reset it.
          </p>
          <a style="display: block;text-decoration: none;padding: 18px 0px;margin: auto;background-color: #fc4a60; color: white; width: 220px; border:none;border-radius: 5px;font-size:16px;" targe="_blank" href=${emailText}><b>Reset Password<b/></a>
          </div>
        </div>
  `;
    }

    await transporter.use(
      "compile",
      inlineBase64({
        cidPrefix: "somePrefix_"
      })
    );

    let mailOptions = {
      from: "'360-Foresight®' <360f.noreply@gmail.com>",
      to: inputs.user.email,
      subject: subject,
      html: html
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return exits.invalid(error);
      }

      return exits.success();
    });
  }
};
