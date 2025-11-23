
# Kero Graphics Studio Code - Portfolio

This is a personal portfolio website for Keren Godwin Onen, built with React, TypeScript, and Tailwind CSS.

## Features

-   Modern, responsive design
-   Light and Dark mode with persistence
-   Smooth scrolling and animations
-   Project showcase, skills, experience, and education sections
-   Functional contact form with real-time validation

## Contact Form

The contact form is integrated with **EmailJS** to send emails directly from the client-side. It includes real-time validation for a better user experience.

To make the contact form functional, you need to configure it with your own EmailJS account credentials.

1.  **Create an EmailJS Account**:
    *   Sign up for a free account at [https://www.emailjs.com/](https://www.emailjs.com/).

2.  **Set Up Your Email Service**:
    *   In your EmailJS dashboard, go to "Email Services" and add a new service (e.g., Gmail, Outlook). Follow the instructions to connect your email account.
    *   Copy your **Service ID**.

3.  **Create an Email Template (For You)**:
    *   Go to "Email Templates" and create a new template.
    *   This is the email YOU receive when someone contacts you.
    *   Template ID: `template_89tgujo` (Use this in your dashboard or update the code if different).

4.  **Create an Auto-Reply Template (For Client)**:
    *   Go to "Email Templates" and create a second template.
    *   **IMPORTANT**: Set the template ID to `template_w6fbo4n` in the settings, or update the ID in `components/ContactForm.tsx`.
    *   **Settings Tab**: In the "To Email" field, enter `{{_replyto}}`. This ensures the reply goes to the user.
    *   **Content Tab**: Switch to the **Code** editor view and paste the HTML below. This template matches your website's Web3/Tech aesthetic and includes your Social Media links.

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
                  <h2 style="color: #2A324B; font-size: 22px; margin: 0; font-weight: 700;">Hi {{name}},</h2>
                  <p style="color: #555555; font-size: 16px; margin: 15px 0 0 0; line-height: 1.6;">
                    Thank you for initializing contact. We have successfully received your request: <strong style="color:#F0544F">"{{subject}}"</strong>.
                  </p>
                  <p style="color: #555555; font-size: 16px; margin: 10px 0 0 0; line-height: 1.6;">
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
                  <p style="color: #999; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">// INCOMING TRANSMISSION LOG</p>
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
                                <p style="color: #F8B462; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; margin: 0 0 10px 0;">
                                    // REDUCE LATENCY
                                </p>
                                <p style="color: #ffffff; font-size: 14px; margin: 0 0 20px 0;">
                                    If response time exceeds parameters, connect directly via our secure channels.
                                </p>
                                
                                <!-- WhatsApp Button -->
                                <a href="https://wa.me/+2349015183471" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 4px; font-weight: bold; font-size: 14px; border-bottom: 3px solid #1a9646;">
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
            <p style="color: #8892b0; font-size: 12px; margin: 0; font-family: sans-serif;">
              Best regards,<br>
              <strong style="color: #ffffff;">The KGSC Team</strong>
            </p>
            <p style="color: #555; font-size: 10px; margin: 10px 0 0 0;">
              &copy; Kero Graphics Studio Code. Secure Transmission.
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    ```
5.  **Save Changes**:
    *   Click "Save" in EmailJS.
    *   Ensure your `ContactForm.tsx` file has the updated code with `template_w6fbo4n`.

## Auto-Reply Setup (Alternative)

If you prefer not to modify the code, you can enable "Auto Reply" in your **Email Service** settings on the EmailJS dashboard. However, the current code is configured to trigger the auto-reply specifically for better control.
