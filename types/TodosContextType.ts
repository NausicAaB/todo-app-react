import { Todo } from "./todo";

export interface TodoResult {
    success: boolean;
    message?: string;
  }

export interface TodosContextType {
    add: (todo: Todo) => Promise<TodoResult>;
    remove: (id: string) => Promise<TodoResult>;
    userId: string | undefined; 
}