import { NextRequest } from "next/server"

export function parseQueryParams(req: NextRequest, defaultSortBy = "createdAt") {
  const url = new URL(req.url)
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10))
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "50", 10)))
  const search = url.searchParams.get("search") || ""
  const sortBy = url.searchParams.get("sortBy") || defaultSortBy
  const order: "asc" | "desc" = url.searchParams.get("order") === "desc" ? "desc" : "asc"

  const skip = (page - 1) * limit

  return { page, limit, search, sortBy, order, skip }
}
