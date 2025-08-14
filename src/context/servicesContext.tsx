/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useMemo } from "react";
import { Services } from "../types/services.type";
import { getServices } from "../api/services.api";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type Props = {
  children: ReactNode;
};

type ServicesContentProps = {
  splittedServices: Record<string, Services[]>;
  categories: string[];
  servicesOnCategory: (category: string) => string[];
  loadingServices: boolean;
  errorServices: Error | null;
  updateServiceInCache: (service: Services) => void;
  addServiceToCache: (service: Services) => void;
  deleteServicesFromCache: (ids: number) => void;
};

const ServicesContext = createContext({} as ServicesContentProps);

export const useServicesContext = () => {
  const context = useContext(ServicesContext);

  if (!context) throw new Error("Context must be used within ServicesContext");

  return context;
};

export const ServicesContextContainer = ({ children }: Props) => {
  const queryClient = useQueryClient();

  const {
    data: services = [],
    isPending,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
    refetchInterval: 5000,
  });

  const splittedServices: Record<string, Services[]> = useMemo(() => {
    return (services ?? []).reduce(
      (acc: Record<Services["category"], Services[]>, cur: Services) => {
        const key = cur.category;

        acc[key] = acc[key] ? [...acc[key], cur] : [cur];

        return acc;
      },
      {},
    );
  }, [services]);

  const categories = useMemo(
    () => Object.keys(splittedServices),
    [splittedServices],
  );

  const servicesOnCategory = (category: string) => {
    return services
      .filter((el: Services) => el.category === category)
      .map((el: Services) => el.name);
  };

  const updateServiceInCache = (updated: Services) => {
    if (!updated) return;

    queryClient.setQueryData<Services[]>(["services"], (old = []) =>
      old.map((s) => (s.id === updated.id ? updated : s)),
    );
  };

  const addServiceToCache = (newService: Services) => {
    if (!newService) return;

    queryClient.setQueryData<Services[]>(["services"], (old = []) => [
      ...old,
      newService,
    ]);
  };

  const deleteServicesFromCache = (id: number) => {
    queryClient.setQueryData<Services[]>(["services"], (old = []) =>
      old.filter((s) => s.id !== id),
    );
  };

  return (
    <ServicesContext.Provider
      value={{
        splittedServices,
        categories,
        servicesOnCategory,
        loadingServices: isPending,
        errorServices: error,
        updateServiceInCache,
        addServiceToCache,
        deleteServicesFromCache,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};
