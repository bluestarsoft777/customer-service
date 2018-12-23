const apiKey = 'YOUR_API_KEY';
const domain = 'YOUR_DOMAIN_NAME';
const Mailgun = require('mailgun-js');

const mailgun = Mailgun({apiKey: apiKey, domain: domain})

// Send email data example
//
// const data = {
//   from: 'Excited User <me@samples.mailgun.org>',
//   to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
//   subject: 'Hello',
//   text: 'Testing some Mailgun awesomness!'
// };

type SendEmailData = {
  from: string,
  to: string,
  subject: string,
  text: string
}

export type EmailService = {
  send: (emailData: SendEmailData) => Promise<any>
}


export function sendMessage (emailData: SendEmailData) {
  return new Promise((resolve, reject) => {
    mailgun.messages()
    .send(emailData, function (error: any, body: any) {
      if (error) {
        reject(error)
      } else {
        resolve(body)
      }
    });
  })
}

export const emailService = {
  sendMessage
}
