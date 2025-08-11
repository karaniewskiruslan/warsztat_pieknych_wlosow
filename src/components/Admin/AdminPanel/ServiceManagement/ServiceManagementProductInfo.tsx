import { Services } from "../../../../types/services.type";
import CategoryText from "../../../../UI/CategoryText";
import Edit from "/Edit.svg";

type Props = {
  product: Services;
  onCLickOpen: () => void;
};

const ServiceManagementProductInfo = ({ product, onCLickOpen }: Props) => {
  return (
    <>
      <hgroup className="flex justify-between">
        <CategoryText category="Kategoria" body={product.category} />
        <CategoryText category="ID" body={String(product.id)} />
      </hgroup>
      <section className="mobile:grid-cols-[1fr_150px] grid grid-cols-1 items-center">
        <article>
          {Array.isArray(product.cost) ? (
            product.cost.map((el, i) => (
              <CategoryText
                key={i}
                category={product.options[i]}
                body={String(el)}
                isCost={true}
              />
            ))
          ) : (
            <CategoryText
              category="Koszt"
              body={String(product.cost)}
              isCost={true}
            />
          )}
        </article>
        <img src={product.image} alt={product.name} loading="lazy" />
      </section>
      <section className="flex justify-end gap-2">
        <button className="serviceManagementButton" onClick={onCLickOpen}>
          <img src={Edit} alt="Edit" loading="lazy" />
        </button>
      </section>
    </>
  );
};

export default ServiceManagementProductInfo;
