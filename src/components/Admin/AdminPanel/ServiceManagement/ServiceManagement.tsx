import { useNavigate } from "react-router";
import PageButton from "../../../../UI/PageButton";
import { useState } from "react";
import ServiceManagementCategory from "./ServiceManagementCategory";
import loadingImage from "/loading.svg";
import classNames from "classnames";
import NewServiceAdding from "./NewServiceAdding/NewServiceAdding";
import useScrollLock from "../../../../hooks/useScrollLock.hook";
import { useServicesContext } from "../../../../context/servicesContext";
import { AnimatePresence } from "framer-motion";

const ServiceManagement = () => {
  const { splittedServices, errorServices, loadingServices } =
    useServicesContext();

  const nav = useNavigate();
  const [newServiceAdding, setNewServiceAdding] = useState(false);

  useScrollLock(newServiceAdding);

  const handleClickBack = () => {
    nav(-1);
  };

  const handleClickAddNewService = () => {
    setNewServiceAdding((prev) => !prev);
  };

  if (errorServices)
    return (
      <h1>
        Niestety nie udało się pobrać dane z powodu: {errorServices.toString()}
      </h1>
    );

  return (
    <section className="relative flex flex-col space-y-4">
      <h2>Zarządzanie usługami</h2>
      <section className="grid gap-4">
        {loadingServices ? (
          <div className="flex size-5">
            <img
              src={loadingImage}
              alt="Loading"
              loading="lazy"
              className="size-4 animate-spin"
            />
          </div>
        ) : (
          Object.entries(splittedServices).map(([category, items]) => (
            <ServiceManagementCategory
              key={category}
              categoryName={category}
              categoryServices={items}
            />
          ))
        )}
      </section>

      <button
        className={classNames(
          "mx-auto rounded-full border px-4 py-2 font-bold",
          { "pointer-events-none opacity-50": loadingServices },
        )}
        onClick={handleClickAddNewService}
      >
        Dodaj nową usługę
      </button>

      <PageButton text="< Wstecz" onClick={handleClickBack} />

      <AnimatePresence>
        {newServiceAdding ? (
          <NewServiceAdding onClickAddNewService={handleClickAddNewService} />
        ) : null}
      </AnimatePresence>
    </section>
  );
};

export default ServiceManagement;
