type Props = {
  category: string;
  body: string;
  isCost?: boolean;
};

const CategoryText = ({ category, body, isCost }: Props) => {
  return (
    <p>
      <b>{category}:</b> {body}
      {isCost && "zł"}
    </p>
  );
};

export default CategoryText;
