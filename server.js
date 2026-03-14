import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
const pass = process.env.PASS;
// SMTP transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "jabezthedeveloper@gmail.com",
    pass: pass
  }
});

app.post("/send-email", async (req, res) => {

  const { to, subject} = req.body;

  try {

    await transporter.sendMail({
      from: "jabezthedeveloper@gmail.com",
      to: to,
      subject: subject,
      html: `
      <div style="font-family:Arial;background:#f4f6f8;padding:40px">

        <div style="
          max-width:600px;
          margin:auto;
          background:white;
          padding:30px;
          border-radius:10px;
          box-shadow:0 4px 10px rgba(0,0,0,0.1)
        ">

          <h2 style="color:#2c3e50">Hello 👋</h2>

          <p style="font-size:16px;color:#555">
            You are now a part of us <br></br>
            Welcome !!!!
          </p>

          <div style="text-align:center;margin-top:30px">
            <a href="https://example.com"
            style="
              background:#4CAF50;
              color:white;
              padding:12px 20px;
              text-decoration:none;
              border-radius:6px;
              font-weight:bold
            ">
              Open Dashboard
            </a>
          </div>

          <p style="
            font-size:12px;
            color:gray;
            margin-top:30px;
            text-align:center
          ">
            This email was automatically generated.
          </p>

        </div>

      </div>
      `
    });

    res.json({ status: "email sent" });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "email failed" });

  }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Email server running on port 3000");
});