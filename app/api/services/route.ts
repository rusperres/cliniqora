import { NextRequest } from "next/server"
import { getAllServices } from "@/services/service.service"
import { successResponse, errorResponse } from "@/lib/api-response"
import { parseQueryParams } from "@/lib/api-query"

export async function GET(req: NextRequest) {
  try {
    const query = parseQueryParams(req, "name")
    const services = await getAllServices({
      skip: query.skip,
      take: query.limit,
      search: query.search,
      sortBy: query.sortBy,
      order: query.order
    })
    return successResponse(services)
  } catch (err: any) {
    return errorResponse(err.message || "Failed to fetch services")
  }
}