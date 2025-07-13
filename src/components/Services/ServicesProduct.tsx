import { useState } from "react";
import { Services } from "../../types/services";

type Props = {
  product: Services;
};

const ServicesProduct = ({ product }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <article
      data-testid="servicesProd"
      className="relative flex aspect-[4/5] flex-col items-center justify-between gap-4 rounded-2xl bg-gray-100 p-3"
    >
      <div className="grid w-full place-items-center">
        <img
          src={product.image}
          alt={product.name}
          className="mobile:size-24 size-16"
        />
      </div>

      {product.options.length ? (
        <>
          <p className="text-center font-bold">{product.name}</p>
          <article
            data-testid="servicesProd-options"
            className={`absolute w-full bg-gray-100 ${!isOpen ? "pointer-events-none opacity-0" : ""} bottom-0 z-10 translate-y-5/6 rounded-b-sm p-1 duration-150`}
          >
            {product.options.map((option, i) => {
              const productCost =
                Array.isArray(product.cost) && product.cost[i];

              return (
                <div
                  key={i}
                  className="flex w-full items-center justify-between text-sm"
                >
                  <p data-testid="data-offer" data-offer className="font-bold">
                    {option}
                  </p>
                  <p data-offer className="text-nowrap">
                    {productCost} zł
                  </p>
                </div>
              );
            })}
          </article>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="z-50 size-7 cursor-pointer rounded-full bg-gray-200"
          >
            {isOpen ? "-" : "+"}
          </button>
        </>
      ) : (
        <>
          <p className="text-center font-bold">{product.name}</p>
          <p>{product.cost === 0 ? "Za darmo" : `${product.cost} zł`}</p>
        </>
      )}
    </article>
  );
};

export default ServicesProduct;
