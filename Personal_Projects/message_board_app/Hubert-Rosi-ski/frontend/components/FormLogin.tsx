"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Nieprawidłowe dane logowania");
      }

      toast({
        title: "Zalogowano pomyślnie",
        description: "Witaj ponownie!",
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Błąd logowania",
        description: error.message || "Spróbuj ponownie",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="email">Adres e-mail</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="np. jan@domena.pl"
          required
        />
      </div>

      <div>
        <Label htmlFor="password">Hasło</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Wpisz hasło"
          required
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Logowanie..." : "Zaloguj się"}
      </Button>
    </form>
  );
}
