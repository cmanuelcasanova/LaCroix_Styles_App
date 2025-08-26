
export interface user {
  
  username: string;
  email: string;
  role: 'admin' | 'user';
}


export interface AuthState {
  isAuthenticated: boolean ;
  user: string | null ; 
  username: string | null;
}