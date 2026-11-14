// Course waitlist signup. The browser posts here (same site).
//
// Signups are stored on the site itself, in the Cloudflare KV namespace bound
// to this Pages project as WAITLIST. Calista views and downloads the list at
// /api/signups (that address needs the SIGNUPS_KEY value in it).
//
// Each signup now also goes to Kit, into the Newsletter site form with the
// Course Waitlist tag, so the course launch emails can be sent from Kit. The
// Kit step uses the Kit API and the same three calls the Kit connection uses:
// create the subscriber, join the form, apply the tag. The API key is read
// from the KIT_API_KEY secret on this Pages project. Until that secret is
// added, the Kit step is skipped and signups still save on the site as before,
// so the page never breaks.
//
// Until the WAITLIST binding exists, signups fall back to the old public Kit
// form post so the page never breaks.
const LEGACY_KIT_FORM_ID = "10021620";
const KIT_FORM_ID = "10158402";
const KIT_TAG_ID = "25846583";
const KIT_API_BASE = "https://api.kit.com/v4";

async function addToKit(email, apiKey) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Kit-Api-Key": apiKey,
  };
  const created = await fetch(KIT_API_BASE + "/subscribers", {
    method: "POST",
    headers,
    body: JSON.stringify({ email_address: email, state: "active" }),
  });
  if (!created.ok) {
    console.log("Kit subscriber create failed", created.status, (await created.text()).slice(0, 300));
    return false;
  }
  const payload = await created.json().catch(() => ({}));
  const subscriberId = payload && payload.subscriber ? payload.subscriber.id : null;
  if (!subscriberId) {
    console.log("Kit subscriber create gave no subscriber id");
    return false;
  }
  const joins = await Promise.all([
    fetch(KIT_API_BASE + "/forms/" + KIT_FORM_ID + "/subscribers", {
      method: "POST",
      headers,
      body: JSON.stringify({ subscriber_id: subscriberId }),
    }),
    fetch(KIT_API_BASE + "/tags/" + KIT_TAG_ID + "/subscribers", {
      method: "POST",
      headers,
      body: JSON.stringify({ subscriber_id: subscriberId }),
    }),
  ]);
  let allOk = true;
  for (const res of joins) {
    if (!res.ok) {
      allOk = false;
      console.log("Kit form or tag join failed", res.status, (await res.text()).slice(0, 300));
    }
  }
  return allOk;
}

export async function onRequestPost({ request, env }) {
  let email = "";
  try {
    const body = await request.json();
    email = String(body.email || "").trim();
  } catch {}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  let stored = false;
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
    stored = true;
  }

  let kitDone = false;
  if (env.KIT_API_KEY) {
    try {
      kitDone = await addToKit(email, env.KIT_API_KEY);
    } catch (err) {
      console.log("Kit sync failed", String(err).slice(0, 300));
    }
  }

  if (stored || kitDone) {
    return Response.json({ ok: true, confirm: false });
  }

  const upstream = await fetch(`https://app.kit.com/forms/${LEGACY_KIT_FORM_ID}/subscriptions`, {
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
