import type { VercelRequest, VercelResponse } from '@vercel/node';
import { google } from 'googleapis';

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  serviceName?: string;
  location?: string;
  locationName?: string;
  eventDate?: string;
  budget?: string;
  hearAbout?: string;
  contactPreference?: string;
  message?: string;
  newsletter?: boolean;
  source?: string;
  pageUrl?: string;
};

const REQUIRED_ENV = ['GOOGLE_SERVICE_ACCOUNT', 'GOOGLE_SHEET_ID'] as const;

type RequiredEnv = (typeof REQUIRED_ENV)[number];

function getEnv(): Record<RequiredEnv, string> {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
  return REQUIRED_ENV.reduce((acc, key) => {
    acc[key] = process.env[key] as string;
    return acc;
  }, {} as Record<RequiredEnv, string>);
}

async function getSheetsClient() {
  const { GOOGLE_SERVICE_ACCOUNT } = getEnv();
  const credentialsJSON = Buffer.from(GOOGLE_SERVICE_ACCOUNT, 'base64').toString('utf8');
  const credentials = JSON.parse(credentialsJSON);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

function normalizeBody(body: unknown): LeadPayload {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch (error) {
      return {};
    }
  }
  if (typeof body === 'object') {
    return body as LeadPayload;
  }
  return {};
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const payload = normalizeBody(req.body);
    const { name, email, service, message } = payload;

    if (!name || !email || !service || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { GOOGLE_SHEET_ID } = getEnv();
    const sheets = await getSheetsClient();

    const timestamp = new Date().toISOString();
    const serviceLabel = payload.serviceName || service;
    const locationLabel = payload.locationName || payload.location || 'Unspecified';
    const preferenceLabel = payload.contactPreference || 'email';

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: 'Leads!A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            timestamp,
            name,
            email,
            payload.phone || '',
            serviceLabel,
            locationLabel,
            payload.eventDate || '',
            payload.budget || '',
            payload.hearAbout || '',
            preferenceLabel,
            payload.newsletter ? 'Yes' : 'No',
            payload.message?.replace(/\s+/g, ' ').trim() || '',
            payload.source || 'Website',
            payload.pageUrl || req.headers.referer || '',
            req.headers['x-forwarded-for'] || req.socket.remoteAddress || '',
          ],
        ],
      },
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Lead submission failed', error);
    return res.status(500).json({ error: 'Unable to record lead' });
  }
}
