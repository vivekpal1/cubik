import { NextApiRequest, NextApiResponse } from "next";
import requestIp from "request-ip";

export default function (req: NextApiRequest, res: NextApiResponse) {
  res.json({ ip: requestIp.getClientIp(req) });
}
