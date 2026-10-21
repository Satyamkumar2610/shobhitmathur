// Vercel serverless function: forwards contact-form messages to Web3Forms.
// Access keys live only in the server environment (WEB3FORMS_ACCESS_KEYS,
// comma-separated, one key per recipient inbox) and never reach the browser.

interface Req {
  method?: string;
  body?: unknown;
}
interface Res {
  status: (code: number) => Res;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

const FIELDS = ["name", "email", "subject", "organization", "message"] as const;

export default async function handler(req: Req, res: Res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false });
  }

  const keys = (process.env.WEB3FORMS_ACCESS_KEYS || "")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  if (keys.length === 0) {
    console.error("WEB3FORMS_ACCESS_KEYS is not set");
    return res.status(500).json({ success: false });
  }

  const input = (typeof req.body === "object" && req.body ? req.body : {}) as Record<string, unknown>;
  if (input.botcheck) return res.status(200).json({ success: true }); // honeypot

  const payload: Record<string, string> = {};
  for (const f of FIELDS) {
    payload[f] = String(input[f] ?? "").slice(0, f === "message" ? 5000 : 300);
  }
  if (!payload.name || !payload.email || !payload.message) {
    return res.status(400).json({ success: false });
  }

  const results = await Promise.allSettled(
    keys.map(async (access_key) => {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, access_key }),
      });
      const data = (await r.json()) as { success?: boolean; message?: string };
      if (!data.success) throw new Error(data.message || "Submission failed");
    }),
  );
  results.forEach((r) => {
    if (r.status === "rejected") console.error("Delivery failed:", r.reason);
  });

  const ok = results.some((r) => r.status === "fulfilled");
  return res.status(ok ? 200 : 502).json({ success: ok });
}
