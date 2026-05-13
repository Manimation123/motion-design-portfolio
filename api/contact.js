import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, projectType, budget, message } = req.body;

  // Validate required fields
  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Get environment variables
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailTo = process.env.EMAIL_TO || emailUser;

  if (!emailUser || !emailPass) {
    console.error('Email credentials not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    // Email content
    const htmlContent = `
      <h2>New Project Request from Manimation Portfolio</h2>
      <p><strong>Client Email:</strong> ${email}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
      <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${message ? message.replace(/\n/g, '<br/>') : 'No message provided'}</p>
    `;

    // Send email to you
    await transporter.sendMail({
      from: emailUser,
      to: emailTo,
      subject: `New Project Request: ${projectType || 'Inquiry'}`,
      html: htmlContent,
      replyTo: email,
    });

    // Send confirmation email to client
    await transporter.sendMail({
      from: emailUser,
      to: email,
      subject: 'Project Request Received — Manimation',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>I've received your project request and will get back to you within 24 hours with more details.</p>
        <p>Best regards,<br/>Motion Design Studio</p>
      `,
    });

    return res.status(200).json({ success: true, message: 'Request sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
