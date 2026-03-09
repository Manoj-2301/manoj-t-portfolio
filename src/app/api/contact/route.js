import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const data = await request.json();
        const { name, email, subject, message } = data;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. WhatsApp Delivery via Meta API
        if (process.env.WHATSAPP_PHONE && process.env.WHATSAPP_API_KEY) {
            // WHATSAPP_PHONE should be the Phone Number ID from Meta
            // WHATSAPP_API_KEY is the Bearer Token from Meta
            // WHATSAPP_TARGET_PHONE is the recipient's phone number (with country code, e.g. 9186395vs63091)
            const targetPhone = process.env.WHATSAPP_TARGET_PHONE || process.env.WHATSAPP_PHONE;

            const whatsappText = `*New Portfolio Message!*\n*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject || 'None'}\n*Message:* ${message}`;

            const metaUrl = `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE}/messages`;

            try {
                const waRes = await fetch(metaUrl, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${process.env.WHATSAPP_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        messaging_product: "whatsapp",
                        to: targetPhone,  // The number receiving the message, properly formatted
                        type: "text",
                        text: {
                            body: whatsappText
                        }
                    })
                });

                if (!waRes.ok) {
                    const waData = await waRes.json();
                    console.error("WhatsApp Meta API Error:", waData);
                }
            } catch (err) {
                console.error("WhatsApp Request Failed:", err);
            }
        } else {
            console.warn("WhatsApp messages will not be sent because WHATSAPP_PHONE or WHATSAPP_API_KEY is missing in .env");
        }

        // 2. Email Delivery via Nodemailer
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Use 'gmail' as default
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_USER, // Send email to yourself
                replyTo: email,
                subject: `Portfolio Contact: ${subject || 'New Message'} from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'None'}\n\nMessage:\n${message}`,
                html: `
                    <!DOCTYPE html>
                <html>
                    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa; padding: 40px 20px; margin: 0; background-image: url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 800 600\\'><circle cx=\\'-50\\' cy=\\'300\\' r=\\'200\\' fill=\\'none\\' stroke=\\'%23f97316\\' stroke-width=\\'4\\'/><circle cx=\\'800\\' cy=\\'500\\' r=\\'150\\' fill=\\'%23f97316\\'/><circle cx=\\'700\\' cy=\\'0\\' r=\\'100\\' fill=\\'none\\' stroke=\\'%23fed7aa\\' stroke-width=\\'20\\'/></svg>'); background-size: cover; background-position: center; background-repeat: no-repeat;">
                        <div style="max-width: 600px; margin: 40px auto; background-color: rgba(255, 255, 255, 0.95); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1); border-top: 6px solid #f97316;">
                            <div style="background-color: #18181b; padding: 30px; text-align: center;">
                                <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">🚀 New Portfolio Message</h2>
                            </div>
                            <div style="padding: 40px;">
                                <div style="margin-bottom: 24px;">
                                    <div style="color: #71717a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; margin-bottom: 6px;">From</div>
                                    <div style="color: #27272a; font-size: 16px; margin: 0; line-height: 1.5;"><strong>${name}</strong> </div>
                                </div>
                                <div style="margin-bottom: 24px;">
                                    <div style="color: #71717a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; margin-bottom: 6px;">Email</div>
                                    <div style="color: #27272a; font-size: 16px; margin: 0; line-height: 1.5;"><strong>${email}</strong> </div>
                                </div>
                                <div style="margin-bottom: 24px;">
                                    <div style="color: #71717a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; margin-bottom: 6px;">Subject</div>
                                    <div style="color: #27272a; font-size: 16px; margin: 0; line-height: 1.5;">${subject || 'No Subject Provided'}</div>
                                </div>
                                <div style="margin-bottom: 24px;">
                                    <div style="color: #71717a; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; margin-bottom: 6px;">Message</div>
                                    <div style="background-color: #f4f4f5; border-radius: 8px; padding: 20px; font-style: italic; color: #3f3f46; font-size: 15px; line-height: 1.6; white-space: pre-wrap; margin-top: 10px;">${message}</div>
                                </div>
                            </div>
                            <div style="background-color: #fafafa; padding: 20px; text-align: center; border-top: 1px solid #e4e4e7;">
                                <p style="color: #a1a1aa; font-size: 13px; margin: 0;">Sent automatically from your Portfolio Website</p>
                            </div>
                        </div>
                    </body>
                </html>
            `,
            };

            await transporter.sendMail(mailOptions);

            // Send Thank You Email to the User
            const userMailOptions = {
                from: process.env.EMAIL_USER,
                to: email, // Send email to the user
                subject: `Thanks for reaching out, ${name}!`,
                html: `
                    <!DOCTYPE html>
                    <html>
                    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa; padding: 40px 20px; margin: 0; background-image: url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 800 600\\'><circle cx=\\'-50\\' cy=\\'300\\' r=\\'200\\' fill=\\'none\\' stroke=\\'%23f97316\\' stroke-width=\\'4\\'/><circle cx=\\'800\\' cy=\\'500\\' r=\\'150\\' fill=\\'%23f97316\\'/><circle cx=\\'700\\' cy=\\'0\\' r=\\'100\\' fill=\\'none\\' stroke=\\'%23fed7aa\\' stroke-width=\\'20\\'/></svg>'); background-size: cover; background-position: center; background-repeat: no-repeat;">
                        <div style="max-width: 600px; margin: 40px auto; background-color: rgba(255, 255, 255, 0.95); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1); border-top: 6px solid #f97316;">
                            <div style="background-color: #18181b; padding: 30px; text-align: center;">
                                <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: -0.5px;">Thank You!</h2>
                            </div>
                            <div style="padding: 40px;">
                                <p style="color: #27272a; font-size: 16px; margin-bottom: 24px; line-height: 1.5;">Hi <strong>${name}</strong>,</p>
                                <p style="color: #27272a; font-size: 16px; margin-bottom: 24px; line-height: 1.5;">Thanks for reaching out! I've received your message and will get back to you as soon as possible.</p>
                                <blockquote style="background-color: #f4f4f5; border-radius: 8px; border-left: 4px solid #f97316; padding: 16px; font-style: italic; color: #3f3f46; font-size: 15px; line-height: 1.6; white-space: pre-wrap; margin: 24px 0px;">${message}</blockquote>
                                <p style="color: #27272a; font-size: 16px; margin: 0; line-height: 1.5;">Best regards,<br/><strong>Manoj Thapa</strong></p>
                            </div>
                        </div>
                    </body>
                    </html>
                `,
            };

            await transporter.sendMail(userMailOptions);
        } else {
            console.warn("Emails will not be sent because EMAIL_USER or EMAIL_PASS is missing in .env.local");
        }

        return NextResponse.json({ success: true, message: 'Message processed successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Contact API Error:', error);
        return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
    }
}
