"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Event } from "@/interfaces/event.interface"
import { createEvent } from "@/services/event.services"
import { useEventStore } from "@/store/event.store"
import { IconCirclePlusFilled } from "@tabler/icons-react"
import { useRef, useState } from "react"

export function CreateEventSheet() {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const {addEvent} = useEventStore()
    const [eventForm, setEventForm] = useState<Omit<Event, "id" | "createdAt" | "createdBy">>({
        title: "",
        description: "",
        status: "PENDING",
        startDate: new Date(),
        endDate: new Date(),
        prize: "",
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const event = await createEvent(eventForm);
            if (event) {
                addEvent(event); // Agrega el evento al estado global
                if (buttonRef.current) {
                    buttonRef.current.click(); // Cierra el modal
                }

            }

        } catch (error) {
            console.error("Error al crear el evento:", error);
        }
    }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full bg-black text-white flex justify-between hover:bg-gray-800 cursor-pointer hover:text-white">
            <span className="flex items-center gap-2">
                <IconCirclePlusFilled size={16} />
                Crear evento
            </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Crear evento</SheetTitle>
          <SheetDescription>
            Aquí puedes crear un nuevo evento. Completa los campos necesarios y guarda los cambios.
          </SheetDescription>
        </SheetHeader>
        <form id="create-event-form" onSubmit={handleSubmit} className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="title">Título del evento</Label>
            <Input
              id="title"
              value={eventForm.title}
              onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
              placeholder="Ingrese el título del evento"
                className="w-full"
            />
          </div>
            <div className="grid gap-3">
                <Label htmlFor="description">Descripción</Label>
                <Input
                id="description"
                value={eventForm.description}
                onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                placeholder="Ingrese una breve descripción del evento"
                    className="w-full"
                />
            </div>
          <div className="grid gap-3">
            <Label htmlFor="startDate">Fecha de inicio</Label>
            <Input
              id="startDate"
              type="datetime-local"
              value={eventForm.startDate.toISOString().slice(0, 16)}
              onChange={(e) => setEventForm({ ...eventForm, startDate: new Date(e.target.value) })}
              className="w-full"
            />
            </div>
          <div className="grid gap-3">
            <Label htmlFor="endDate">Fecha de finalización</Label>
            <Input
              id="endDate"
              type="datetime-local"
              value={eventForm.endDate.toISOString().slice(0, 16)}
              onChange={(e) => setEventForm({ ...eventForm, endDate: new Date(e.target.value) })}
              className="w-full"
            />
            </div>
          <div className="grid gap-3">
            <Label htmlFor="prize">Premio</Label>
            <Input
              id="prize"
              value={eventForm.prize}
              onChange={(e) => setEventForm({ ...eventForm, prize: e.target.value })}
              placeholder="Ingrese el premio del evento"
                className="w-full"
            />
            </div>
        </form>
        <SheetFooter>
          <Button 
          form="create-event-form"
          type="submit"> Crear evento </Button>
          <SheetClose asChild>
            <Button ref={buttonRef} variant="outline">Cancelar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
