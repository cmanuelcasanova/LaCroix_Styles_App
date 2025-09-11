
export interface user {
  
  username: string;
  email: string;
  role: string;
}


export interface AuthState {
  isAuthenticated: boolean ;
  user: string | null ; 
  username: string | null;
  role: string | null
}