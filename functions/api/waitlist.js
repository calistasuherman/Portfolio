// Course waitlist signup. The browser posts here (same site).
//
// Signups are stored on the site itself, in the Cloudflare KV namespace bound
// to this Pages project as WAITLIST. Calista views/downloads the list at
// /api/signups?key=<SIGNUPS_KEY>.
//
// Until the WAITLIST binding exists, signups fall back to the old Kit form so
// the page never breaks.
const KIT_FORM_ID = "10021620";

export async function onRequestPost({ request, env }) {
  let email = "";
  try {
    const body = await request.json();
    email = String(body.email || "").trim();
  } catch {}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  if (env.WAITLIST) {
    const key = "email:" + email.toLowerCase();
    const existing = await env.WAITLIST.get(key);
    if (!existing) {
      await env.WAITLIST.put(
        key,
        JSON.stringify({
          email,
          joined: new Date().toISOString(),
          country: request.cf?.country || "",
        })
      );
    }
    return Response.json({ ok: true, confirm: false });
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
  return Response.json({ ok: true, confirm: true });
}
