import loadingImage from "/loading.svg";
import { useState } from "react";

type Props = {
  name: string;
  image: string;
  color: string;
  onClick?: () => void;
  loading?: boolean;
  isDeleting?: boolean;
  buttonType: "button" | "submit";
};

const ButtonServices = ({
  name,
  image,
  color,
  onClick,
  loading,
  isDeleting,
  buttonType,
}: Props) => {
  const [acceptDelete, setAcceptDelete] = useState(false);

  const handleClickFunction = () => {
    if (isDeleting && buttonType === "button") {
      setAcceptDelete(true);
      return;
    }

    if (onClick) onClick();
  };

  return (
    <section className="relative">
      <button
        type={buttonType}
        style={{ background: color }}
        className="serviceManagementButton bg-amber-200"
        onClick={handleClickFunction}
      >
        {loading ? (
          <img
            src={loadingImage}
            alt="Loading"
            loading="lazy"
            className="size-3/4 animate-spin"
          />
        ) : (
          <img src={image} alt={name} loading="lazy" />
        )}
      </button>

      {acceptDelete && (
        <div className="pointer-events-auto absolute top-0 left-0 w-50 -translate-x-1/2 -translate-y-[115%] rounded-xl border bg-white p-1 text-center">
          Na pewno chcesz usunąć tą usługę?
          <section className="grid grid-cols-2 gap-2">
            <button type="button" className="bookingButton" onClick={onClick}>
              Tak
            </button>
            <button
              type="button"
              className="bookingButton"
              onClick={() => setAcceptDelete(false)}
            >
              Nie
            </button>
          </section>
        </div>
      )}
    </section>
  );
};

export default ButtonServices;
