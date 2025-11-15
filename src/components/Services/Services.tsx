import ServicesCategory from "./ServicesCategory";
import loadingImage from "/loading.svg";
import { useServicesContext } from "../../@context/servicesContext";

const Services = () => {
  const { splittedServices, errorServices, loadingServices } =
    useServicesContext();

  if (errorServices)
    return (
      <h1>
        Niestety nie udało się pobrać dane z powodu: {errorServices.toString()}
      </h1>
    );

  return (
    <div>
      <h1>Nasze usłigi</h1>

      <section className="space-y-8">
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
          Object.entries(splittedServices).map(([name, products]) => (
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
