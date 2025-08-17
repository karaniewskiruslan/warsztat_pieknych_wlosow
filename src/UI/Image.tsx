import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  alt: string;
  isAbsolute?: boolean;
};

const Image = ({ src, alt, isAbsolute }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) setLoaded(true);
  }, []);

  return (
    <section
      className={classNames("size-full", {
        relative: !isAbsolute,
        absolute: isAbsolute,
      })}
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
    </section>
  );
};

export default Image;
