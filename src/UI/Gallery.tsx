/* eslint-disable react-hooks/exhaustive-deps */
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
  gallery: string[];
  scrollDirection: "X" | "Y";
  pagination: number;
  delay: number;
};

const variantX = {
  animation: {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
      };
    },
    center: {
      x: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
      };
    },
  },
  transition: {
    x: { type: "spring", stiffness: 250, damping: 25 },
    opacity: { duration: 0.1716 },
  },
};

const variantY = {
  animation: {
    enter: (direction: number) => {
      return {
        y: direction > 0 ? "100%" : "-100%",
        opacity: 0,
      };
    },
    center: {
      y: 0,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction: number) => {
      return {
        y: direction < 0 ? "100%" : "-100%",
        opacity: 0,
      };
    },
  },
  transition: {
    y: { type: "spring", stiffness: 250, damping: 25 },
    opacity: { duration: 0.1716 },
  },
};

const wrap = (min: number, max: number, value: number) => {
  return ((((value - min) % (max - min)) + (max - min)) % (max - min)) + min;
};

const Gallery = ({ gallery, scrollDirection, pagination, delay }: Props) => {
  const [[image, direction], setImage] = useState([0, 0]);

  const imageIndex = wrap(0, gallery.length, image);
  const handleAutoPaginate = (newDirection: number) => {
    setImage([image + newDirection, newDirection]);
  };

  const variantsOption = scrollDirection === "X" ? variantX : variantY;

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      handleAutoPaginate(pagination);
    }, 2000 + delay);

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleAutoPaginate(pagination);
    }, 36000);

    return () => clearInterval(interval);
  }, [pagination, image]);

  return (
    <section className="pointer-events-none relative aspect-square size-full overflow-hidden rounded-2xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={image}
          src={gallery[imageIndex]}
          custom={direction}
          variants={variantsOption.animation}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ ...variantsOption.transition, delay: delay / 1000 }}
          className="absolute size-full"
        />
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
