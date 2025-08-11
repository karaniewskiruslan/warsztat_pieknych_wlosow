import { useQuery } from "@tanstack/react-query";
import { getServices } from "../../api/services.api";
import { Services as ServicesType } from "../../types/services.type";
import ServicesCategory from "./ServicesCategory";
import { useEffect, useMemo, useState } from "react";
import loadingImage from "/loading.svg";

const Services = () => {
  const [services, setServices] = useState<ServicesType[]>([]);

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
        acc: Record<ServicesType["category"], ServicesType[]>,
        cur: ServicesType,
      ) => {
        const key = cur.category;

        acc[key] = acc[key] ? [...acc[key], cur] : [cur];

        return acc;
      },
      {},
    );
  }, [services]);

  if (error)
    return (
      <h1>Niestety nie udało się pobrać dane z powodu: {error.toString()}</h1>
    );

  return (
    <div>
      <h1>Nasze usłigi</h1>

      <section className="space-y-8">
        {isPending ? (
          <div className="flex size-5">
            <img
              src={loadingImage}
              alt="Loading"
              loading="lazy"
              className="size-4 animate-spin"
            />
          </div>
        ) : (
          Object.entries(spitedServices).map(([name, products]) => (
            <ServicesCategory
              key={name}
              categoryName={name}
              categoryServices={products}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default Services;
