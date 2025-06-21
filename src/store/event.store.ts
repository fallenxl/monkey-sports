import { Event } from '@/interfaces/event.interface';
import { deleteEvent, getAllEvents } from '@/services/event.services';
import {create} from 'zustand';

interface EventStore {
    events: Event[];
    addEvent: (event: Event) => void;
    removeEvent: (id: string) => void;
    updateEvent: (id: string, updated: Partial<Event>) => void;
    setEvents: (events: Event[]) => void;
    fetchEvents: () => Promise<void>;
}

export const useEventStore = create<EventStore>((set) => ({
    events: [],
    addEvent: (event) =>
        set((state) => ({
            events: [...state.events, event],
        })),
    removeEvent: async (id) =>
        await deleteEvent(id).then(() =>
            // Eliminar el evento del estado global después de eliminarlo en la base de datos
            set((state) => ({
                events: state.events.filter((event) => event.id !== id),
            }))
        ),
    updateEvent: (id, updated) =>
        set((state) => ({
            events: state.events.map((event) =>
                event.id === id ? { ...event, ...updated } : event
            ),
        })),
    setEvents: (events) => set({ events }),
    fetchEvents: async () => {
        const events = await getAllEvents();
        set({ events: events
            .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()) // Ordenar por fecha de inicio descendente
            .map(event => ({
                ...event,
                startDate: new Date(event.startDate),
                endDate: new Date(event.endDate),
            }))
        })
    },
}));