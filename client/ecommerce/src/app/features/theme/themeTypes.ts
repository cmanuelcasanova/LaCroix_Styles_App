export enum Themetype {
    WOMAN= "WOMAN" ,
    MEN = "MEN" ,
    BOY = "BOY",
    ALL = "ALL"
}

export interface ThemeState {
  theme: Themetype;
}
