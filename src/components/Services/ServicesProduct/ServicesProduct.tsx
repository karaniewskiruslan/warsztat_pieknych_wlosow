import { useState } from "react";
import { Services } from "../../../types/services.type";
import Image from "../../../UI/Image";
import ServicesProductText from "./ServicesProductText";
import ServiceInfo from "../ServiceInfo/ServiceInfo";
import useScrollLock from "../../../hooks/useScrollLock.hook";
import { AnimatePresence } from "framer-motion";

type Props = {
  product: Services;
};

const ServicesProduct = ({ product }: Props) => {
  const { name, image, last, masters } = product;
  const [service, setService] = useState<Services | null>(null);

  const handleClickChangeService = (service: Services) => {
    setService(service);
  };

  useScrollLock(service !== null);

  const handleClickRemoveService = () => {
    setService(null);
  };

  return (
    <section
      data-testid="servicesProd"
      className="mobile:flex-row relative flex flex-1 flex-col place-items-center gap-4 rounded-2xl bg-gray-100 p-6"
    >
      <div className="mobile:size-40 size-30 shrink-0 rounded-xl">
        <Image src={image} alt={name} />
      </div>
      <section className="flex h-full flex-col justify-between">
        <hgroup className="space-y-3">
          <ServicesProductText name={name} masters={masters} last={last} />
        </hgroup>
        <button
          onClick={() => handleClickChangeService(product)}
          className="w-fit rounded-full bg-gray-200 px-4 py-1 uppercase"
        >
          więcej szczegółów
        </button>
      </section>

      <AnimatePresence>
        {service && (
          <ServiceInfo
            service={service}
            onClickRemoveService={handleClickRemoveService}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesProduct;
