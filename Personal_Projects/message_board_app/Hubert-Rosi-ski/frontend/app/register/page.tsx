"use client";

import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background text-foreground px-4">
      <Card className="w-full max-w-md border border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Utwórz konto
          </CardTitle>
        </CardHeader>

        <CardContent>
          <RegisterForm />
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Masz już konto?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Zaloguj się
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
