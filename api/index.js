import handleRequest from "../build/server/index.js";

export default async function handler(req, res) {
  const host = req.headers.host || "ai-peacemaker.vercel.app";
  const url = new URL(req.url || "/", `https://${host}`);
  const request = new Request(url.toString(), {
    method: req.method,
    headers: req.headers,
    body: req.method === "GET" || req.method === "HEAD" ? null : req,
  });

  const response = await handleRequest(request, 200, new Headers(), {});
  const body = await response.arrayBuffer();

  res.status(response.status);
  response.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  res.send(Buffer.from(body));
}
