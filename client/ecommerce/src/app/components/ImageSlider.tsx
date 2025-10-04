"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { themeBgMap } from "@/app/themeStyles"
import { useSelector } from "react-redux";
import { selectTheme } from "@/app/features/theme/themeSelector";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"
/*
const images = [
  {
    src: "https://ik.imagekit.io/wakm0y68u/LaCroix/Homepage/Lacroix_img_1.jpg",
    alt: "Slide 1",
    width: 1200,
    height: 600,
  },
  {
    src: "https://ik.imagekit.io/wakm0y68u/LaCroix/Homepage/Lacroix_img_8.jpg",
    alt: "Slide 2",
    width: 1200,
    height: 600,
  },
  {
    src: "https://ik.imagekit.io/wakm0y68u/LaCroix/Homepage/Lacroix_img_3.jpg",
    alt: "Slide 3",
    width: 1200,
    height: 600,
  },
  {
    src: "https://ik.imagekit.io/wakm0y68u/LaCroix/Homepage/Lacroix_img_7.jpg",
    alt: "Slide 4",
    width: 1200,
    height: 600,
  },
    {
    src: "https://ik.imagekit.io/wakm0y68u/LaCroix/Homepage/Lacroix_img_9.jpg",
    alt: "Slide 5",
    width: 1200,
    height: 600,
  },
    {
    src: "https://ik.imagekit.io/wakm0y68u/LaCroix/Homepage/Lacroix_img_2.jpg",
    alt: "Slide 6",
    width: 1200,
    height: 600,
  },



];


<div ref={sliderRef} className="keen-slider flex items-center h-[300px] sm:h-[800px] w-screen ">
        {imageUrls.map((img, i) => (
          <div
            key={i}
            className="keen-slider__slide relative w-screen h-full"
          >
            <Image
              src={img}
              alt={img}
              width={1200} // ancho base para cálculo
              height={600}
        
              className="object-cover w-full sm:h-max"
      
              priority={i === 0}
            />
          </div>



*/
interface ListaStringsProps {
  imageUrls: string[]; 
}

interface imagenesgaleria {
  original: string; 
}




export default function ImageSlider ( { imageUrls }:ListaStringsProps ) {

  const theme = useSelector(selectTheme);
  const bgClass = themeBgMap[theme]

  const ArrayImgRIG:imagenesgaleria[] = imageUrls.map(i => { return {original: i }} )


  return (      
    <div className="h-[300px] sm:h-[800px] w-screen mb-16 sm:mb-0 shadow-black">
      <ImageGallery items={ ArrayImgRIG } autoPlay={true} slideInterval={6000} showFullscreenButton={false} />
    </div>
  )

  
}
