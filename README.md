# Kero Graphics Studio Code - Portfolio

This is a personal portfolio website for Keren Godwin Onen, built with React, TypeScript, and Tailwind CSS.

## Features

-   Modern, responsive design
-   Light and Dark mode with persistence
-   Smooth scrolling and animations
-   Project showcase, skills, experience, and education sections
-   Functional contact form with real-time validation

## Contact Form

The contact form is integrated with **EmailJS** to send email directly from the client-side. It includes real-time validation for a better user experience.

To make the contact form functional, you need to configure it with your own EmailJS account credentials.

1.  **Create an EmailJS Account**:
    *   Sign up for a free account at [https://www.emailjs.com/](https://www.emailjs.com/).

2.  **Set Up Your Email Service**:
    *   In your EmailJS dashboard, go to "Email Services" and add a new service (e.g., Gmail, Outlook). Follow the instructions to connect your email account.
    *   Copy your **Service ID**.

3.  **Create an Email Template**:
    *   Go to "Email Templates" and create a new template.
    *   Give your template a recognizable name and subject line, for example, `New message from {{name}}`.
    *   Switch to the **Code** editor view.
    *   Delete the existing boilerplate code and paste the following HTML template. This template is designed to match the website's theme and includes all the necessary dynamic variables: `{{name}}`, `{{_replyto}}`, `{{subject}}`, and `{{message}}`.

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <!-- Poppins font is a progressive enhancement; will fall back to sans-serif -->
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
      <title>New Portfolio Message</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; background-color: #f1f1f1;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border-collapse: collapse; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <!-- Header -->
        <tr>
          <td align="center" style="background-color: #2A324B; padding: 25px 15px;">
            <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 700; letter-spacing: -1px; line-height: 1;">
              <span style="color: #ffffff;">K</span><span style="color: #F0544F;">G</span><span style="color: #F8B462;">S</span><span style="color: #ffffff;">C</span>
            </h1>
            <p style="color: #dddddd; font-size: 16px; margin: 8px 0 0 0; font-weight: 500;">New Portfolio Message</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding: 30px 25px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
              <tr>
                <td style="padding-bottom: 20px;">
                  <h2 style="color: #2A324B; font-size: 20px; margin: 0; font-weight: 600;">Message from {{name}}</h2>
                  <p style="color: #6b7280; font-size: 14px; margin: 4px 0 0 0;">Reply to: <a href="mailto:{{_replyto}}" style="color: #F0544F; text-decoration: none; font-weight: 600;">{{_replyto}}</a></p>
                </td>
              </tr>
              <tr>
                <td style="border-top: 1px solid #e5e7eb; padding: 20px 0;">
                  <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">SUBJECT</p>
                  <p style="color: #2A324B; font-size: 16px; margin: 0;">{{subject}}</p>
                </td>
              </tr>
              <tr>
                <td style="border-top: 1px solid #e5e7eb; padding: 20px 0 0 0;">
                  <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">MESSAGE</p>
                  <p style="color: #2A324B; font-size: 16px; margin: 0; line-height: 1.6;">{{{message}}}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td align="center" style="background-color: #f8f9fa; padding: 20px 25px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">This email was sent from the contact form on your portfolio website.</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    ```
    *   Save the template and copy your new **Template ID**.

4.  **Update the Code**:
    *   Open the file `components/ContactForm.tsx`.
    *   Find the `handleSubmit` function.
    *   Replace the placeholder values for `service_id`, `template_id`, and `user_id` (your Public Key, found in your EmailJS account settings) with your actual credentials.

After these steps, your contact form will be fully operational and send beautifully branded emails.

### Optional: Set Up an Auto-Reply

EmailJS allows you to automatically send a confirmation email to the user after they submit the form. This is a great way to improve user experience.

1.  **Create a New Email Template**:
    *   In your EmailJS dashboard, go back to "Email Templates" and click "Create New Template".
    *   Switch to the **Code** editor view.
    *   Delete the boilerplate and paste the following HTML. This template confirms receipt of the message and is styled to match the website.

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <!-- Poppins font is a progressive enhancement; will fall back to sans-serif -->
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
      <title>Thanks for your message!</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Poppins', Arial, sans-serif; background-color: #f1f1f1;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; border-collapse: collapse; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <!-- Header -->
        <tr>
          <td align="center" style="background-color: #2A324B; padding: 25px 15px;">
            <h1 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 700; letter-spacing: -1px; line-height: 1;">
              <span style="color: #ffffff;">K</span><span style="color: #F0544F;">G</span><span style="color: #F8B462;">S</span><span style="color: #ffffff;">C</span>
            </h1>
            <p style="color: #dddddd; font-size: 16px; margin: 8px 0 0 0; font-weight: 500;">Thanks for Reaching Out!</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding: 30px 25px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
              <tr>
                <td style="padding-bottom: 20px;">
                  <h2 style="color: #2A324B; font-size: 20px; margin: 0; font-weight: 600;">Hi {{name}},</h2>
                  <p style="color: #6b7280; font-size: 16px; margin: 12px 0 0 0; line-height: 1.6;">
                    Thank you for getting in touch! This is an automated reply to confirm that I've received your message. I'm currently reviewing it and will get back to you as soon as possible.
                  </p>
                </td>
              </tr>
              <tr>
                <td style="border-top: 1px solid #e5e7eb; padding: 20px 0;">
                  <p style="color: #6b7280; font-size: 14px; margin: 0 0 12px 0; font-weight: 600;">A COPY OF YOUR MESSAGE:</p>
                  <div style="background-color: #f8f9fa; border-left: 3px solid #F0544F; padding: 15px; border-radius: 4px;">
                     <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">SUBJECT</p>
                     <p style="color: #2A324B; font-size: 16px; margin: 0 0 15px 0;">{{subject}}</p>
                     <p style="color: #6b7280; font-size: 14px; margin: 0 0 8px 0; font-weight: 600;">MESSAGE</p>
                     <p style="color: #2A324B; font-size: 16px; margin: 0; line-height: 1.6;">{{{message}}}</p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td align="center" style="background-color: #f8f9fa; padding: 20px 25px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px; margin: 0;">
              Best regards,<br>
              <span style="font-weight: 600; color: #2A324B;">Keren Godwin Onen</span>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
    ```
    *   Save this template. Note its **Template ID**.

2.  **Configure and Enable Auto-Reply**:
    *   **Configure Template Settings:** In your EmailJS dashboard, go to the auto-reply template you just created. Click on the **"Settings"** tab for that template. In the **"To Email"** field, you **must** enter `{{_replyto}}`. This is a critical step that tells EmailJS to send the reply to the email address the visitor entered in the form.
    *   **Enable in Service:** Now, go to "Email Services" and select the service you configured (e.g., Gmail). Go to its **"Settings"** tab.
    *   In the **Auto Reply** section, check the box to enable it.
    *   Select your auto-reply template from the dropdown menu.
    *   Click **"Save"**.

Now, whenever someone sends a message, they will instantly receive a professional, branded confirmation email.