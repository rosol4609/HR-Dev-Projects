"use client";

import FormLogin from "@/components/FormLogin";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background text-foreground px-4">
      <Card className="w-full max-w-md border border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">Zaloguj się</CardTitle>
        </CardHeader>

        <CardContent>
          <FormLogin />
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Nie masz konta?{" "}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Zarejestruj się
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
