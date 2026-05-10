import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gurlekyunusemre2@gmail.com",
    pass: "qqhk vcsq ybol kucj",
  },
});

export async function POST(request: Request) {
  try {
    const { email, code, name } = await request.json();

    console.log(`[AUTH] Sending verification code ${code} to ${email}`);

    const mailOptions = {
      from: '"SB Store" <gurlekyunusemre2@gmail.com>',
      to: email,
      subject: "Verify Your SB Store Account",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #f0f0f0; background-color: #ffffff;">
          <h1 style="font-size: 28px; font-weight: 900; letter-spacing: -1.5px; text-transform: uppercase; font-style: italic; color: #111; margin-bottom: 30px;">
            SB<span style="color: #E63939; font-style: normal;">STORE</span>
          </h1>
          <div style="border-top: 2px solid #111; padding-top: 30px;">
            <p style="font-size: 16px; color: #111; line-height: 1.6;">Hello <strong>${name}</strong>,</p>
            <p style="font-size: 16px; color: #444; line-height: 1.6;">Welcome to SB Store. Your journey to elite combat equipment begins here. To activate your account and unlock your <strong>30% first-order discount</strong>, please use the secure code below:</p>
            
            <div style="background: #F8F8F8; padding: 40px; text-align: center; margin: 40px 0; border: 1px solid #eee;">
              <span style="font-size: 36px; font-weight: 900; letter-spacing: 12px; color: #111; display: block;">${code}</span>
            </div>
            
            <p style="font-size: 14px; color: #666; font-style: italic;">This code will expire in 10 minutes. If you didn't request this, please ignore this email.</p>
          </div>
          
          <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
            <p style="font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 2px;">
              Built for the Arena. Designed by SoftBridge Solutions.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email API Error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
