import { NextRequest, NextResponse } from "next/server";

import { filterWords } from "@/lib/word-service";
import { CategoryId, Level } from "@/lib/types";

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") ?? undefined;
  const level = (searchParams.get("level") as Level | "all" | null) ?? undefined;
  const category = (searchParams.get("category") as CategoryId | "all" | null) ?? undefined;
  const limit = searchParams.get("limit");

  const data = filterWords({
    search,
    level,
    category,
    limit: limit ? Number(limit) : undefined,
  });

  return NextResponse.json({ data, total: data.length });
}
