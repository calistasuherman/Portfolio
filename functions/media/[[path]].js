// Serves /media/* from the R2 bucket's public URL through the site's own domain.
// Some networks (e.g. ISPs in Indonesia) block *.r2.dev, which made every video fail to load.
const ORIGIN = "https://pub-339b8fdf5f2b413b8d0d9613ab2595b2.r2.dev";

export async function onRequest({ request }) {
  // keep the path exactly as the browser encoded it (file names with spaces)
  const path = new URL(request.url).pathname.replace(/^\/media\//, "");
  const headers = new Headers();
  const range = request.headers.get("Range");
  if (range) headers.set("Range", range);

  const upstream = await fetch(`${ORIGIN}/${path}`, {
    method: request.method === "HEAD" ? "HEAD" : "GET",
    headers,
    cf: { cacheEverything: true, cacheTtl: 86400 },
  });

  const out = new Headers(upstream.headers);
  out.set("Cache-Control", "public, max-age=86400");
  out.set("Access-Control-Allow-Origin", "*");
  return new Response(upstream.body, { status: upstream.status, headers: out });
}
