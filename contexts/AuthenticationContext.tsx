import { auth, db } from '@/firebaseConfig';
import { AuthenticationContextType } from '@/types/AuthenticationContextType';
import { User } from '@/types/User';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";


export const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

export function AuthenticationContextProvider({ children }: { children: React.ReactNode }) {  

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
    const [user, setUser] = useState<User | undefined>(undefined);

    const signup = async (user: User, username: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, username, password);
            const uid = userCredential.user.uid;

            await setDoc(doc(db, "users", uid), {
              id: uid,
              firstName: user.firstName,
              lastName: user.lastName
            });

            return { success: true };
          } catch (error: any) {
            let message = "Erreur inconnue";
            if (error.code === "auth/invalid-email") {
              message = "Adresse courriel invalide.";
            } else if (error.code === "auth/email-already-in-use") {
              message = "Ce courriel est déjà utilisé.";
            } else if (error.code === "auth/weak-password"){
              message = "Le mot de passe est trop court."
            } else if ( error.code == "permission-denied"){
              message = "Vous n'avez pas les droits."
            } else if ( error.code == "invalid-argument"){
              message = "Requête invalide."
            }
            return { success: false, message };
          }
      };
    
      const signout = async () => {
        try {
            await signOut(auth);
            setUser(undefined);
            return { success: true };
          } catch (error: any) {
            return { success: false, message: "Erreur lors de la déconnexion." };
          }
      };

      const login = async (username: string, password: string) => {
        try{
          await signInWithEmailAndPassword(auth, username, password);
          return {success: true}
        } catch (error: any) {
          return{success: false, message: "Erreur lors du login."}
        }
      }

      useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
          if (user) {
            setIsAuthenticated(true);
            const uid = user.uid;
            const userDocSnap = await getDoc(doc(db, "users", uid));
            if (userDocSnap.exists()) {
               const userData = userDocSnap.data() as User;
               setUser(userData);
            } else {
               setUser(undefined); 
            }
          } else {
            setIsAuthenticated(false);
          }
        });
        return unsub;
      }, []);
    
      return (
        <AuthenticationContext.Provider value={{ isAuthenticated, signup, signout, login, user }}>
          {children}
        </AuthenticationContext.Provider>
      );
    }