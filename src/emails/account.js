const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'vlad.plaiasu.vp@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  })
}

const sendGoodbyeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'vlad.plaiasu.vp@gmail.com',
    subject:' We are sorry to see you go :(',
    text: `Gutted to see you leave us, ${name}. Is there anything we could have done to have kept you on board?`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail
}