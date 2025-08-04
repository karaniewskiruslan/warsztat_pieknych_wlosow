import { Services, ServicesAPI } from "../../../../types/services";
import ServiceManagementProduct from "./ServiceManagementProduct";

type Props = {
  categories: string[];
  categoryName: string;
  categoryServices: Services[];
  onChangeServiceUpdate: (id: number, newData: ServicesAPI) => void;
  onChangeServiceAfterDelete: (newList: Services[]) => void;
};

const ServiceManagementCategory = ({
  categories,
  categoryName,
  categoryServices,
  onChangeServiceUpdate,
  onChangeServiceAfterDelete,
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
            onChangeServiceUpdate={onChangeServiceUpdate}
            onChangeServiceAfterDelete={onChangeServiceAfterDelete}
          />
        ))}
      </section>
    </section>
  );
};

export default ServiceManagementCategory;
