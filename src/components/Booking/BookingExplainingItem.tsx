type Props = {
  item: { title: string; color: string };
};

const BookingExplainingItem = ({ item }: Props) => {
  return (
    <div className="flex justify-center gap-2">
      <div
        style={{ backgroundColor: item.color }}
        className="size-6 rounded-full border"
      ></div>
      <p>{item.title}</p>
    </div>
  );
};

export default BookingExplainingItem;
