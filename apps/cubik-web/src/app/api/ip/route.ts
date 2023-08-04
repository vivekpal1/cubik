import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";
import requestIp from "request-ip";

export async function GET(req: NextRequest) {
  const ip = requestIp.getClientIp(req);

  return NextResponse.json({
    ip,
  });
}
