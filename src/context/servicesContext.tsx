/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Services, ServicesAPI } from "../types/services.type";
import { getServices } from "../api/services.api";
import { useQuery } from "@tanstack/react-query";

type Props = {
  children: ReactNode;
};

type ServicesContentProps = {
  spitedServices: Record<string, Services[]>;
  categories: string[];
  servicesOnCategory: (category: string) => string[];
  isPending: boolean;
  error: Error | null;
  handleChangeServiceAdd: (newData: Services) => void;
  handleChangeServiceUpdate: (id: number, updData: ServicesAPI) => void;
  handleChangeServiceAfterDelete: (newList: Services[]) => void;
};

const ServicesContext = createContext({} as ServicesContentProps);

export const useServicesContext = () => {
  const context = useContext(ServicesContext);

  if (!context) throw new Error("Context must be used within ServicesContext");

  return context;
};

export const ServicesContextContainer = ({ children }: Props) => {
  const [services, setServices] = useState<Services[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const { data, isPending, error } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  useEffect(() => {
    if (data) setServices(data);
  }, [data]);

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

  const servicesOnCategory = (category: string) => {
    return services
      .filter((el) => el.category === category)
      .map((el) => el.name);
  };

  const handleChangeServiceAdd = (newData: Services) => {
    setServices((prev) => [...prev, newData]);
  };

  const handleChangeServiceUpdate = (id: number, updData: ServicesAPI) => {
    const { name, category, image, options, cost } = updData;

    setServices((prev) =>
      prev.map((service) => {
        if (service.id === id) {
          return {
            ...service,
            name,
            category,
            image: String(image),
            options,
            cost,
          };
        }

        return service;
      }),
    );
  };

  const handleChangeServiceAfterDelete = (newList: Services[]) => {
    setServices(newList);
  };

  return (
    <ServicesContext.Provider
      value={{
        spitedServices,
        categories,
        servicesOnCategory,
        isPending,
        error,
        handleChangeServiceAdd,
        handleChangeServiceUpdate,
        handleChangeServiceAfterDelete,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};
