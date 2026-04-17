import { Hono } from 'hono'
import nodemailer from 'nodemailer'

const emailRoute = new Hono()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const TO = process.env.CONTACT_EMAIL || 'calebelliott933@gmail.com'
const FROM = process.env.SMTP_USER || 'noreply@precisionworksdetailing.com'

const logoUrl = 'https://res.cloudinary.com/dc7kinqks/image/upload/precision-works/logo.png'

function baseTemplate(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Precision Works Detailing</title>
</head>
<body style="margin:0;padding:0;background:#F5F5F0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F5F0;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:#1C1C1E;border-radius:12px 12px 0 0;padding:28px 36px;text-align:center;">
              <p style="margin:0;color:#C4A86E;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-weight:600;">PRECISION WORKS DETAILING</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:36px;border-left:1px solid #E8E8E4;border-right:1px solid #E8E8E4;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#F0F0EB;border:1px solid #E8E8E4;border-top:none;border-radius:0 0 12px 12px;padding:20px 36px;text-align:center;">
              <p style="margin:0;color:#8A8A8A;font-size:12px;">Precision Works Detailing &mdash; Mobile Auto Detailing &mdash; We Come to You</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function fieldRow(label: string, value: string): string {
  if (!value) return ''
  return `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #F0F0EB;vertical-align:top;width:140px;">
      <span style="font-size:12px;font-weight:600;color:#8A8A8A;text-transform:uppercase;letter-spacing:0.06em;">${label}</span>
    </td>
    <td style="padding:10px 0 10px 16px;border-bottom:1px solid #F0F0EB;vertical-align:top;">
      <span style="font-size:15px;color:#1C1C1E;">${value}</span>
    </td>
  </tr>`
}

emailRoute.post('/contact', async (c) => {
  const body = await c.req.json()
  const { name, email, phone, vehicle, message } = body

  if (!name || !email || !phone) {
    return c.json({ error: 'Name, email, and phone are required.' }, 400)
  }

  const html = baseTemplate(`
    <h2 style="margin:0 0 6px;font-size:22px;color:#1C1C1E;font-style:italic;">New Contact Inquiry</h2>
    <p style="margin:0 0 28px;font-size:14px;color:#8A8A8A;">Someone reached out through the Precision Works website.</p>

    <table width="100%" cellpadding="0" cellspacing="0">
      ${fieldRow('Name', name)}
      ${fieldRow('Email', email)}
      ${fieldRow('Phone', phone)}
      ${vehicle ? fieldRow('Vehicle', vehicle) : ''}
      ${message ? fieldRow('Message', message) : ''}
    </table>

    <div style="margin-top:28px;padding:16px 20px;background:#F8F8F5;border-radius:8px;border-left:3px solid #C4A86E;">
      <p style="margin:0;font-size:13px;color:#5A5A5A;">Reply directly to this email to respond to ${name}.</p>
    </div>
  `)

  try {
    await transporter.sendMail({
      from: `"Precision Works Website" <${FROM}>`,
      to: TO,
      replyTo: email,
      subject: `New Contact: ${name}`,
      html,
    })
    return c.json({ success: true })
  } catch (err) {
    console.error('Email send error:', err)
    return c.json({ error: 'Failed to send email. Please try again.' }, 500)
  }
})

emailRoute.post('/fleet', async (c) => {
  const body = await c.req.json()
  const { businessName, contactName, email, phone, fleetSize, message } = body

  if (!email || !phone) {
    return c.json({ error: 'Email and phone are required.' }, 400)
  }

  const html = baseTemplate(`
    <h2 style="margin:0 0 6px;font-size:22px;color:#1C1C1E;font-style:italic;">New Fleet Inquiry</h2>
    <p style="margin:0 0 28px;font-size:14px;color:#8A8A8A;">A business has requested fleet detailing pricing.</p>

    <table width="100%" cellpadding="0" cellspacing="0">
      ${businessName ? fieldRow('Business', businessName) : ''}
      ${contactName ? fieldRow('Contact', contactName) : ''}
      ${fieldRow('Email', email)}
      ${fieldRow('Phone', phone)}
      ${fleetSize ? fieldRow('Fleet Size', fleetSize) : ''}
      ${message ? fieldRow('Message', message) : ''}
    </table>

    <div style="margin-top:28px;padding:16px 20px;background:#F8F8F5;border-radius:8px;border-left:3px solid #C4A86E;">
      <p style="margin:0;font-size:13px;color:#5A5A5A;">Reply directly to this email to respond${contactName ? ` to ${contactName}` : ''}.</p>
    </div>
  `)

  try {
    await transporter.sendMail({
      from: `"Precision Works Website" <${FROM}>`,
      to: TO,
      replyTo: email,
      subject: `Fleet Inquiry${businessName ? `: ${businessName}` : ''}${fleetSize ? ` — ${fleetSize}` : ''}`,
      html,
    })
    return c.json({ success: true })
  } catch (err) {
    console.error('Email send error:', err)
    return c.json({ error: 'Failed to send email. Please try again.' }, 500)
  }
})

export default emailRoute
