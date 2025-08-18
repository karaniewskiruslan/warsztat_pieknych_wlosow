type Props = {
  title: string;
  text: string;
};

const BookingTitle = ({ title, text }: Props) => {
  return (
    <hgroup>
      <h2>{title}</h2>
      <p>{text}</p>
    </hgroup>
  );
};

export default BookingTitle;
