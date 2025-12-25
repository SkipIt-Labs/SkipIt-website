import { POST as handler } from "../webhooks/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  return handler(req);
}
