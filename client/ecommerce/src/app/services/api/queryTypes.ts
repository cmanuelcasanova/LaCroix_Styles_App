
export interface qdata {
    title: string,
    seccionId: number,
    imageUrl:string,
    talla:string[],
    color: string,
    category: string,
    precio:number,
    userId: string | null
}

export interface qdataUpdate {
    id: number | undefined,
    title: string,
    seccionId: number
    imageUrl:string,
    talla:string[]
    color: string
    category: string
    precio:number
    userId: string | null
}

export interface product {
    id:number,  
    title: string,
    seccionId: number
    imageUrl:string,
    Tallas:{name:string}[]
    precio:number
    category: string
    color: string
    Seccion: {id:number, name: string}

}


export interface AuthResponse {
  userId: string;
  username: string;
  user: string;
  role: string;
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

export interface SecData {
  id: number;
  name: string;
  
}

export interface ShoppingData {
  title: string;
  talla: string;
  cantidad: number;
  precio: number;
  productId: number;
  
}

export interface ShoppingDataQuery {
  id: number,
  title: string;
  talla: string;
  cantidad: number;
  precio: number;
  productId: number;
  userId: number;
  Product: {imageUrl: string}


  
}