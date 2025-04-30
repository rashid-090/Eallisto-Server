const formData = require('form-data');
const Mailgun = require('mailgun.js');



const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});



// To get user data on initial page load.
const submitFormData = async (req, res) => {
  const { name, email, message, mobile, subject } = req.body;
  console.log('Form data received:', req.body);

  if (!name || !email || !mobile) {
    return res.status(400).json({ success: false, error: 'All fields are required'});
  }
  // return res.status(200).json({ success: true, message: 'Form data received successfully' });

  try {
    const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `${name} <${email}>`,
      to: [process.env.CLIENT_EMAIL],
      subject: `New Contact Form Submission - ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nSubject: ${subject}\nMessage:\n${message}`,
    });

    console.log('Mailgun response:', msg);

    res.status(200).json({ success: true, message: 'Form sent successfully', id: msg.id });
  } catch (error) {
    console.error('Mailgun error:', error.response?.body || error);
    res.status(500).json({ success: false, error: 'Failed to send form', details: error.message });
  }
};


module.exports = {
  submitFormData,
};
