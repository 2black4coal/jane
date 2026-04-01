import { Resend } from "resend";

export async function POST(req) {
  try {
    const data = await req.json();
    const { email, fullName, total, services, phone,  address, city, state, zip, notes } = data; 

    if (!email || !fullName || !phone) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // ---- Send email to customer ----
    await resend.emails.send({
      from: "booking@dance-africa.org",   // ✔ Verified domain sender
      to: email,                          // Customer email
      subject: "Booking Received",
      html: `
        <p>Hi ${fullName},</p>
        <p>Thank you for booking with us!</p>
        <p><strong>Total:</strong> $${total}</p>
        <p><strong>Services:</strong> ${services.map(s => s.name).join(", ")}</p>
        
         <p>We will get back to you soon!</p>
         <p>Best regards,<br/>Janie-Care Team</p>
      `,
    });

    // ---- Send email to owner ----
    await resend.emails.send({
      from: "booking@dance-africa.org",   // ✔ Same verified sender
      to: "fb.axon.01@gmail.com",        // Owner email
      subject: "New Booking",
      html: `
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Total:</strong> $${total}</p>
        <p><strong>Address:</strong> ${address}, ${city}, ${state} ${zip}</p>
        <p><strong>Notes:</strong> ${notes || "None"}</p>
        <p><strong>Services:</strong> ${services.map(s => s.name).join(", ")}</p>
      `,
    });

    return Response.json({ success: true });

  } catch (err) {
    console.error("💥 ERROR:", err);
    return Response.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
