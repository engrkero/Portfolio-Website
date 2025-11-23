
# Kero Graphics Studio Code - Portfolio

This is a personal portfolio website for Keren Godwin Onen, built with React, TypeScript, and Tailwind CSS.

## Features

-   Modern, responsive design
-   Light and Dark mode with persistence
-   Smooth scrolling and animations
-   Project showcase, skills, experience, and education sections
-   Functional contact form with real-time validation

## EmailJS Configuration (IMPORTANT)

For the contact form to work correctly (sending you a notification AND sending the client an auto-reply), please configure your EmailJS dashboard exactly as follows:

### 1. Account Setup
*   **Service ID**: `service_q739y9g`
*   **Public Key**: `VafLS1D-6suQGIkES`

---

### 2. Template 1: Admin Notification (Contact Us)
**ID**: `template_89tgujo`
*   **To Email**: Your personal email address (e.g., kgsc.unical@gmail.com).
*   **From Name**: `{{name}}`
*   **Subject**: `New Message from {{name}}: {{subject}}`
*   **Content (HTML)**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Inquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Courier New', monospace; background-color: #f6f9fc;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; border: 1px solid #eef1f5;">
    <!-- Header -->
    <tr>
      <td style="background-color: #ffffff; padding: 25px; border-bottom: 2px solid #F0544F;">
        <h1 style="color: #2A324B; font-size: 24px; margin: 0; font-weight: 800; letter-spacing: 1px;">
          K<span style="color: #F0544F;">G</span><span style="color: #F8B462;">S</span>C
        </h1>
        <div style="display: inline-block; background: #fff8eb; color: #F8B462; font-size: 10px; padding: 4px 8px; border-radius: 4px; border: 1px solid #F8B462; margin-top: 10px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">
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
          <div style="color: #333333; font-size: 16px; font-weight: 500;">{{name}}</div>
        </div>

        <!-- Field Block -->
        <div style="margin-bottom: 20px;">
          <div style="color: #8892b0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 5px;">REPLY CHANNEL</div>
          <div style="color: #333333; font-size: 16px; font-weight: 500;">
            <a href="mailto:{{_replyto}}" style="color:#F0544F; text-decoration:none; font-weight: 600;">{{_replyto}}</a>
          </div>
        </div>

        <!-- Field Block -->
        <div style="margin-bottom: 20px;">
          <div style="color: #8892b0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 5px;">SUBJECT LINE</div>
          <div style="color: #333333; font-size: 16px; font-weight: 500;">{{subject}}</div>
        </div>
        
        <!-- Message Block -->
        <div>
          <div style="color: #8892b0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; margin-bottom: 10px;">MESSAGE PAYLOAD</div>
          <div style="background-color: #f8f9fa; border-left: 3px solid #F0544F; padding: 15px; color: #444444; line-height: 1.6; font-size: 14px;">
            {{{message}}}
          </div>
        </div>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="background-color: #f8f9fa; padding: 15px; text-align: center; border-top: 1px solid #eeeeee;">
        <p style="color: #999999; font-size: 10px; margin: 0; font-family: monospace;">SYSTEM NOTIFICATION | KGSC PORTFOLIO</p>
      </td>
    </tr>
  </table>
</body>
</html>
```

---

### 3. Template 2: Auto-Reply (Client Feedback)
**ID**: `template_w6fbo4n`

**CRITICAL SETTING**:
*   **To Email**: `{{to_email}}` 
    *(If that doesn't work, try `{{_replyto}}`. The code sends both, but your dashboard must match one of them).*
*   **Subject**: `Re: {{subject}} - Received`
*   **Content (HTML)**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Auto Reply</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Courier New', Courier, monospace; background-color: #f6f9fc;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border-collapse: collapse; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #eef1f5;">
    <!-- Header -->
    <tr>
      <td align="center" style="background-color: #ffffff; padding: 30px 15px; border-bottom: 2px solid #F0544F;">
        <h1 style="color: #2A324B; font-size: 32px; margin: 0; font-weight: 800; letter-spacing: -2px; line-height: 1;">
          <span style="color: #2A324B;">K</span><span style="color: #F0544F;">G</span><span style="color: #F8B462;">S</span><span style="color: #2A324B;">C</span>
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
                Thank you for reaching out. We have successfully received your request: <strong style="color:#F0544F">"{{subject}}"</strong>.
              </p>
              <p style="color: #555555; font-size: 16px; margin: 10px 0 0 0; line-height: 1.6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Our team is currently reviewing your inquiry and will respond within <strong style="color:#2A324B">15 Minutes</strong>.
              </p>
            </td>
          </tr>
          <!-- Tech Divider -->
          <tr>
            <td>
              <div style="height: 1px; background: #e0e0e0; position: relative; margin: 20px 0;">
                <div style="width: 40px; height: 3px; background: #F0544F; position: absolute; left: 0; top: -1px;"></div>
              </div>
            </td>
          </tr>
          <!-- Message Recap -->
          <tr>
            <td style="padding-top: 10px; padding-bottom: 30px;">
              <p style="color: #999; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; font-family: monospace;">// INCOMING TRANSMISSION LOG</p>
              <div style="background-color: #f8f9fa; border-left: 3px solid #2A324B; padding: 15px; border-radius: 4px; font-size: 14px; color: #555; font-family: monospace;">
                 {{{message}}}
              </div>
            </td>
          </tr>
          <!-- Social Connectivity Module -->
          <tr>
            <td>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border-radius: 8px; border: 1px solid #eeeeee;">
                    <tr>
                        <td align="center" style="padding: 25px;">
                            <p style="color: #F8B462; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 10px 0; font-family: monospace;">
                                // REDUCE LATENCY
                            </p>
                            <p style="color: #555555; font-size: 14px; margin: 0 0 20px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                                If response time exceeds parameters, connect directly via our secure channels.
                            </p>
                            
                            <!-- WhatsApp Button -->
                            <a href="https://wa.me/+2349015183471" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 4px; font-weight: bold; font-size: 14px; border-bottom: 3px solid #1a9646; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                                Start WhatsApp Chat &rarr;
                            </a>
    
                            <!-- Social Links -->
                            <div style="margin-top: 25px; border-top: 1px solid #e0e0e0; padding-top: 15px;">
                                <a href="https://www.x.com/KerenOnen46019" style="color: #666666; text-decoration: none; font-size: 12px; margin: 0 10px; font-family: sans-serif; font-weight: bold;">X (Twitter)</a>
                                <span style="color: #cccccc;">|</span>
                                <a href="https://www.facebook.com/keren.onen.92" style="color: #666666; text-decoration: none; font-size: 12px; margin: 0 10px; font-family: sans-serif; font-weight: bold;">Facebook</a>
                                <span style="color: #cccccc;">|</span>
                                <a href="https://github.com/engrkero" style="color: #666666; text-decoration: none; font-size: 12px; margin: 0 10px; font-family: sans-serif; font-weight: bold;">GitHub</a>
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
      <td align="center" style="background-color: #ffffff; padding: 20px 25px; border-top: 1px solid #eeeeee;">
        <p style="color: #2A324B; font-size: 12px; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          Best regards,<br>
          <strong style="color: #2A324B;">The KGSC Team</strong>
        </p>
        <p style="color: #999999; font-size: 10px; margin: 10px 0 0 0; font-family: monospace;">
          &copy; Kero Graphics Studio Code. Secure Transmission.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
```
