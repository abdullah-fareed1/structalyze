import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse body payload
  app.use(express.json());

  // API Route to handle Waitlist Submission and trigger Resend
  app.post('/api/waitlist', async (req, res) => {
    try {
      const { email, role, company, useCase } = req.body;

      if (!email) {
        return res.status(400).json({ error: 'Email is required.' });
      }

      console.log(`[Waitlist Signup] Email: ${email}, Role: ${role}, Company: ${company}, Use Case: ${useCase}`);

      const apiKey = process.env.RESEND_API_KEY;
      const founderEmail = process.env.FOUNDER_EMAIL || 'abdullahfareed882@gmail.com';

      if (!apiKey) {
        console.warn('⚠️ [Resend API] Warning: RESEND_API_KEY is not defined. Email dispatch was skipped, running in mock/fallback mode.');
        return res.status(200).json({
          status: 'success_with_mock',
          message: 'Registered successfully. Set RESEND_API_KEY to send real emails!',
        });
      }

      // Prepare beautiful structured email body for the user
      const emailBody = `
        <div style="font-family: sans-serif; background-color: #050505; color: #ededed; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0; letter-spacing: -0.05em;">Structalyze</h1>
            <p style="color: #3b82f6; font-size: 11px; text-transform: uppercase; font-family: monospace; letter-spacing: 0.15em; margin-top: 5px;">Meetings End. Context Shouldn't.</p>
          </div>
          <div style="background-color: #09090b; padding: 30px; border-radius: 8px; border: 1px solid #111113; margin-bottom: 30px;">
            <h2 style="color: #ffffff; font-size: 18px; margin-top: 0; margin-bottom: 15px; text-align: center;">Welcome to the Private MVP Queue</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #a1a1aa; margin-bottom: 20px;">
              Thank you for requesting access to our private MVP. Your registration will be reviewed by our partnership and pilot success team. We are rolling out access to select groups to guarantee stellar latency and pristine performance. You will be notified instantly via email once your request is approved and your sandbox credentials are ready.
            </p>
            <div style="text-align: center; background-color: #050505; padding: 20px; border-radius: 6px; border: 1px solid #1a1a1a; margin-bottom: 20px;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #71717a; display: block; margin-bottom: 5px;">Your Queue Status</span>
              <span style="font-size: 18px; font-weight: bold; color: #f59e0b; font-family: monospace;">PENDING REVIEW</span>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #a1a1aa;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #71717a;">Registered Email:</td>
                <td style="padding: 6px 0; text-align: right; color: #ffffff; font-family: monospace;">${email}</td>
              </tr>
              ${company ? `<tr>
                <td style="padding: 6px 0; font-weight: bold; color: #71717a;">Organization:</td>
                <td style="padding: 6px 0; text-align: right; color: #ffffff;">${company}</td>
              </tr>` : ''}
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #71717a;">Selected Persona:</td>
                <td style="padding: 6px 0; text-align: right; color: #ffffff; text-transform: capitalize;">${role ? role.replace('-', ' ') : 'subscriber'}</td>
              </tr>
            </table>
          </div>
          <p style="font-size: 11px; line-height: 1.5; color: #52525b; text-align: center; margin: 0;">
            This is an automated confirmation of waitlist interest. Our team reviews all submissions manually.
            <br/>
            Unsubscribe instantly by replying with 'stop'.
          </p>
        </div>
      `;

      // Prepare beautiful structured founder notification email
      const founderNotificationBody = `
        <div style="font-family: sans-serif; background-color: #0a0a0c; color: #ededed; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #222;">
          <div style="border-bottom: 1px solid #222; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="color: #3b82f6; font-size: 20px; font-weight: bold; margin: 0;">🚀 New Waitlist Signup on Structalyze!</h2>
            <p style="color: #71717a; font-size: 12px; margin: 5px 0 0 0;">Source: Web App Waitlist Form</p>
          </div>
          <div style="background-color: #121214; padding: 20px; border-radius: 8px; border: 1px solid #222;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #a1a1aa;">
              <tr style="border-bottom: 1px solid #1f1f23;">
                <td style="padding: 10px 0; font-weight: bold; color: #ffffff; width: 35%;">User Email:</td>
                <td style="padding: 10px 0; color: #3b82f6; font-family: monospace; font-weight: bold;">${email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #1f1f23;">
                <td style="padding: 10px 0; font-weight: bold; color: #ffffff;">Persona / Role:</td>
                <td style="padding: 10px 0; color: #ffffff;">${role}</td>
              </tr>
              <tr style="border-bottom: 1px solid #1f1f23;">
                <td style="padding: 10px 0; font-weight: bold; color: #ffffff;">Company/Org:</td>
                <td style="padding: 10px 0; color: #ffffff;">${company || 'Not Specified'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #ffffff; vertical-align: top;">CRM Pain Case:</td>
                <td style="padding: 10px 0; color: #e4e4e7; line-height: 1.5;">${useCase || 'None provided'}</td>
              </tr>
            </table>
          </div>
          <p style="font-size: 11px; color: #52525b; text-align: center; margin-top: 25px;">
            Structalyze Private MVP Engine • Automated Notification Service
          </p>
        </div>
      `;

      // Dispatch confirmation email to user, BCC'd to Founder using verified custom domain no-reply
      const resendUserRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Structalyze <no-reply@mail.structalyze.com>',
          to: email,
          bcc: founderEmail,
          subject: 'Your Structalyze MVP Request [Pending Review]',
          html: emailBody,
        }),
      });

      // Dispatch direct alert copy to Founder as requested
      const resendFounderRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Structalyze System <no-reply@mail.structalyze.com>',
          to: founderEmail,
          subject: `[Waitlist Alert] ${email} joined Structalyze queue`,
          html: founderNotificationBody,
        }),
      });

      const userData = await resendUserRes.json();

      if (!resendUserRes.ok) {
        console.error('[Resend User API Error]', userData);
        return res.status(resendUserRes.status).json({
          error: 'Resend API error occurred. Unable to send confirmation email.',
          details: userData,
        });
      }

      return res.status(200).json({ status: 'success', data: userData });
    } catch (error: any) {
      console.error('[Waitlist route error]', error);
      return res.status(500).json({ error: error.message || 'Server encountered internal error.' });
    }
  });

  // API Route to handle Contact Desk Submissions and trigger Resend notifications to Founder
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!email || !name || !message) {
        return res.status(400).json({ error: 'Name, email, and message details are required.' });
      }

      console.log(`[Contact Submission] Name: ${name}, Email: ${email}, Subject: ${subject}`);

      const apiKey = process.env.RESEND_API_KEY;
      const founderEmail = process.env.FOUNDER_EMAIL || 'abdullahfareed882@gmail.com';

      if (!apiKey) {
        console.warn('⚠️ [Resend API] Warning: RESEND_API_KEY is not defined. Contact email dispatch was bypassed, running in mock/fallback mode.');
        return res.status(200).json({
          status: 'success_with_mock',
          message: 'Inquiry registered successfully. Set RESEND_API_KEY to trigger real email dispatch!',
        });
      }

      const subjectFriendlyName = (() => {
        switch (subject) {
          case 'investor': return 'Venture Capital / Investment Desk';
          case 'tech-engineering': return 'Creator / Influencer Partner Desk';
          case 'early-pilot': return 'Custom Beta Integration Pilot';
          case 'general':
          default: return 'General Vision Inquiry';
        }
      })();

      // 1. Prepare copy for visitor inquiry confirmation email body
      const userEmailBody = `
        <div style="font-family: sans-serif; background-color: #050505; color: #ededed; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a1a;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffffff; font-size: 28px; font-weight: bold; margin: 0; letter-spacing: -0.05em;">Structalyze</h1>
            <p style="color: #3b82f6; font-size: 11px; text-transform: uppercase; font-family: monospace; letter-spacing: 0.15em; margin-top: 5px;">Sovereign CRM Context Layer</p>
          </div>
          <div style="background-color: #09090b; padding: 30px; border-radius: 8px; border: 1px solid #111113; margin-bottom: 30px;">
            <h2 style="color: #ffffff; font-size: 18px; margin-top: 0; margin-bottom: 15px; text-align: center;">Inquiry Received</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #a1a1aa; margin-bottom: 20px;">
              Hello ${name},<br/><br/>
              We have successfully received your message regarding <strong>${subjectFriendlyName}</strong>. A copy of your inquiry has been logged for our executive review. We will reach back to you directly at this address shortly. Below is a copy of your submitted message details.
            </p>
            <div style="background-color: #050505; padding: 20px; border-radius: 6px; border: 1px solid #1a1a1a; margin-bottom: 20px; font-style: italic; font-size: 13px; color: #d4d4d8; line-height: 1.6;">
              "${message}"
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #a1a1aa;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #71717a;">Contact Name:</td>
                <td style="padding: 6px 0; text-align: right; color: #ffffff;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #71717a;">Professional Email:</td>
                <td style="padding: 6px 0; text-align: right; color: #ffffff; font-family: monospace;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #71717a;">Selected Desk:</td>
                <td style="padding: 6px 0; text-align: right; color: #ffffff;">${subjectFriendlyName}</td>
              </tr>
            </table>
          </div>
          <p style="font-size: 11px; line-height: 1.5; color: #52525b; text-align: center; margin: 0;">
            This is an automated confirmation of business contact inquiry. Our core partners review each dialogue request manually.
          </p>
        </div>
      `;

      // 2. Prepare structured founder notification email with the formdata embedded
      const founderNotificationBody = `
        <div style="font-family: sans-serif; background-color: #0a0a0c; color: #ededed; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #222;">
          <div style="border-bottom: 1px solid #222; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="color: #f59e0b; font-size: 20px; font-weight: bold; margin: 0;">📬 New Inquiry Submitted!</h2>
            <p style="color: #71717a; font-size: 12px; margin: 5px 0 0 0;">Source: Web App Contact Form</p>
          </div>
          <div style="background-color: #121214; padding: 20px; border-radius: 8px; border: 1px solid #222;">
            <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #a1a1aa; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #1f1f23;">
                <td style="padding: 10px 0; font-weight: bold; color: #ffffff; width: 35%;">Sender Name:</td>
                <td style="padding: 10px 0; color: #ffffff;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #1f1f23;">
                <td style="padding: 10px 0; font-weight: bold; color: #ffffff;">Sender Email:</td>
                <td style="padding: 10px 0; color: #3b82f6; font-family: monospace; font-weight: bold;">${email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #1f1f23;">
                <td style="padding: 10px 0; font-weight: bold; color: #ffffff;">Target Desk:</td>
                <td style="padding: 10px 0; color: #ffffff;">${subjectFriendlyName} (${subject})</td>
              </tr>
            </table>
            <div style="font-size: 13px; color: #fff; background-color: #050505; border: 1px solid #222; padding: 15px; border-radius: 6px; line-height: 1.6; whitespace: pre-wrap;">
              <strong>Message Details:</strong><br/><br/>
              ${message.replace(/\n/g, '<br/>')}
            </div>
          </div>
          <p style="font-size: 11px; color: #52525b; text-align: center; margin-top: 25px;">
            Structalyze Private MVP Engine • Automated Contact Incident Control
          </p>
        </div>
      `;

      // Dispatch confirmation to user, BCC'd to Founder
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Structalyze Desk <no-reply@mail.structalyze.com>',
          to: email,
          bcc: founderEmail,
          subject: `We received your Structalyze Inquiry: ${subjectFriendlyName}`,
          html: userEmailBody,
        }),
      });

      // Dispatch direct alert with embedded formData to Founder as requested
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Structalyze System <no-reply@mail.structalyze.com>',
          to: founderEmail,
          subject: `[Inquiry Alert] ${name} sent a message via Contact Desk`,
          html: founderNotificationBody,
        }),
      });

      return res.status(200).json({ status: 'success' });
    } catch (error: any) {
      console.error('[Contact API route error]', error);
      return res.status(550).json({ error: error.message || 'Server encountered internal error sending contact message.' });
    }
  });

  // Vite development server / static assets configuration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Fullstack Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
