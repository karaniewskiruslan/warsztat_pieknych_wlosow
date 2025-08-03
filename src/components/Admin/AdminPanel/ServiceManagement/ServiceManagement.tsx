import { useNavigate } from "react-router";
import PageButton from "../../../../UI/PageButton";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../../../api/services.api";
import { ServicesAPI } from "../../../../types/services";
import { useEffect, useMemo, useState } from "react";
import ServiceManagementCategory from "./ServiceManagementCategory";
import loadingImage from "/loading.svg";
import classNames from "classnames";

export type ServicesAPIPlus = ServicesAPI & { id: number };

const ServiceManagement = () => {
  const nav = useNavigate();
  const [services, setServices] = useState<ServicesAPIPlus[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const handleClickBack = () => {
    nav(-1);
  };

  const { data, isPending, error } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  useEffect(() => {
    if (data) setServices(data);
  }, [data]);

  const spitedServices = useMemo(() => {
    return services.reduce(
      (
        acc: Record<ServicesAPIPlus["category"], ServicesAPIPlus[]>,
        cur: ServicesAPIPlus,
      ) => {
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
            />
          ))
        )}
      </section>

      <button
        className={classNames(
          "mx-auto cursor-pointer rounded-full border px-4 py-2 font-bold",
          { "pointer-events-none opacity-50": isPending },
        )}
      >
        Dodaj nową usługę
      </button>

      <PageButton text="< Wstecz" onClick={handleClickBack} />
    </section>
  );
};

export default ServiceManagement;
