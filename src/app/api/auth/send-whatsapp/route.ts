import { NextResponse } from "next/server";

// Twilio Config (Fill these for real WhatsApp messages)
const TWILIO_SID = "your_twilio_sid";
const TWILIO_TOKEN = "your_twilio_token";
const TWILIO_WHATSAPP_NUMBER = "whatsapp:+14155238886"; // Twilio Sandbox Number

export async function POST(request: Request) {
  try {
    const { phone, code, name } = await request.json();

    console.log(`[WHATSAPP] Sending code ${code} to +${phone}`);

    // Real Twilio Integration
    if (TWILIO_SID !== "your_twilio_sid") {
      const basicAuth = Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString('base64');
      
      await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`, {
        method: "POST",
        headers: {
          "Authorization": `Basic ${basicAuth}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          From: TWILIO_WHATSAPP_NUMBER,
          To: `whatsapp:+${phone}`,
          Body: `SB STORE: Hello ${name}, your verification code is: ${code}. Welcome to the elite.`
        })
      });
    }

    return NextResponse.json({ success: true, message: "WhatsApp sent (Check terminal if credentials missing)" });
  } catch (error) {
    console.error("WhatsApp API Error:", error);
    return NextResponse.json({ error: "Failed to send WhatsApp" }, { status: 500 });
  }
}
