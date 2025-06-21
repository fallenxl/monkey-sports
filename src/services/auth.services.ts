// lib/firebaseActions.ts
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/firebase";
export async function registerUser({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) {
  // 1. Crear cuenta
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  // 2. Guardar nombre en perfil de usuario
  await updateProfile(user, { displayName: username });

  // 3. Guardar en Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    email,
    username,
    createdAt: serverTimestamp(),
  });

  return user;
}
