export const sendEmail = async (subject: string, to: string[], body: string) => {
  if (to.length === 0) {
    console.log('to is empty', subject, to, body);
    return;
  }
  if (process.env.PROD !== 'true') {
    console.log('message send', subject, to, body);
    return;
  }
  const brevo = require('@getbrevo/brevo');
  const apiInstance = new brevo.TransactionalEmailsApi();
  apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_KEY);

  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = body;
  sendSmtpEmail.sender = { email: process.env.SENDER_EMAIL };
  sendSmtpEmail.to = to.map(email => {
    return { email: email };
  });
  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error('Error sending email');
    console.error(error);
  }
};
