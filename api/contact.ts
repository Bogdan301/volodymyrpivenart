import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const { name, email, subject, message } = req.body ?? {};

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Name, email, and message are required.",
      });
    }

    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!process.env.RESEND_API_KEY || !toEmail) {
      console.error("Missing environment variables.");
      return res.status(500).json({
        error: "Email is not configured.",
      });
    }

    const { error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: toEmail,
      replyTo: email,
      subject: `[Contact Form] ${subject || "New message"} — from ${name}`,
      html: `
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject || "(none)"}</p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error(error);
      return res.status(500).json({
        error: "Failed to send email.",
      });
    }

    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Something went wrong.",
    });
  }
}