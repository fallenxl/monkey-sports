"use client"
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (firebaseUser) => {
      console.log("useCurrentUser: firebaseUser", firebaseUser);
      setUser(firebaseUser);
      setLoading(false);
    });
  }, []);

  return { user, loading };
}
