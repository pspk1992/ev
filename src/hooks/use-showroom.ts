import { useContext } from "react";
import { ShowroomContext } from "@/contexts/ShowroomProvider";

export function useShowroom() {
  const context = useContext(ShowroomContext);

  if (!context) {
    throw new Error("useShowroom must be used within ShowroomProvider");
  }

  return context;
}
