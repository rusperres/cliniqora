import { NextRequest } from "next/server"
import { getAllDoctors } from "@/services/doctor.service"
import { successResponse, errorResponse } from "@/lib/api-response"
import { parseQueryParams } from "@/lib/api-query"

export async function GET(req: NextRequest) {
  try {
    const query = parseQueryParams(req, "name")
    const doctors = await getAllDoctors({
      skip: query.skip,
      take: query.limit,
      search: query.search,
      sortBy: query.sortBy,
      order: query.order
    })
    return successResponse(doctors)
  } catch (err: any) {
    return errorResponse(err.message || "Failed to fetch doctors")
  }
}