import { RootState } from "@/app/store";

export const selectedFiltersG = (state: RootState) => state.SelectedFilters;

export const selectHasFilters = (state: RootState) => {
  const { category, color, talla, preciomin, preciomax } = selectedFiltersG(state);
  return (
    category.length > 0 ||
    color.length > 0 ||
    talla.length > 0 ||
    preciomin > 0 ||
    preciomax < 1000
  );
};
