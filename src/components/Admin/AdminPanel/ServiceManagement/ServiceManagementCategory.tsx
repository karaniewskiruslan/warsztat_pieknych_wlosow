import { AnimatePresence } from "framer-motion";
import { Services } from "../../../../@types/services.type";
import ServiceManagementProduct from "./ServiceManagementProduct";

type Props = {
  categoryName: string;
  categoryServices: Services[];
};

const ServiceManagementCategory = ({
  categoryName,
  categoryServices,
}: Props) => {
  return (
    <section className="space-y-2">
      <h3>{categoryName}</h3>
      <section className="grid gap-2">
        <AnimatePresence initial={false}>
          {categoryServices.map((service) => (
            <ServiceManagementProduct key={service._id} product={service} />
          ))}
        </AnimatePresence>
      </section>
    </section>
  );
};

export default ServiceManagementCategory;
