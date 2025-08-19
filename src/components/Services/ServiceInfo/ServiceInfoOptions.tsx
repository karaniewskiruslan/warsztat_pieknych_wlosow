import CategoryText from "../../../UI/CategoryText";

type Props = {
  options: string[];
  cost: number[] | number;
};

const ServiceInfoOptions = ({ options, cost }: Props) => {
  if (!options.length)
    return (
      <>
        <h4>Usługa jednoopcyjna</h4>
        <CategoryText category="Koszt usługi" body={`${cost} zł`} />
      </>
    );

  return (
    <>
      <h4>Opcji usługi</h4>
      {options.map((option, i) => (
        <CategoryText
          category={option}
          body={`${(cost as Array<number>)[i]} zł`}
        />
      ))}
    </>
  );
};

export default ServiceInfoOptions;
