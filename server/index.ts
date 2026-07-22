import "dotenv/config";
console.log("Loaded API key:", process.env.RESEND_API_KEY ? "yes, found it" : "NOT FOUND")
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { фResend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  const resend = new Resend(process.env.RESEND_API_KEY);

  // ===== Contact form -> email via Resend =====
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body ?? {};

      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }

      const toEmail = process.env.CONTACT_TO_EMAIL;

      if (!process.env.RESEND_API_KEY || !toEmail) {
        console.error("Missing RESEND_API_KEY or CONTACT_TO_EMAIL env vars.");
        return res.status(500).json({ error: "Email is not configured on the server." });
      }

      const { error } = await resend.emails.send({
        // Resend's free tier requires this exact sender until you verify your own domain.
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
        console.error("Resend error:", error);
        return res.status(502).json({ error: "Failed to send email." });
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("Contact form error:", err);
      return res.status(500).json({ error: "Something went wrong." });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);