import { NextResponse } from "next/server";

import { getDailyWords } from "@/lib/word-service";

export function GET() {
  const data = getDailyWords();
  return NextResponse.json({ data, total: data.length });
}
