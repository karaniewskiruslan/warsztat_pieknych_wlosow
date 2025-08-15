import classNames from "classnames";
import loadingImage from "/loading.svg";

type Props = {
  title: string;
  onClick: () => void;
  isConfirmed?: boolean;
  loading?: boolean;
};

const ButtonServices = ({ title, isConfirmed, onClick, loading }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames("bookingButton", {
        "pointer-events-none bg-gray-300 opacity-50": isConfirmed,
      })}
    >
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
  );
};

export default ButtonServices;
