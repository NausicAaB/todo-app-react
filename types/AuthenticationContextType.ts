export interface AuthResult {
    success: boolean;
    message?: string;
  }

export interface AuthenticationContextType {
    isAuthenticated: boolean | undefined; 
    signup: (username: string, password: string) => Promise<AuthResult>;
    signout: () => Promise<AuthResult>;
}