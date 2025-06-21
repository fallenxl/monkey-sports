import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
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

export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Puedes retornar el user o su token, etc.
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
  } catch (error: any) {
    // Captura errores comunes
    let message = "Error al iniciar sesión.";
    if (error.code === "auth/user-not-found") message = "Usuario no encontrado.";
    if (error.code === "auth/wrong-password") message = "Contraseña incorrecta.";
    if (error.code === "auth/invalid-email") message = "Email inválido.";
    throw new Error(message);
  }
}
