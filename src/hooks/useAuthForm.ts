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

  const action = authMode === "signup" ? "/api/auth/register" : "/api/auth/login";

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

  const handleSubmit = async () => {
    if (authMode === "signup" && formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const data =
      authMode === "login"
        ? { email: formData.email, password: formData.password }
        : formData;

    try {
      const res = await axios.post(action, data, {
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 201) alert("Operación exitosa: " + res.data.message);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        alert("Error: " + err.response.data.error);
      } else {
        alert("Error inesperado");
      }
    }
  };

  return {
    authMode,
    formData,
    handleChange,
    toggleAuthMode,
    handleSubmit,
  };
}
