import { services } from "./Services.data";
import ServicesProduct from "./ServicesProduct";

const Services = () => {
  return (
    <div>
      <h1>Nasze usłigi</h1>
      <section className="mobile:grid-cols-4 grid grid-cols-2 gap-3 xl:grid-cols-5">
        {services.map((service) => (
          <ServicesProduct key={service.id} product={service} />
        ))}
      </section>
    </div>
  );
};

export default Services;
