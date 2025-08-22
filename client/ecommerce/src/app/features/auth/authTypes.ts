
export interface user {
  
  username: string;
  email: string;
  role: 'admin' | 'user';
}


export interface AuthState {
  isAuthenticated: boolean | null;
  user: user | null; // puedes tiparlo mejor si tienes el modelo
}