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
import { useAuthForm } from "@/hooks/useAuthForm";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    authMode,
    formData,
    handleChange,
    handleSubmit,
    toggleAuthMode,
  } = useAuthForm();

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
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {authMode === "signup" && (
                <div className="grid gap-3">
                  <Label htmlFor="username">Nombre de Usuario</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Tu nombre de usuario"
                    required
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input
                  placeholder="********"
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {authMode === "signup" && (
                <div className="grid gap-3">
                  <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                  <Input
                    placeholder="********"
                    id="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  {authMode === "login" ? "Iniciar Sesión" : "Registrarse"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              {authMode === "login" && (
                <>
                  <span className="font-bold">¿No tienes una cuenta?</span>
                  <br /> Me vale verga, pero si quieres regístrate{" "}
                </>
              )}
              {authMode === "signup" && (
                <>
                  <span className="font-bold">¿Ya tienes una cuenta?</span>
                  <br /> Me vale verga, pero si quieres inicia sesión{" "}
                </>
              )}
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
