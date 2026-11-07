// Private waitlist viewer: /api/signups?key=<SIGNUPS_KEY>
// Add &format=csv to download a spreadsheet file.
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const t = { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } };
  const want = String(env.SIGNUPS_KEY || "").trim();
  const got = String(url.searchParams.get("key") || "").trim();
  if (!want) {
    return new Response("The SIGNUPS_KEY password isn't set up yet (or the site wasn't redeployed after adding it).", { status: 503, ...t });
  }
  if (got.toLowerCase() !== want.toLowerCase()) {
    return new Response("Wrong password. Check the ?key= part of the link.", { status: 401, ...t });
  }
  if (!env.WAITLIST) {
    return new Response("The WAITLIST storage isn't connected yet.", { status: 503 });
  }

  const rows = [];
  let cursor;
  do {
    const page = await env.WAITLIST.list({ prefix: "email:", cursor });
    const values = await Promise.all(page.keys.map(k => env.WAITLIST.get(k.name)));
    for (const v of values) {
      try { if (v) rows.push(JSON.parse(v)); } catch {}
    }
    cursor = page.list_complete ? undefined : page.cursor;
  } while (cursor);
  rows.sort((a, b) => String(a.joined).localeCompare(String(b.joined)));

  if (url.searchParams.get("format") === "csv") {
    const esc = s => `"${String(s ?? "").replace(/"/g, '""')}"`;
    const csv = ["email,joined,country", ...rows.map(r => [r.email, r.joined, r.country].map(esc).join(","))].join("\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="editing-101-waitlist.csv"',
        "Cache-Control": "no-store",
      },
    });
  }

  const html = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const csvLink = `?key=${encodeURIComponent(env.SIGNUPS_KEY)}&format=csv`;
  const body = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Editing 101 waitlist</title>
<style>body{font-family:system-ui,sans-serif;background:#0b0306;color:#f5f0f0;margin:0;padding:24px 16px;max-width:760px;margin:auto}
a{color:#ff6b81}table{width:100%;border-collapse:collapse;font-size:14px}td,th{text-align:left;padding:8px 6px;border-bottom:1px solid #333;word-break:break-all}th{color:#999;font-weight:500}</style></head>
<body><h1 style="font-weight:500">Editing 101 waitlist</h1>
<p>${rows.length} sign-up${rows.length === 1 ? "" : "s"} · <a href="${html(csvLink)}">Download CSV</a></p>
<table><tr><th>#</th><th>Email</th><th>Joined (UTC)</th><th>Country</th></tr>
${rows.map((r, i) => `<tr><td>${i + 1}</td><td>${html(r.email)}</td><td>${html(String(r.joined).slice(0, 16).replace("T", " "))}</td><td>${html(r.country)}</td></tr>`).join("")}
</table></body></html>`;
  return new Response(body, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}
