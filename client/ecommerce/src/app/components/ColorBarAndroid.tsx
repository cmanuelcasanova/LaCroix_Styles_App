"use client"
import { themeColor } from "@/app/themeStyles";
import { selectTheme } from "@/app/features/theme/themeSelector";
import { useSelector } from "react-redux";

export default function ColorBarAndroid() {

  const theme = useSelector(selectTheme);
  const ColorCurrent = themeColor[theme];

  return (



        <meta name="theme_color" content={ColorCurrent} key="theme_color" />





  )}