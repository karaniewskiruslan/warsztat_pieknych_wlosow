import classNames from "classnames";
import loadingImage from "/loading.svg";
import { useState } from "react";

type Props = {
  title: string;
  onClick: () => void;
  isConfirmed?: boolean;
  loading?: boolean;
  isDeleting?: boolean;
};

const ButtonBooking = ({
  title,
  isConfirmed,
  onClick,
  loading,
  isDeleting,
}: Props) => {
  const [acceptDelete, setAcceptDelete] = useState(false);

  const handleClickFunction = () => {
    if (isDeleting) {
      setAcceptDelete(true);
      return;
    }

    onClick();
  };

  return (
    <section
      className={classNames("bookingButton", {
        "pointer-events-none bg-gray-300 opacity-50": isConfirmed,
      })}
    >
      <button type="button" onClick={handleClickFunction}>
        {loading ? (
          <>
            <img
              src={loadingImage}
              alt="Loading"
              loading="lazy"
              className="size-4 animate-spin"
            />
          </>
        ) : (
          title
        )}
      </button>

      {acceptDelete && (
        <div className="pointer-events-auto absolute top-0 left-0 w-full -translate-y-[115%] rounded-xl border bg-white p-1 text-center">
          Na pewno chcesz odwołać tą wizytę?
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

export default ButtonBooking;
