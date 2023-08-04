import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  console.log("req", req);

  // NextResponse.json({
  //   ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
  // });

  return NextResponse.json({
    ip: req.ip,
  });
}
