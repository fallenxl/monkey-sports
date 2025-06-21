"use client"
import { DataTable } from "@/components/data-table"
import { getColumns } from "./columns"
import { useEventStore } from "@/store/event.store"
import { useEffect } from "react"



export default function Page() {
  const {events, fetchEvents} = useEventStore()
  useEffect(() => {
    (async () => {
      await fetchEvents()
    })()
  }, [])
  return (
      <DataTable columns={getColumns()} data={events}/>
  )
}
