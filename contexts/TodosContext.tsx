import { db } from '@/firebaseConfig';
import { useAuth } from '@/hook/useAuth';
import { Todo } from '@/types/todo';
import { TodosContextType } from '@/types/TodosContextType';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import React, { createContext } from "react";


export const TodosContext = createContext<TodosContextType | undefined>(undefined);

export function TodosContextProvider({ children }: { children: React.ReactNode }) {  

    const {user} = useAuth();

    const add = async (newTodo: Todo) => {
        console.log("aaaaadd")
        if (!user?.id) return { success: false, message: "Utilisateur non authentifié" };
        console.log("add");

        try {
          await setDoc(doc(db, "todos", newTodo.id), {
            ...newTodo,
            userId: user.id, 
          });
          return { success: true };
        } catch (error: any) {
          return { success: false, message: error.message || "Erreur inconnue" };
        }
      };
    
      const remove = async (id: string) => {
        try {
            await deleteDoc(doc(db, "todos", id));
            return { success: true };
          } catch (error: any) {
            return { success: false, message: error.message || "Erreur lors de la suppression" };
          }
      };
    
      return (
        <TodosContext.Provider value={{ add, remove, user?.id }}>
          {children}
        </TodosContext.Provider>
      );
    }