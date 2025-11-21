export enum Themetype {
    WOMAN= "WOMAN" ,
    MEN = "MEN" ,
    KIDS = "KIDS",
    ALL = "ALL"
}

export interface ThemeState {
  theme: Themetype;
}
