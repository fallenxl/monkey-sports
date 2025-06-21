"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const auth = params.get("m");
    setAuthMode(auth === "signup" ? "signup" : "login");
  }, []);

  const toggleAuthMode = () => {
    const newAuthMode = authMode === "login" ? "signup" : "login";
    setAuthMode(newAuthMode);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("m", newAuthMode);
      window.history.pushState({}, "", url.toString());
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{authMode === "login" ? "Iniciar Sesión" : "Registrarse"}</CardTitle>
          <CardDescription>
            {authMode === "login"
              ? "Ingresa tus credenciales para acceder a tu cuenta."
              : "Si eres termo o cagon no te registres."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              {
                authMode === "signup" && (
                  <div className="grid gap-3">
                    <Label htmlFor="username">Nombre de Usuario</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Tu nombre de usuario"
                      required
                    />
                  </div>
                )
              }
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input placeholder="********" id="password" type="password" required />
              </div>
              {authMode === "signup" && (
                <>
  
                  <div className="grid gap-3">
                    <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                    <Input 
                    placeholder="********"
                    id="confirm-password" type="password" required />
                  </div>
                </>
              )}
              
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {authMode === "login" ? "Iniciar Sesión" : "Registrarse"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
             {authMode === "login" && <><span className="font-bold">¿No tienes una cuenta?</span><br/> Me vale verga, pero si quieres regístrate {" "}</>}
             {authMode === "signup" && <><span className="font-bold">¿Ya tienes una cuenta?</span><br/> Me vale verga, pero si quieres inicia sesión {" "}</>}
              <button
                type="button"
                onClick={toggleAuthMode}
                className="text-neutral-700 font-bold underline hover:text-neutral-900 cursor-pointer"
              >
                {authMode === "login" ? "Registrarse" : "Iniciar Sesión"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
