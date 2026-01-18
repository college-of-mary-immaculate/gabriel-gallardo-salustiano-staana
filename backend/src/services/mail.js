import "dotenv/config";
import nodemailer from "nodemailer";
import google from "googleapis";

export async function sendMail(sender_name, sender_email, receiver, subject, content, html) {
  try {
    const oAuth2Client = new google.Auth.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.REDIRECT_URI);

    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN || "",
    });

    const accessTokenResponse = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenResponse.token || "";

    if (!accessToken) {
      throw new Error("Failed to obtain access token");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"${sender_name}" <${process.env.GOOGLE_USER}>`,
      to: receiver,
      subject: subject,
      text: content,
      html: html,
    });

    // console.log("Email sent successfully:", {
    //   messageId: info.messageId,
    //   receiver: receiver,
    //   subject: subject,
    // });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending email:", {
      receiver: receiver,
      subject: subject,
      error: error.message,
    });

    return {
      success: false,
      error: error.message,
    };
  }
}

export default sendMail;
