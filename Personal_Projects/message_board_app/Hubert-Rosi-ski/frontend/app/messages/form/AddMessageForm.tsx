"use client";

import { Loader2 } from "lucide-react";
import { useAddMessageMutation } from "@/lib/api/messageApi";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { validateMessage } from "@/lib/validation/validationRules";
import { useMessagesContext } from "@/app/context/MessagesContext";

// Component for adding a new message
export default function AddMessageForm() {
  const { onMessageAdded } = useMessagesContext();
  const [message, setMessage] = useState("");
  const [addMessage] = useAddMessageMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateMessage(message);
    if (validationError) {
      setError(validationError);
      setIsAlertVisible(true);
      return;
    }

    setIsLoading(true);
    try {
      await addMessage({ content: message }).unwrap();
      setMessage("");
      onMessageAdded();
    } catch (err) {
      setError("Wystąpił błąd podczas dodawania wiadomości.");
      setIsAlertVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically hide the alert after 3 seconds
  useEffect(() => {
    if (error) {
      setIsAlertVisible(true);
      const timer = setTimeout(() => {
        setIsAlertVisible(false);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Dodaj nową wiadomość</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <Textarea
            placeholder="Wpisz swoją wiadomość tutaj..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isAlertVisible ? "max-h-20" : "max-h-0"
            }`}
          >
            <Alert variant="destructive">{error}</Alert>
          </div>
          <Button type="submit" disabled={!message.trim() || isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Wyślij wiadomość"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}