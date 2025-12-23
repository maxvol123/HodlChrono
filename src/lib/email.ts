import nodemailer from 'nodemailer';

interface EmailUser {
  email: string;
  name?: string;
}

const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendDailyBuyAlert(user: EmailUser): Promise<void> {
  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_FROM}>`,
    to: user.email,
    subject: 'Daily Buy Alerts',
    html: `
      <h1>Daily Buy Opportunities</h1>
      <p>Hello ${user.name},</p>
      <p>Here are your daily buy alerts...</p>
      <!-- ADD YOUR DAILY BUY CONTENT HERE -->
    `
  });
}

export async function sendWeeklyBuyAlert(user: EmailUser): Promise<void> {
  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_FROM}>`,
    to: user.email,
    subject: 'Weekly Buy Alerts',
    html: `
      <h1>Weekly Buy Opportunities</h1>
      <p>Hello ${user.name},</p>
      <p>Here are your weekly buy alerts...</p>
      <!-- ADD YOUR WEEKLY BUY CONTENT HERE -->
    `
  });
}

export async function sendMonthlyBuyAlert(user: EmailUser): Promise<void> {
  await transporter.sendMail({
    from: `"Your App" <${process.env.EMAIL_FROM}>`,
    to: user.email,
    subject: 'Monthly Buy Alerts',
    html: `
      <h1>Monthly Buy Opportunities</h1>
      <p>Hello ${user.name},</p>
      <p>Here are your monthly buy alerts...</p>
      <!-- ADD YOUR MONTHLY BUY CONTENT HERE -->
    `
  });
}