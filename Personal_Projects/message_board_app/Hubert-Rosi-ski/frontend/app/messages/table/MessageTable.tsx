"use client";

import { useState, useEffect, useMemo } from "react";
import { useGetMessagesQuery, useDeleteMessageMutation, useEditMessageMutation } from "@/lib/api/messageApi";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Alert } from "@/components/ui/alert";
import { Message } from "@/lib/api/messageApi";
import { validateMessage } from "@/lib/validation/validationRules";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// Przykład w AddMessageForm.tsx
import { useMessagesContext } from "@/app/context/MessagesContext";

// Component for displaying and managing messages in a table
export default function MessageTable() {
  const { refetchMessages } = useMessagesContext();
  const { data: messages, isLoading, refetch } = useGetMessagesQuery();
  const [deleteMessage] = useDeleteMessageMutation();
  const [editMessage] = useEditMessageMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<Message | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterLength, setFilterLength] = useState<string>("all");
  // Refetch messages when refetchMessages is triggered
  useEffect(() => {
    refetch();
  }, [refetchMessages]);

  const filteredMessages = useMemo(() => {
    if (!messages) return [];
    return messages
      .filter((msg) => msg.content.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((msg) => {
        if (filterLength === "short") return msg.content.length < 10;
        if (filterLength === "long") return msg.content.length >= 10;
        return true;
      });
  }, [messages, searchTerm, filterLength]);

  // Open the edit dialog for a specific message
  const handleEdit = (message: Message) => {
    setCurrentMessage(message);
    setIsEditing(true);
  };

  // Close the edit dialog
  const closeEditDialog = () => {
    setCurrentMessage(null);
    setError(null);
    setIsEditing(false);
  };

  // Save the edited message
  const handleSave = async () => {
    if (currentMessage) {
      const validationError = validateMessage(currentMessage.content);
      if (validationError) {
        setError(validationError);
        setIsAlertVisible(true);
        return;
      }

      try {
        await editMessage({ id: currentMessage.id, content: currentMessage.content }).unwrap();
        refetch();
        closeEditDialog();
      } catch (err) {
        setError("Nie udało się zaktualizować wiadomości. Spróbuj ponownie.");
        setIsAlertVisible(true);
      }
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

  // Show loading spinner while fetching messages
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 max-w-sm">
        <Search className="w-4 h-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Szukaj wiadomości..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-md py-1 px-2"
        />
        <Select onValueChange={setFilterLength} defaultValue="all">
          <SelectTrigger className="border border-gray-300 rounded-md py-1 px-2">
            <SelectValue placeholder="Filtruj długość" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie</SelectItem>
            <SelectItem value="short">Krótkie</SelectItem>
            <SelectItem value="long">Długie</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableCaption>{!filteredMessages || filteredMessages.length === 0 ? "Brak wiadomości" : "Lista wiadomości"}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Wiadomość</TableHead>
            <TableHead className="text-right">Akcje</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMessages?.map((message: Message) => (
            <TableRow key={message.id}>
              <TableCell className="font-medium">{message.id}</TableCell>
              <TableCell>{message.content}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="default" size="sm" onClick={() => handleEdit(message)}>
                  Edytuj
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={async () => {
                    await deleteMessage(message.id).unwrap();
                    refetch();
                  }}
                >
                  Usuń
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {isEditing && currentMessage && (
        <Dialog open={isEditing} onOpenChange={closeEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edytuj wiadomość</DialogTitle>
            </DialogHeader>
            <Textarea
              value={currentMessage.content}
              onChange={(e) => setCurrentMessage({ ...currentMessage, content: e.target.value })}
              placeholder="Wpisz treść wiadomości..."
              className="mb-4"
            />
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isAlertVisible ? "max-h-20" : "max-h-0"
              }`}
            >
              <Alert variant="destructive">{error}</Alert>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={closeEditDialog}>
                Anuluj
              </Button>
              <Button variant="default" onClick={handleSave}>
                Zapisz
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}