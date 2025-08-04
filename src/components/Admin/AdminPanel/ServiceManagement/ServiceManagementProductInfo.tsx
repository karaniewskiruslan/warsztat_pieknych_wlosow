import { Services } from "../../../../types/services";
import Edit from "/Edit.svg";

type Props = {
  product: Services;
  onCLickOpen: () => void;
};

const ServiceManagementProductInfo = ({ product, onCLickOpen }: Props) => {
  return (
    <>
      <hgroup className="flex justify-between">
        <h4>
          <b>Kategoria:</b> {product.category}
        </h4>
        <p>
          <b>Item ID:</b> {product.id}
        </p>
      </hgroup>
      <section className="mobile:grid-cols-[1fr_150px] grid grid-cols-1 items-center">
        <article>
          {Array.isArray(product.cost) ? (
            product.cost.map((el, i) => (
              <div key={i}>
                <b>{product.options[i]}:</b> {el}zł
              </div>
            ))
          ) : (
            <div>
              <b>Zł:</b> {product.cost}zł
            </div>
          )}
        </article>
        <img src={product.image} alt={product.name} />
      </section>
      <section className="flex justify-end gap-2">
        <button className="serviceManagementButton" onClick={onCLickOpen}>
          <img src={Edit} alt="Edit" />
        </button>
      </section>
    </>
  );
};

export default ServiceManagementProductInfo;
