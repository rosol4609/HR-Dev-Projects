"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMeQuery } from "@/lib/api/authApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MessageTable from "./messages/table/page";
import AddMessageForm from "./messages/form/page";
import MessagesContext from "./context/MessagesContext";

export default function Home() {
  const [activeTab, setActiveTab] = useState("add");
  const { data, isLoading, error, isError } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (isError || !data?.user)) {
      router.push("/login");
    }
  }, [isLoading, isError, data, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background text-foreground">
        <p className="text-lg font-medium">Ładowanie...</p>
      </div>
    );
  }

  if (isError || !data?.user) return null;

  const refetchMessages = () => setActiveTab("table");
  const onMessageAdded = () => setActiveTab("table");

  return (
    <MessagesContext.Provider value={{ refetchMessages, onMessageAdded }}>
      <div className="max-w-5xl mx-auto mt-10 px-4 text-foreground">
        {/* Górny pasek */}
        <header className="flex justify-between items-center mb-10 border-b border-border pb-4">
          <div>
            <h1 className="text-3xl font-semibold">Witaj, {data.user.email.split("@")[0]}</h1>
            <p className="text-muted-foreground text-sm">
              Zarządzaj swoimi wiadomościami w prywatnym panelu
            </p>
          </div>

          <Button
            variant="destructive"
            onClick={async () => {
              try {
                await fetch("http://localhost:8080/auth/logout", {
                  method: "POST",
                  credentials: "include",
                });
              } catch (err) {
                console.error("Błąd wylogowania:", err);
              }
              router.push("/login");
            }}
          >
            Wyloguj
          </Button>
        </header>

        {/* Zakładki */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="add" className="flex-1">
              Dodaj wiadomość
            </TabsTrigger>
            <TabsTrigger value="table" className="flex-1">
              Tablica wiadomości
            </TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="mt-4">
            <MessageTable />
          </TabsContent>

          <TabsContent value="add" className="mt-4">
            <AddMessageForm />
          </TabsContent>
        </Tabs>
      </div>
    </MessagesContext.Provider>
  );
}
