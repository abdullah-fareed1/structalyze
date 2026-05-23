import type { IncomingMessage, ServerResponse } from 'http';

async function readJson(req: IncomingMessage) {
  return new Promise<any>((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req: IncomingMessage & { method?: string }, res: ServerResponse) {
  try {
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Method not allowed. Use POST.' }));
      return;
    }

    const body = (req as any).body || (await readJson(req));
    const { name, email, subject, message } = body || {};

    if (!email || !name || !message) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Name, email, and message details are required.' }));
      return;
    }

    const apiKey = process.env.RESEND_API_KEY;
    const founderEmail = process.env.FOUNDER_EMAIL || 'abdullahfareed882@gmail.com';

    if (!apiKey) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        status: 'success_with_mock',
        message: 'Inquiry registered successfully. Set RESEND_API_KEY to trigger real email dispatch!',
      }));
      return;
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

    const send = async (payload: any) => {
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await resp.json().catch(() => null);
      return { ok: resp.ok, status: resp.status, data };
    };

    const userPayload = {
      from: 'Structalyze Desk <no-reply@mail.structalyze.com>',
      to: email,
      bcc: founderEmail,
      subject: `We received your Structalyze Inquiry: ${subjectFriendlyName}`,
      html: userEmailBody,
    };

    const founderPayload = {
      from: 'Structalyze System <no-reply@mail.structalyze.com>',
      to: founderEmail,
      subject: `[Inquiry Alert] ${name} sent a message via Contact Desk`,
      html: founderNotificationBody,
    };

    const userRes = await send(userPayload);
    const founderRes = await send(founderPayload);

    if (!userRes.ok) {
      res.statusCode = userRes.status || 502;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Resend API error', details: userRes.data }));
      return;
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'success' }));
  } catch (error: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error?.message || String(error) }));
  }
}
