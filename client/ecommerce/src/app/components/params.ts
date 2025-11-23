type OptionType = {
  value: string;
  label: string;
};

type OptionTypeT = {
  value: number;
  label: string;
};

export const COLOR_PALETTE: OptionType[] = [
  { label: "blanco", value: "#FFFFFF" },
  { label: "negro", value: "#212121" },
  { label: "gris", value: "#BDBDBD" },
  { label: 'dorado', value: '#FFD700' },
  { label: 'plateado', value: '#C0C0C0' },
  { label: "rojo", value: "#E53935" },
  { label: "naranja", value: "#FB8C00" },
  { label: "mandarina", value: "#FF7043" },
  { label: "amarillo", value: "#FDD835" },
  { label: "lima", value: "#C0CA33" },
  { label: "verde", value: "#43A047" },
  { label: "verde oscuro", value: "#2E7D32" },
  { label: "turquesa", value: "#26C6DA" },
  { label: "cian", value: "#00ACC1" },
  { label: "azul", value: "#1E88E5" },
  { label: "azul oscuro", value: "#1565C0" },
  { label: "BlueJean", value: "#4e658f" },
  { label: "indigo", value: "#3F51B5" },
  { label: "morado", value: "#8E24AA" },
  { label: "violeta", value: "#BA68C8" },
  { label: "rosa", value: "#F06292" },
  { label: "fucsia", value: "#EC407A" },
  { label: "marron", value: "#8D6E63" },
  { label: "Vinotinto", value: "#680809" },
  { label: "Magenta", value:  "#c92093" },
  { label: "Animal Print", value: "linear-gradient(45deg, #ad804d 50%, #000 50%)"},
  { label: "rayas", value: "repeating-linear-gradient(90deg, #000 0px, #000 4px, #fff 4px, #fff 8px)"},
  { label: "cuadros", value: "repeating-conic-gradient(#000 0% 25%, #fff 0% 50%) 0 0 / 8px 8px"},
  { label: "mixto", value: "linear-gradient(45deg, #000 50%, #fff 50%)"}

];


export const TALLAS: OptionTypeT[] = [
  { value: 1, label: "U" },
  { value: 2, label: "XXS" },
  { value: 3, label: "XS" },
  { value: 4, label: "S" },
  { value: 5, label: "M" },
  { value: 6, label: "ML" },
  { value: 7, label: "L" },
  { value: 8, label: "XL" },
  { value: 9, label: "XXL" },
  { value: 10, label: "XXXL" },
];

export const categoriesWomen: OptionType[] = [
  { label: 'Vestidos', value: 'Vestidos' },
  { label: 'Bragas', value: 'Bragas' },
  { label: 'Franelas', value: 'Franela' },
  { label: 'Camisas', value: 'Camisas_dama' },
  { label: 'Blusas', value: 'Blusas' },
  { label: 'Chemise', value: 'Chemise_Dama' },
  { label: 'Camisetas', value: 'Camisetas_dama' },
  { label: 'Faldas', value: 'Faldas' },
  { label: 'Pantalones', value: 'Pantalones_dama' },
  { label: 'Jeans', value: 'Jeans_dama' },
  { label: 'Shorts', value: 'Shorts_dama' },
  { label: 'Tops', value: 'Tops_dama' },
  { label: 'Chaquetas', value: 'Chaquetas_dama' },
  { label: 'Pijamas', value: 'Pijamas_dama' },
  { label: 'Sueter', value: 'Sueter_dama' },
  { label: 'Leggins', value: 'Leggins' },
  { label: 'Body', value: 'Body_dama' },
  { label: 'Ropa interior', value: 'Ropa_interior_dama' },
  { label: 'Lencería', value: 'Lenceria' },
  { label: 'Deportiva', value: 'Deportiva_dama' },
  { label: 'Conjuntos', value: 'Conjuntos_dama' },
  { label: 'Zapatos', value: 'Zapatos_dama' },
  { label: 'Sandalias', value: 'Sandalias_dama' },
  { label: 'Botas', value: 'Botas_dama' },
  { label: 'Splash', value: 'Splash_dama' },
  { label: 'Cremas', value: 'Cremas_dama' },
  { label: 'Perfume', value: 'Perfume_dama' },
  { label: 'Relojes', value: 'Relojes' },
  { label: 'Carteras', value: 'Carteras' },
  { label: 'Monos', value: 'Monos' },
  { label: 'Gorras', value: 'Gorras_Dama' },
  { label: 'Accesorios', value: 'Accesorios_dama' },
  { label: 'Bolsos', value: 'Bolsos_dama' },

];

export const categoriesMen: OptionType[] = [
  { label: 'Camisas', value: 'Camisas' },
  { label: 'Franelas', value: 'Franelas' },
  { label: 'Camisetas', value: 'Camisetas_Caballero' },
  { label: 'Pantalones', value: 'Pantalones_caballero' },
  { label: 'Jeans', value: 'Jeans_caballero' },
  { label: 'Shorts', value: 'Shorts_caballero' },
  { label: 'Chemise', value: 'Chemise_caballero' },
  { label: 'Chaquetas', value: 'Chaquetas_caballero' },
  { label: 'Conjuntos', value: 'Conjuntos_caballero' },
  { label: 'Sueter', value: 'Sueter_caballero' },
  { label: 'Monos', value: 'Monos_caballero' },
  { label: 'Boxers', value: 'Boxers' },
  { label: 'Deportiva', value: 'Deportiva_caballero' },
  { label: 'sueters', value: 'Sueters_caballero' },
  { label: 'Zapatos', value: 'Zapatos_caballero' },
  { label: 'Zapatillas', value: 'Zapatillas_caballero' },
  { label: 'Botas', value: 'Botas_caballero' },
  { label: 'Accesorios', value: 'Accesorios_caballero' },
  { label: 'Splash', value: 'Splash_caballero' },
  { label: 'Perfume', value: 'Perfume_caballero' },
  { label: 'Gorras', value: 'Gorras_Caballero' },
  { label: 'Gorras', value: 'Gorras_caballero' },
  { label: 'Bufandas', value: 'Bufandas_caballero' },
  { label: 'Cinturones', value: 'Cinturones' },
  { label: 'Relojes', value: 'Relojes' },
  { label: 'Camperas', value: 'Camperas' },
];

export const categoriesKids: OptionType[] = [
  { label: 'Conjuntos', value: 'Conjuntos_ninos' },
  { label: 'Franelas', value: 'Franelas_ninos' },
  { label: 'Camisas', value: 'Camisas_ninos' },
  { label: 'Vestidos (niña)', value: 'Vestidos_nina' },
  { label: 'Faldas (niña)', value: 'Faldas_nina' },
  { label: 'Pantalones', value: 'Pantalones_ninos' },
  { label: 'Jeans', value: 'Jeans_ninos' },
  { label: 'Shorts', value: 'Shorts_ninos' },
  { label: 'Chaquetas', value: 'Chaquetas_ninos' },
  { label: 'Sueter', value: 'Sueter_ninos' },
  { label: 'Abrigos', value: 'Abrigos_ninos' },
  { label: 'Ropa interior', value: 'Ropa_interior_ninos' },
  { label: 'Deportiva', value: 'Deportiva_ninos' },
  { label: 'Trajes de baño', value: 'Trajes_bano_ninos' },
  { label: 'Zapatos', value: 'Zapatos_ninos' },
  { label: 'Zapatillas', value: 'Zapatillas_ninos' },
  { label: 'Botas', value: 'Botas_ninos' },
  { label: 'Accesorios', value: 'Accesorios_ninos' },
  { label: 'Gorras', value: 'Gorras_ninos' },
  { label: 'Mochilas', value: 'Mochilas_ninos' },
  { label: 'Pijamas', value: 'Pijamas_ninos' },
];

