export async function generatePasswordResetEmailHTML(fullname, sender_name, otp, reset_link, expires_at_minutes) {
  const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Password Reset</title>
    </head>
    <body style="margin:0; padding:0; background-color:#f2f4f6;">

      <!-- Outer wrapper table for centering -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f6;">
        <tr>
          <td align="center" style="padding:40px 20px;">

            <!-- Main content table - max-width for mobile -->
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background-color:#ffffff; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1);">

              <!-- Header with gradient effect simulation -->
              <tr>
                <td style="background-color:#003B67; padding:30px 20px; text-align:center; border-radius:8px 8px 0 0;">
                  <h1 style="margin:0; font-size:28px; font-family:Arial,sans-serif; color:#ffffff; font-weight:bold; letter-spacing:0.5px;">
                    Password Reset Request
                  </h1>
                </td>
              </tr>

              <!-- Main content area -->
              <tr>
                <td style="padding:40px 30px; font-family:Arial,sans-serif; color:#333333; font-size:15px; line-height:1.6;">

                  <p style="margin:0 0 15px 0;">
                    Hello, <strong style="color:#003B67;">${fullname}</strong>
                  </p>
                  <p style="margin:0 0 25px 0;">
                    We received a request to reset your password for your
                    <strong style="color:#003B67;">${sender_name}</strong> account.
                  </p>

                  <!-- OTP Display Box -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:25px 0;">
                    <tr>
                      <td style="background-color:#f8f9fa; border:2px dashed #0065B2; border-radius:8px; padding:20px; text-align:center;">
                        <p style="margin:0 0 10px 0; font-size:14px; font-weight:bold; color:#555555;">
                          Your One-Time Password (OTP)
                        </p>
                        <p style="margin:0; font-size:32px; font-weight:bold; letter-spacing:4px; color:#003B67; font-family:Courier New,monospace;">
                          ${otp}
                        </p>
                      </td>
                    </tr>
                  </table>

                  <!-- Reset Button - centered -->
                  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:30px 0;">
                    <tr>
                      <td align="center">
                        <table role="presentation" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" style="background-color:#0065B2; border-radius:6px; box-shadow:0 4px 6px rgba(0,101,178,0.3);">
                              <a href="${reset_link}"
                                 target="_blank"
                                 style="
                                   display:block;
                                   padding:16px 40px;
                                   font-family:Arial,sans-serif;
                                   font-size:16px;
                                   color:#ffffff !important;
                                   text-decoration:none;
                                   border-radius:6px;
                                   font-weight:bold;
                                   letter-spacing:0.5px;
                                 ">
                                Reset Password
                              </a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Warning/Info Box -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:30px;">
                    <tr>
                      <td style="background-color:#e9f4ff; border-left:4px solid #003B67; border-radius:4px; padding:20px;">
                        <p style="margin:0 0 12px 0; font-size:15px; font-weight:bold; color:#003B67;">
                            Important Security Information
                        </p>
                        <ul style="margin:0; padding:0 0 0 20px; font-size:14px; line-height:1.8; color:#333333;">
                          <li style="margin-bottom:8px;">This link will expire in <strong>${expires_at_minutes} minutes</strong></li>
                          <li style="margin-bottom:8px;">If you didn't request this, please ignore this email and your password will remain unchanged</li>
                          <li style="margin-bottom:0;">Never share your OTP or reset link with anyone, including ${sender_name} support</li>
                        </ul>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding:25px 20px; text-align:center; font-family:Arial,sans-serif; font-size:12px; color:#999999; border-top:1px solid #e0e0e0;">
                  <p style="margin:0 0 5px 0;">© ${new Date().getFullYear()} ${sender_name}. All rights reserved.</p>
                  <p style="margin:0; font-size:11px;">
                    This is an automated message, please do not reply to this email.
                  </p>
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </body>
    </html>
  `;

  return template;
}
