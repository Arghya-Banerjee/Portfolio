import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json().catch(() => ({}));
  // TODO: hook up email provider later
  return NextResponse.json({ ok: true, received: data });
}
