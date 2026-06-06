// Local development server - not deployed to production.
// Vercel uses api/contact.js for the live contact endpoint.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 4000;
const rootDir = __dirname;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.json': 'application/json',
};

loadEnvFile(path.join(rootDir, '.env'));

let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  console.log('Email service initialized');
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;

    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key && !process.env[key]) process.env[key] = value;
  }
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function serveFile(filePath, res) {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      return res.end('Not found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-cache',
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

function collectBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        reject(new Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

async function handleContact(req, res) {
  try {
    const body = await collectBody(req);
    const data = JSON.parse(body || '{}');
    const email = (data.email || '').trim();
    const name = (data.name || '').trim();
    const projectType = (data.projectType || '').trim();
    const budget = (data.budget || '').trim();
    const message = (data.message || '').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      return sendJson(res, 400, {error: 'A valid email is required.'});
    }

    const contact = {email, name, projectType, budget, message};
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: 'New Contact Request - Motion Design Portfolio',
          html: `
            <h2>New Contact Request</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Name:</strong> ${name || 'Not provided'}</p>
            <p><strong>Project Type:</strong> ${projectType || 'Not selected'}</p>
            <p><strong>Budget:</strong> ${budget || 'Not selected'}</p>
            <p><strong>Message:</strong></p>
            <p>${message || 'No message'}</p>
          `,
          replyTo: email,
        });
        console.log('New contact request received and email sent:');
      } catch (emailError) {
        console.error('Email send failed:', emailError.message);
        console.log('Contact request received but email delivery failed:');
      }
    } else {
      console.log('Email service not configured. Contact request received:');
    }

    console.log(JSON.stringify(contact, null, 2));
    return sendJson(res, 200, {success: true});
  } catch (error) {
    console.error('Error processing contact:', error);
    return sendJson(res, 500, {error: 'Internal server error.'});
  }
}

const server = http.createServer((req, res) => {
  const requestPath = req.url.split('?')[0];

  if (req.method === 'POST' && (requestPath === '/contact' || requestPath === '/api/contact')) {
    return handleContact(req, res);
  }

  if (req.method === 'GET') {
    const route = requestPath === '/' ? '/index.html' : requestPath;
    const safePath = path.normalize(decodeURIComponent(route)).replace(/^[/\\]+/, '');
    const filePath = path.join(rootDir, safePath);

    if (!filePath.startsWith(rootDir)) {
      res.writeHead(403, {'Content-Type': 'text/plain'});
      return res.end('Forbidden');
    }

    return serveFile(filePath, res);
  }

  res.writeHead(405, {'Content-Type': 'text/plain'});
  res.end('Method not allowed');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
