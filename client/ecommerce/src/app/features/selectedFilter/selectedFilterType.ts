enum Direction {
  null,
  menor,
  mayor,
}


export interface FilterState {
  category: string[],
  color: string[],
  talla: string[],
  preciomin: number,
  preciomax: number,
  orderPrice: Direction,
  search: string,
}