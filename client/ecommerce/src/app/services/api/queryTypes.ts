export interface qdata {
    title: string,
    categoryId: number
    imageUrl:string,
    talla:string
    precio:number
    userId: string | null
}
  
export interface AuthResponse {
  userId: string;
  username: string;
  user: string;
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

export interface CatData {
  id: number;
  name: string;
  
}