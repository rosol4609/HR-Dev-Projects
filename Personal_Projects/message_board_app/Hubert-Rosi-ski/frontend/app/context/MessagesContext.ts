import { createContext, useContext } from "react";

// Context for managing messages-related functions
const MessagesContext = createContext<{
  refetchMessages: () => void;
  onMessageAdded: () => void;
}>({
  refetchMessages: () => {},
  onMessageAdded: () => {},
});

export const useMessagesContext = () => useContext(MessagesContext);
export default MessagesContext;