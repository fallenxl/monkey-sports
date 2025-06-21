import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { checkUsernameExists } from "./user.services";
export async function registerUser({
  email,
  password,
  confirmPassword,
  username,
}: {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}) {

  if(password !== confirmPassword) {
    throw new Error("Las contraseñas no coinciden.");
  }

  const usernameExists = await checkUsernameExists(username);
  if (usernameExists) {
    throw new Error("El nombre de usuario ya está en uso. Por favor, elige otro.");
  }

  
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await updateProfile(user, { displayName: username });

  await setDoc(doc(db, "users", user.uid), {
    id: user.uid,
    email,
    username,
    totalPoints: 0,
    role: "USER", // USER || ADMIN
    name: "", // Puedes agregar un campo de nombre si lo deseas
    avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${username}`,
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
    let message = "Usuario o contraseña incorrectos.";
    if (error.code === "auth/user-not-found") message = "Usuario no encontrado.";
    if (error.code === "auth/wrong-password") message = "Contraseña incorrecta.";
    if (error.code === "auth/invalid-email") message = "Email inválido.";
    throw new Error(message);
  }
}
