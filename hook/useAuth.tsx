
import { AuthenticationContext } from "@/contexts/AuthenticationContext";
import { useContext } from "react";

export function useAuth() {
  const context = useContext(AuthenticationContext);

  if (!context) 
    throw new Error("useAuth doit être utilisé dans AuthenticationProvider");

  return context;
}