import { useEffect, useState } from "react";
import axios from "axios";

type AuthMode = "login" | "signup";

export function useAuthForm() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const action =
    authMode === "signup" ? "/api/auth/register" : "/api/auth/login";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get("m");
    const mode: AuthMode = m === "signup" ? "signup" : "login";
    setAuthMode(mode);
    setFormData((prev) => ({
      ...prev,
      username: "",
      confirmPassword: "",
      password: "",
    }));
  }, []);

  const toggleAuthMode = () => {
    const newMode = authMode === "login" ? "signup" : "login";
    setAuthMode(newMode);
    setFormData((prev) => ({
      ...prev,
      username: "",
      confirmPassword: "",
      password: "",
    }));

    const url = new URL(window.location.href);
    url.searchParams.set("m", newMode);
    window.history.pushState({}, "", url.toString());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (): Promise<string | undefined> => {
    if (
      authMode === "signup" &&
      formData.password !== formData.confirmPassword
    ) {
    
        return "Las contraseñas no coinciden";
    }

    const data =
      authMode === "login"
        ? { email: formData.email, password: formData.password }
        : formData;

    try {
      const res = await axios.post(action, data, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 201) {
        
        return undefined; // Indica éxito
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const errorMessage = err.response.data.error || "Error al procesar la solicitud";
        return errorMessage;
      } else {
        return "Error de autenticación desconocido";
      }
    }
  };

  return {
    authMode,
    formData,
    error,
    handleChange,
    toggleAuthMode,
    handleSubmit,
  };
}
