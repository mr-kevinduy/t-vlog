import nodemailer from 'nodemailer';
import { servicesConfig } from '../config';

const from = '"T-Vlog" <info@domain.com>';

function setup() {
  return nodemailer.createTransport({
    host: servicesConfig.mailer.host,
    port: servicesConfig.mailer.port,
    auth: {
      user: servicesConfig.mailer.user,
      pass: servicesConfig.mailer.pass
    }
  });
}

export function sendConfirmationEmail(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Welcome to T-Vlog",
    text: `
    Welcome to T-Vlog. Please, confirm your email.
    ${user.generateConfirmationUrl()}
    `
  };

  tranport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Reset Password",
    text: `
    To reset password follow this link
    ${user.generateResetPasswordLink()}
    `
  };

  tranport.sendMail(email);
}
