"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";
import type { KeenSliderOptions, KeenSliderInstance } from "keen-slider/react";

const images = [
  {
    src: "/Lacroix_img_1.jpg",
    alt: "Slide 1",
    width: 1200,
    height: 600,
  },
  {
    src: "/Lacroix_img_2.jpg",
    alt: "Slide 2",
    width: 1200,
    height: 600,
  },
  {
    src: "/Lacroix_img_3.jpg",
    alt: "Slide 3",
    width: 1200,
    height: 600,
  },
];

export default function ImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged(slider: KeenSliderInstance) {
      setCurrentSlide(slider.track.details.rel);
    },
    animation: {
      duration: 1000,
      easing: (t: number) => t * (2 - t),
    },
  } as unknown as KeenSliderOptions);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      instanceRef.current?.next();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [instanceRef]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-screen "
    >
      <div ref={sliderRef} className="keen-slider flex items-center h-[600px] sm:h-[800px] w-screen ">
        {images.map((img, i) => (
          <div
            key={i}
            className="keen-slider__slide relative w-screen h-full"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={1200} // ancho base para cálculo
              height={600}
        
              className="object-cover w-full h-full sm:h-max"
      
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {/* Flechas animadas */}
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => instanceRef.current?.prev()}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow"
      >
        <RiArrowLeftSLine />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => instanceRef.current?.next()}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 p-2 rounded-full shadow"
      >
        <RiArrowRightSLine />
      </motion.button>

      {/* Puntitos animados */}
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: currentSlide === idx ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`w-3 h-3 rounded-full ${
              currentSlide === idx ? "bg-[#fe298c]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
