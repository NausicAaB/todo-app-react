import { auth } from '@/firebaseConfig';
import { AuthenticationContextType } from '@/types/AuthenticationContextType';
import { createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import React, { createContext, useEffect, useState } from "react";


export const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

export function AuthenticationContextProvider({ children }: { children: React.ReactNode }) {  

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);

    const signup = async (username: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, username, password);
            return { success: true };
          } catch (error: any) {
            let message = "Erreur inconnue";
            if (error.code === "auth/invalid-email") {
              message = "Adresse courriel invalide.";
            } else if (error.code === "auth/email-already-in-use") {
              message = "Ce courriel est déjà utilisé.";
            }
            return { success: false, message };
          }
      };
    
      const signout = async () => {
        try {
            await signOut(auth);
            return { success: true };
          } catch (error: any) {
            return { success: false, message: "Erreur lors de la déconnexion." };
          }
      };

      useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        });
        return unsub;
      }, []);
    
      return (
        <AuthenticationContext.Provider value={{ isAuthenticated, signup, signout }}>
          {children}
        </AuthenticationContext.Provider>
      );
    }