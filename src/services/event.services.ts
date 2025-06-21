// lib/createEvent.ts
import { db } from "@/firebase"; 
import { Event } from "@/interfaces/event.interface";
import { collection, addDoc, serverTimestamp, doc, getDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";

type CreateEventInput = Omit<Event, "id" | "createdAt" | "createdBy">;

export async function createEvent(data: CreateEventInput): Promise<Event> {
  const eventToSave = {
    ...data,
    startDate: data.startDate,
    endDate: data.endDate,
    status: data.status,
    createdAt: serverTimestamp(), // Firestore lo maneja automáticamente
  };

  const docRef = await addDoc(collection(db, "events"), eventToSave);
  return {
    ...eventToSave,
    id: docRef.id, // Asignar el ID del documento creado
    createdBy: "currentUserId", // Aquí deberías obtener el ID del usuario actual
    createdAt: new Date(), // Convertir el timestamp a Date
  }
}

export async function getAllEvents(): Promise<Event[]> {
  const snapshot = await getDocs(collection(db, "events"));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      description: data.description,
      startDate: data.startDate.toDate(),
      endDate: data.endDate.toDate(),
      status: data.status,
      createdAt: data.createdAt?.toDate?.() || new Date(),
      prize: data.prize,
      createdBy: data.createdBy,
    } as Event;
  });
}

export async function getEventById(id: string): Promise<Event | null> {
  const ref = doc(db, "events", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const data = snap.data();
  return {
    id: snap.id,
    title: data.title,
    description: data.description,
    startDate: data.startDate.toDate(),
    endDate: data.endDate.toDate(),
    status: data.status,
    createdAt: data.createdAt?.toDate?.() || new Date(),
    prize: data.prize,
    createdBy: data.createdBy,
  } as Event;
}

type UpdateEventInput = Partial<Omit<Event, "id" | "createdAt">>;

export async function updateEvent(id: string, data: UpdateEventInput): Promise<void> {
  const ref = doc(db, "events", id);
  await updateDoc(ref, data);
}

export async function deleteEvent(id: string): Promise<void> {
  const ref = doc(db, "events", id);
  await deleteDoc(ref);
}