// lib/checkUsernameExists.ts
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function checkUsernameExists(username: string): Promise<boolean> {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}
