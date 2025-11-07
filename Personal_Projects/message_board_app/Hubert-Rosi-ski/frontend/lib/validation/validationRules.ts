export const validateMessage = (message: string): string | null => {
    if (!message.trim()) return "Wiadomość nie może być pusta.";
    if (message.trim().length < 5) return "Wiadomość musi mieć co najmniej 5 znaków.";
    if (message.trim().length > 500) return "Wiadomość nie może przekraczać 500 znaków.";
    return null;
  };