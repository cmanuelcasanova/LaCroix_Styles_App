export interface qdata {
    title: string,
    categoria: string
    imageUrl:string,
    talla:string
    precio:number
}
  
export interface AuthResponse {
  userId: string;
  username: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}