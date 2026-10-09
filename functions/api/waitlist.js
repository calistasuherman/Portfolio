// Course waitlist signup. The browser posts here (same site), and this
// function forwards the email to Kit server-side, so visitors whose network
// or browser blocks Kit's domains can still join.
const KIT_FORM_ID = "10021620";

export async function onRequestPost({ request }) {
  let email = "";
  try {
    const body = await request.json();
    email = String(body.email || "").trim();
  } catch {}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  const upstream = await fetch(`https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: new URLSearchParams({ email_address: email }),
  });
  const text = await upstream.text();
  if (!upstream.ok) {
    console.log("Kit signup failed", upstream.status, text.slice(0, 500));
    return Response.json({ ok: false, error: "Signup didn't go through. Please try again.", status: upstream.status, detail: text.slice(0, 300) }, { status: 502 });
  }
  return Response.json({ ok: true });
}
