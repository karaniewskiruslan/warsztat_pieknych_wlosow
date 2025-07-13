import { Services } from "../../types/services";
import ServicesProduct from "./ServicesProduct";

type Props = {
  categoryName: string;
  categoryServices: Services[];
};

const ServicesCategory = ({ categoryName, categoryServices }: Props) => {
  return (
    <div className="space-y-2">
      <h2>{categoryName}</h2>
      <section className="mobile:grid-cols-4 grid grid-cols-2 gap-3 xl:grid-cols-5">
        {categoryServices.map((service) => (
          <ServicesProduct key={service.id} product={service} />
        ))}
      </section>
    </div>
  );
};

export default ServicesCategory;
