
# Kero Graphics Studio Code - Portfolio

This is a personal portfolio website for Keren Godwin Onen, built with React, TypeScript, and Tailwind CSS.

## Features

-   Modern, responsive design
-   Light and Dark mode with persistence
-   Smooth scrolling and animations
-   Project showcase, skills, experience, and education sections
-   Functional contact form with real-time validation

## EmailJS Configuration (Contact Form)

To make the contact form functional, you need to configure it with your own EmailJS account credentials.

1.  **Create an EmailJS Account**:
    *   Sign up for a free account at [https://www.emailjs.com/](https://www.emailjs.com/).
    *   **Add a Service**: Connect your email provider (Gmail, Outlook, etc.) in the "Email Services" tab. Copy your **Service ID**.

2.  **Update Your Code**:
    *   Open `components/ContactForm.tsx`.
    *   Update `service_id`, `template_id` (for both templates below), and `user_id` (Public Key) with your credentials.

---

### Template 1: Contact Notification (For YOU)
**This is the email YOU receive when a client sends a message.**

1.  Go to "Email Templates" and create a **New Template**.
2.  **Settings**:
    *   **Name**: Admin Notification
    *   **Subject**: `New Message from {{name}}: {{subject}}`
3.  **Content**: Click on "Source Code" (or the `< >` icon) in the editor and paste the HTML below.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Inquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Courier New', monospace; background-color: #f0f2f5;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <!-- Header -->
    <tr>
      <td style="background-color: #2A324B; padding: 25px; border-bottom: 4px solid #F0544F;">
        <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 800; letter-spacing: 1px;">
          K<span style="color: #F0544F;">G</span><span style="color: #F8B462;">S</span>C
        </h1>
        <div style="display: inline-block; background: rgba(255,255,255,0.1); color: #F8B462; font-size: 10px; padding: 4px 8px; border-radius: 4px; border: 1px solid #F8B462; margin-top: 10px; text-transform: uppercase; letter-spacing: 1px;">
          // INCOMING TRANSMISSION
        </div>
      </td>
    </tr>
    <!-- Content -->
    <tr>
      <td style="padding: 30px;">
        <p style="margin-top:0; color: #2A324B; font-size: 18px; font-weight: 700; margin-bottom: 25px;">
          New Portfolio Inquiry Received
        </p>
        
        <!-- Field Block -->
        <div style="margin-bottom: 20px;">
          <div style="color: #8892b0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 5px;">SENDER IDENTITY</div>
          <div style="color: #2A324B; font-size: 16px; font-weight: 500;">{{name}}</div>
        </div>

        <!-- Field Block -->
        <div style="margin-bottom: 20px;">
          <div style="color: #8892b0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 5px;">REPLY CHANNEL</div>
          <div style="color: #2A324B; font-size: 16px; font-weight: 500;">
            <a href="mailto:{{_replyto}}" style="color:#F0544F; text-decoration:none; font-weight: 600;">{{_replyto}}</a>
          </div>
        </div>

        <!-- Field Block -->
        <div style="margin-bottom: 20px;">
          <div style="color: #8892b0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 5px;">SUBJECT LINE</div>
          <div style="color: #2A324B; font-size: 16px; font-weight: 500;">{{subject}}</div>
        </div>
        
        <!-- Message Block -->
        <div>
          <div style="color: #8892b0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 10px;">DECRYPTED MESSAGE PAYLOAD</div>
          <div style="background-color: #f8f9fa; border-left: 3px solid #F0544F; padding: 15px; color: #333; line-height: 1.6; font-size: 14px;">
            {{{message}}}
          </div>
        </div>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="background-color: #1a1f2e; padding: 15px; text-align: center;">
        <p style="color: #555; font-size: 10px; margin: 0; font-family: monospace;">SYSTEM NOTIFICATION | KGSC PORTFOLIO</p>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

### Template 2: Auto-Reply (For CLIENT)
**This is the email the CLIENT receives automatically after contacting you.**

1.  Go to "Email Templates" and create a **Second Template**.
2.  **Settings**:
    *   **Name**: Client Auto-Reply
    *   **Subject**: `Re: {{subject}} - Received`
    *   **To Email**: `{{_replyto}}` (Important: This sends it back to the sender).
3.  **Content**: Click on "Source Code" (or the `< >` icon) and paste the HTML below.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Auto Reply</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Courier New', Courier, monospace; background-color: #f4f4f4;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border-collapse: collapse; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
    <!-- Header -->
    <tr>
      <td align="center" style="background-color: #2A324B; padding: 30px 15px; border-bottom: 4px solid #F0544F;">
        <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-weight: 800; letter-spacing: -2px; line-height: 1;">
          <span style="color: #ffffff;">K</span><span style="color: #F0544F;">G</span><span style="color: #F8B462;">S</span><span style="color: #ffffff;">C</span>
        </h1>
        <p style="color: #F8B462; font-size: 12px; margin: 8px 0 0 0; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">
          [ SYSTEM STATUS: RECEIVED ]
        </p>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding: 40px 30px 20px 30px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
          <tr>
            <td style="padding-bottom: 25px;">
              <h2 style="color: #2A324B; font-size: 22px; margin: 0; font-weight: 700; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Hi {{name}},</h2>
              <p style="color: #555555; font-size: 16px; margin: 15px 0 0 0; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Thank you for initializing contact. We have successfully received your request: <strong style="color:#F0544F">"{{subject}}"</strong>.
              </p>
              <p style="color: #555555; font-size: 16px; margin: 10px 0 0 0; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Our team is currently parsing your inquiry and will execute a response sequence within the next <strong style="color:#2A324B">15 Minutes</strong>.
              </p>
            </td>
          </tr>
          <!-- Tech Divider -->
          <tr>
            <td>
              <div style="height: 1px; background: #e0e0e0; position: relative; margin: 20px 0;">
                <div style="width: 40px; height: 4px; background: #F0544F; position: absolute; left: 0; top: -1px;"></div>
              </div>
            </td>
          </tr>
          <!-- Message Recap -->
          <tr>
            <td style="padding-top: 10px; padding-bottom: 30px;">
              <p style="color: #999; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; font-family: monospace;">// INCOMING TRANSMISSION LOG</p>
              <div style="background-color: #f8f9fa; border-left: 3px solid #2A324B; padding: 15px; border-radius: 4px; font-size: 14px; color: #444; font-family: monospace;">
                 {{{message}}}
              </div>
            </td>
          </tr>
          <!-- Social Connectivity Module -->
          <tr>
            <td>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #2A324B; border-radius: 8px; overflow: hidden;">
                    <tr>
                        <td align="center" style="padding: 25px;">
                            <p style="color: #F8B462; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 10px 0; font-family: monospace;">
                                // REDUCE LATENCY
                            </p>
                            <p style="color: #ffffff; font-size: 14px; margin: 0 0 20px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                                If response time exceeds parameters, connect directly via our secure channels.
                            </p>
                            
                            <!-- WhatsApp Button -->
                            <a href="https://wa.me/+2349015183471" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 4px; font-weight: bold; font-size: 14px; border-bottom: 3px solid #1a9646; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                                Start WhatsApp Chat &rarr;
                            </a>
    
                            <!-- Social Links -->
                            <div style="margin-top: 25px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
                                <a href="https://www.x.com/KerenOnen46019" style="color: #b0b8c4; text-decoration: none; font-size: 12px; margin: 0 10px; font-family: sans-serif;">X (Twitter)</a>
                                <span style="color: #444;">|</span>
                                <a href="https://www.facebook.com/keren.onen.92" style="color: #b0b8c4; text-decoration: none; font-size: 12px; margin: 0 10px; font-family: sans-serif;">Facebook</a>
                                <span style="color: #444;">|</span>
                                <a href="https://github.com/engrkero" style="color: #b0b8c4; text-decoration: none; font-size: 12px; margin: 0 10px; font-family: sans-serif;">GitHub</a>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td align="center" style="background-color: #1a1f2e; padding: 20px 25px;">
        <p style="color: #8892b0; font-size: 12px; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          Best regards,<br>
          <strong style="color: #ffffff;">The KGSC Team</strong>
        </p>
        <p style="color: #555; font-size: 10px; margin: 10px 0 0 0; font-family: monospace;">
          &copy; Kero Graphics Studio Code. Secure Transmission.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
```
