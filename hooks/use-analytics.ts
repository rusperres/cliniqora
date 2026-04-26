"use client"

import { useEffect, useState } from "react"

type Stats = {
  users: number
  doctors: number
  services: number
  appointments: number
  completed: number
  pending: number
}

type ChartData = Record<string, number>

export function useAnalytics() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [chart, setChart] = useState<ChartData | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchAnalytics() {
    try {
      setLoading(true)

      const res = await fetch("/api/analytics")
      const data = await res.json()

      setStats(data.data?.stats)
      setChart(data.data?.chart)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  return {
    stats,
    chart,
    loading,
    refetch: fetchAnalytics
  }
}