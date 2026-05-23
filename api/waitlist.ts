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
    const { email, role, company, useCase } = body || {};

    if (!email) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Email is required.' }));
      return;
    }

    const apiKey = process.env.RESEND_API_KEY;
    const founderEmail = process.env.FOUNDER_EMAIL || 'abdullahfareed882@gmail.com';

    if (!apiKey) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ status: 'success_with_mock', message: 'Registered successfully. Set RESEND_API_KEY to send real emails!' }));
      return;
    }

    const emailBody = `<!doctype html><html><body><div>Registered: ${email}</div></body></html>`;
    const founderNotificationBody = `<!doctype html><html><body><div>New waitlist signup: ${email}</div></body></html>`;

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
      from: 'Structalyze <no-reply@mail.structalyze.com>',
      to: email,
      bcc: founderEmail,
      subject: 'Your Structalyze MVP Request [Pending Review]',
      html: emailBody,
    };

    const founderPayload = {
      from: 'Structalyze System <no-reply@mail.structalyze.com>',
      to: founderEmail,
      subject: `[Waitlist Alert] ${email} joined Structalyze queue`,
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
    res.end(JSON.stringify({ status: 'success', user: userRes.data, founder: founderRes.data }));
  } catch (error: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error?.message || String(error) }));
  }
}
