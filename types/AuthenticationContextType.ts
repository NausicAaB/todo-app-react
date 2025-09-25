import { User } from "./User";

export interface AuthResult {
    success: boolean;
    message?: string;
  }

export interface AuthenticationContextType {
    isAuthenticated: boolean | undefined; 
    signup: (user: User, username: string, password: string) => Promise<AuthResult>;
    signout: () => Promise<AuthResult>;
    login: (username: string, password:string) => Promise<AuthResult>;
    user: User | undefined; 
}