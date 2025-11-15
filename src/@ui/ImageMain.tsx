import classNames from "classnames";
import { motion, Transition, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  key: number;
  direction: number;
  variants: Variants;
  transition: Transition;
};

const ImageMain = ({
  src,
  alt,
  key,
  direction,
  variants,
  transition,
}: Props) => {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) setLoaded(true);
  }, []);

  return (
    <motion.section
      key={key}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="absolute size-full"
    >
      <img
        src={src}
        alt={alt}
        ref={imageRef}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        className={classNames("duration-150", { "opacity-0": !loaded })}
      />
      <div
        className={classNames(
          "animate-image absolute top-0 left-0 size-full bg-gray-300 duration-150",
          {
            hidden: loaded,
          },
        )}
      ></div>
    </motion.section>
  );
};

export default ImageMain;
