import { Services } from "../../types/services";

type Props = {
  product: Services;
};

const ServicesProduct = ({ product }: Props) => {
  return (
    <article className="flex aspect-[4/5] flex-col items-center justify-between gap-4 rounded-2xl bg-gray-100 p-3">
      <div className="grid w-full place-items-center">
        <img
          src={product.image}
          alt={product.name}
          className="mobile:size-24 size-16"
        />
      </div>
      {product.options.length ? (
        <article className="w-a">
          <p className="text-center font-bold">{product.name}</p>
          {product.options.map((option, i) => {
            const productCost = Array.isArray(product.cost) && product.cost[i];

            return (
              <div className="flex w-full items-center justify-between text-sm">
                <p data-offer className="font-bold">
                  {option}
                </p>
                <p data-offer className="text-nowrap">
                  {productCost} zł
                </p>
              </div>
            );
          })}
        </article>
      ) : (
        <article className="text-center">
          <p className="font-bold">{product.name}</p>
          <p>{product.cost === 0 ? "Za darmo" : `${product.cost} zł`}</p>
        </article>
      )}
    </article>
  );
};

export default ServicesProduct;
