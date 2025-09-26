
export type filteritem = {
  name: string
  cant: number
}

export interface FilterState {
  category: filteritem[],

  color: filteritem[],
 
  talla: filteritem[],

  price_min: number,

  price_max: number
}