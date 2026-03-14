import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// TODO: Add nellie@johnson6.com and mike@johnson6.com after verifying a domain in Resend
const NOTIFY_EMAILS = ["mjlearn.ai@gmail.com"];

interface ContactPayload {
  name: string;
  email: string;
  phone: string | null;
  due_date: string | null;
  message: string | null;
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const { name, email, phone, due_date, message } = body;

  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required" },
      { status: 400 }
    );
  }

  // Insert into Supabase using service role (bypasses RLS)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: "south_bay_milk_club" } }
  );

  const { error: dbError } = await supabase
    .from("contact_submissions")
    .insert([{ name, email, phone, due_date, message }]);

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }

  // Send notification email — don't block the success response if this fails
  try {
    await resend.emails.send({
      from: "The Feed <onboarding@resend.dev>",
      to: NOTIFY_EMAILS,
      subject: `New contact form submission from ${name}`,
      html: buildEmailHtml({ name, email, phone, due_date, message }),
    });
  } catch (emailError) {
    // Log but don't fail the request — the submission is already saved
    console.error("Resend email error:", emailError);
  }

  return NextResponse.json({ success: true });
}

function buildEmailHtml(data: ContactPayload): string {
  const rows = [
    { label: "Name", value: data.name },
    { label: "Email", value: `<a href="mailto:${data.email}">${data.email}</a>` },
    { label: "Phone", value: data.phone || "—" },
    { label: "Due date / birthday", value: data.due_date || "—" },
    { label: "Message", value: data.message || "—" },
  ];

  const tableRows = rows
    .map(
      (r) => `
      <tr>
        <td style="padding: 8px 12px; font-weight: 600; color: #2D2D2D; border-bottom: 1px solid #f0e8df; white-space: nowrap; vertical-align: top;">${r.label}</td>
        <td style="padding: 8px 12px; color: #2D2D2D; border-bottom: 1px solid #f0e8df;">${r.value}</td>
      </tr>`
    )
    .join("");

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto;">
      <div style="background-color: #C4724E; padding: 20px 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #FFF8F0; font-size: 18px; margin: 0;">New Contact Form Submission</h1>
      </div>
      <div style="background-color: #FFF8F0; padding: 24px; border: 1px solid #f0e8df; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          ${tableRows}
        </table>
        <p style="margin-top: 20px; font-size: 13px; color: #999;">
          Submitted via thefeedwellness.com contact form
        </p>
      </div>
    </div>
  `;
}
