import { Services } from "../../types/services.type";
import ServicesProduct from "./ServicesProduct/ServicesProduct";

type Props = {
  categoryName: string;
  categoryServices: Services[];
};

const ServicesCategory = ({ categoryName, categoryServices }: Props) => {
  return (
    <div className="space-y-2">
      <h2>{categoryName}</h2>
      <section className="tablet:grid-cols-2 grid gap-3">
        {categoryServices.map((service) => (
          <ServicesProduct key={service.id} product={service} />
        ))}
      </section>
    </div>
  );
};

export default ServicesCategory;
