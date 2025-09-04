type OptionType = {
  value: string;
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
  { label: "indigo", value: "#3F51B5" },
  { label: "morado", value: "#8E24AA" },
  { label: "violeta", value: "#BA68C8" },
  { label: "rosa", value: "#F06292" },
  { label: "fucsia", value: "#EC407A" },
  { label: "marron", value: "#8D6E63" },
  { label: "rayas", value: "repeating-linear-gradient(90deg, #000 0px, #000 4px, #fff 4px, #fff 8px)"},
  { label: "cuadros", value: "repeating-conic-gradient(#000 0% 25%, #fff 0% 50%) 0 0 / 8px 8px"},
  { label: "mixto", value: "linear-gradient(45deg, #000 50%, #fff 50%)"}

];

export const TALLAS: OptionType[] = [
  { value: "XS", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
];

export const CATEGORY: OptionType[] = [
  { value: "", label: "XS" },
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
];

export const categoriesWomen: OptionType[] = [
  { label: 'Vestidos', value: 'vestidos' },
  { label: 'Blusas', value: 'blusas' },
  { label: 'Faldas', value: 'faldas' },
  { label: 'Pantalones', value: 'pantalones_dama' },
  { label: 'Jeans', value: 'jeans_dama' },
  { label: 'Shorts', value: 'shorts_dama' },
  { label: 'Tops', value: 'tops_dama' },
  { label: 'Chaquetas', value: 'chaquetas_dama' },
  { label: 'Pijamas', value: 'pijamas_dama' },
  { label: 'Abrigos', value: 'abrigos_dama' },
  { label: 'Ropa interior', value: 'ropa_interior_dama' },
  { label: 'Lencería', value: 'lenceria' },
  { label: 'Deportiva', value: 'deportiva_dama' },
  { label: 'Conjuntos', value: 'conjuntos_dama' },
  { label: 'Zapatos', value: 'zapatos_dama' },
  { label: 'Sandalias', value: 'sandalias_dama' },
  { label: 'Botas', value: 'botas_dama' },
  { label: 'Accesorios', value: 'accesorios_dama' },
  { label: 'Bolsos', value: 'bolsos_dama' },
  { label: 'Bufandas', value: 'bufandas_dama' },
  { label: 'Sombreros', value: 'sombreros_dama' },
];

export const categoriesMen: OptionType[] = [
  { label: 'Camisas', value: 'camisas' },
  { label: 'Franelas', value: 'franelas' },
  { label: 'Pantalones', value: 'pantalones_caballero' },
  { label: 'Jeans', value: 'jeans_caballero' },
  { label: 'Shorts', value: 'shorts_caballero' },
  { label: 'Chaquetas', value: 'chaquetas_caballero' },
  { label: 'Conjuntos', value: 'conjuntos_caballero' },
  { label: 'Monos', value: 'monos_caballero' },
  { label: 'Boxers', value: 'boxers' },
  { label: 'Deportiva', value: 'deportiva_caballero' },
  { label: 'sueters', value: 'sueters_caballero' },
  { label: 'Zapatos', value: 'zapatos_caballero' },
  { label: 'Zapatillas', value: 'zapatillas_caballero' },
  { label: 'Botas', value: 'botas_caballero' },
  { label: 'Accesorios', value: 'accesorios_caballero' },
  { label: 'Gorras', value: 'gorras_caballero' },
  { label: 'Bufandas', value: 'bufandas_caballero' },
  { label: 'Cinturones', value: 'cinturones' },
  { label: 'Relojes', value: 'relojes' },
  { label: 'Camperas', value: 'camperas' },
];

export const categoriesKids: OptionType[] = [
  { label: 'Conjuntos', value: 'conjuntos_ninos' },
  { label: 'Franelas', value: 'franelas_ninos' },
  { label: 'Camisas', value: 'camisas_ninos' },
  { label: 'Vestidos (niña)', value: 'vestidos_nina' },
  { label: 'Faldas (niña)', value: 'faldas_nina' },
  { label: 'Pantalones', value: 'pantalones_ninos' },
  { label: 'Jeans', value: 'jeans_ninos' },
  { label: 'Shorts', value: 'shorts_ninos' },
  { label: 'Chaquetas', value: 'chaquetas_ninos' },
  { label: 'Abrigos', value: 'abrigos_ninos' },
  { label: 'Ropa interior', value: 'ropa_interior_ninos' },
  { label: 'Deportiva', value: 'deportiva_ninos' },
  { label: 'Trajes de baño', value: 'trajes_bano_ninos' },
  { label: 'Zapatos', value: 'zapatos_ninos' },
  { label: 'Zapatillas', value: 'zapatillas_ninos' },
  { label: 'Botas', value: 'botas_ninos' },
  { label: 'Accesorios', value: 'accesorios_ninos' },
  { label: 'Gorras', value: 'gorras_ninos' },
  { label: 'Mochilas', value: 'mochilas_ninos' },
  { label: 'Pijamas', value: 'pijamas_ninos' },
];

