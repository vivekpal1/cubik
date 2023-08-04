import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import requestIp from "request-ip";

export async function GET(req: NextRequest) {
  const ip = requestIp.getClientIp(req);

  const forwarded = req.headers.get("x-forwarded-for");

  return NextResponse.json({
    requestIp: ip,
    vercel: req.ip,
    geo: req.geo,
  });
}
