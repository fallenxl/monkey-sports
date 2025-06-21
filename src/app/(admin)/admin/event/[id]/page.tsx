"use client";

import { Event } from "@/interfaces/event.interface";
import { getEventById } from "@/services/event.services";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Page() {
    const { id } = useParams();
    const [events, setEvents] = useState<{
        original: Event | null;
        updated: Event | null;
    }>({
        original: null,
        updated: null,
    });

    useEffect(() => {
        if(id && typeof id === 'string') {
            (async () => {
                const event = await getEventById(id);
                if (event) {
                    setEvents({
                        original: event,
                        updated: event,
                    });
                } else {
                    console.error("Event not found");
                }
            })()
        }
    }, [id]);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Event Details Page</h1>
        <p className="mt-4">This page will display the details of a specific event.</p>
        </div>
    );
}