
import { TodosContext } from "@/contexts/TodosContext";
import { useContext } from "react";

export function useTodos() {
  const context = useContext(TodosContext);

  if (!context) 
    throw new Error("useTodos doit être utilisé dans TodosProvider");

  return context;
}