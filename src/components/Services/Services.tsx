import { Services as ServicesType } from "../../types/services";
import { services } from "./Services.data";
import ServicesCategory from "./ServicesCategory";

const Services = () => {
  const spitedServices = services.reduce(
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

  return (
    <div>
      <h1>Nasze usłigi</h1>

      <section className="space-y-8">
        {Object.entries(spitedServices).map(([name, products]) => (
          <ServicesCategory
            key={name}
            categoryName={name}
            categoryServices={products}
          />
        ))}
      </section>

      {/* <section className="mobile:grid-cols-4 grid grid-cols-2 gap-3 xl:grid-cols-5">
        {services.map((service) => (
          <ServicesProduct key={service.id} product={service} />
        ))}
      </section> */}
    </div>
  );
};

export default Services;
