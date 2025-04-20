// utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',        // ✅ Gmail SMTP server
  port: 465,                     // ✅ 465 for SSL, or 587 for STARTTLS
  secure: true,                  // ✅ true for 465, false for 587
  auth: {
    user: 'polojisanjaysai9849@gmail.com',
    pass: 'bkbu mfke eacj uzeh', // ✅ App YYYYypassword
  },
});

// Optional: Check if the SMTP is working
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Error:', error);
  } else {
    console.log('✅ SMTP server is ready to send emails');
  }
});

const sendStatusEmail = (email, status, leaderName) => {
  const mailOptions = {
    from: 'polojisanjaysai9849@gmail.com', // use same as authenticated user
    to: email,
    subject: `Booking Status: ${status}`,
    html: `<h3>Hello ${leaderName},</h3>
           <p>Your booking request has been <strong>${status}</strong>.</p>
           <p>Thanks!</p>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('❌ Email send error:', err);
    } else {
      console.log('✅ Email sent:', info.response);
    }
  });
};

module.exports = sendStatusEmail;
