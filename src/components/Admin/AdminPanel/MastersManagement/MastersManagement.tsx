import { useNavigate } from "react-router";
import PageButton from "../../../../@ui/PageButton";
import loadingImage from "/loading.svg";
import { useMastersContext } from "../../../../@context/mastersContext";

const MastersManagement = () => {
  const { masters, mastersLoading } = useMastersContext();
  const nav = useNavigate();

  const handleClickBack = () => {
    nav(-1);
  };

  return (
    <div className="relative">
      {mastersLoading && (
        <div className="flex size-5">
          <img
            src={loadingImage}
            alt="Ładowanie…"
            loading="lazy"
            className="size-4 animate-spin"
          />
        </div>
      )}
      {!mastersLoading && masters && masters.map((el) => <div>{el.name}</div>)}
      <PageButton text="< Wstecz" onClick={handleClickBack} />
    </div>
  );
};

export default MastersManagement;
