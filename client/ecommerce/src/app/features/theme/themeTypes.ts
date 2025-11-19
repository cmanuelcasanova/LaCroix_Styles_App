export enum Themetype {
    WOMAN= "WOMAN" ,
    MEN = "MEN" ,
    KID = "KID",
    ALL = "ALL"
}

export interface ThemeState {
  theme: Themetype;
}
