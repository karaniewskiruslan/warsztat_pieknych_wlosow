import { useNavigate } from "react-router";
import PageButton from "../../../../UI/PageButton";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../../../api/services.api";
import { useEffect, useMemo, useState } from "react";
import ServiceManagementCategory from "./ServiceManagementCategory";
import loadingImage from "/loading.svg";
import classNames from "classnames";
import { Services, ServicesAPI } from "../../../../types/services";
import NewServiceAdding from "./NewServiceAdding/NewServiceAdding";
import useScrollLock from "../../../../hooks/useScrollLock.hook";

const ServiceManagement = () => {
  const nav = useNavigate();
  const [services, setServices] = useState<Services[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [newServiceAdding, setNewServiceAdding] = useState(false);

  useScrollLock(newServiceAdding);

  const handleClickBack = () => {
    nav(-1);
  };

  const handleClickAddNewService = () => {
    setNewServiceAdding((prev) => !prev);
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  useEffect(() => {
    if (data) setServices(data);
  }, [data]);

  const handleChangeServiceUpdate = (id: number, newData: ServicesAPI) => {
    const { name, category, image, options, cost } = newData;

    setServices((prev) =>
      prev.map((service) => {
        if (service.id === id) {
          return { ...service, name, category, image, options, cost };
        }

        return service;
      }),
    );
  };

  const handleChangeServiceAdd = (newData: Services) => {
    setServices((prev) => [...prev, newData]);
  };

  const handleChangeServiceAfterDelete = (newList: Services[]) => {
    setServices(newList);
  };

  const spitedServices = useMemo(() => {
    return services.reduce(
      (acc: Record<Services["category"], Services[]>, cur: Services) => {
        const key = cur.category;

        acc[key] = acc[key] ? [...acc[key], cur] : [cur];

        return acc;
      },
      {},
    );
  }, [services]);

  useEffect(() => {
    if (spitedServices) setCategories(Object.keys(spitedServices));
  }, [spitedServices]);

  if (error)
    return (
      <h1>Niestety nie udało się pobrać dane z powodu: {error.toString()}</h1>
    );

  return (
    <section className="relative flex flex-col space-y-4">
      <h2>Zarządzanie usługami</h2>
      <section className="grid gap-4">
        {isPending ? (
          <div className="flex size-5">
            <img
              className="size-4 animate-spin"
              src={loadingImage}
              alt="Loading"
            />
          </div>
        ) : (
          Object.entries(spitedServices).map(([category, items]) => (
            <ServiceManagementCategory
              key={category}
              categories={categories}
              categoryName={category}
              categoryServices={items}
              onChangeServiceUpdate={handleChangeServiceUpdate}
              onChangeServiceAfterDelete={handleChangeServiceAfterDelete}
            />
          ))
        )}
      </section>

      <button
        className={classNames(
          "mx-auto rounded-full border px-4 py-2 font-bold",
          { "pointer-events-none opacity-50": isPending },
        )}
        onClick={handleClickAddNewService}
      >
        Dodaj nową usługę
      </button>

      <PageButton text="< Wstecz" onClick={handleClickBack} />

      {newServiceAdding ? (
        <NewServiceAdding
          categories={categories}
          onClickAddNewService={handleClickAddNewService}
          onChangeServiceAdd={handleChangeServiceAdd}
        />
      ) : null}
    </section>
  );
};

export default ServiceManagement;
