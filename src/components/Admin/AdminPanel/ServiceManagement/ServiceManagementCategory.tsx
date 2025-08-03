import { ServicesAPIPlus } from "./ServiceManagement";
import ServiceManagementProduct from "./ServiceManagementProduct";

type Props = {
  categories: string[];
  categoryName: string;
  categoryServices: ServicesAPIPlus[];
};

const ServiceManagementCategory = ({
  categories,
  categoryName,
  categoryServices,
}: Props) => {
  return (
    <section className="space-y-2">
      <h3>{categoryName}</h3>
      <section className="grid gap-2">
        {categoryServices.map((service) => (
          <ServiceManagementProduct
            key={service.id}
            categories={categories}
            product={service}
          />
        ))}
      </section>
    </section>
  );
};

export default ServiceManagementCategory;
