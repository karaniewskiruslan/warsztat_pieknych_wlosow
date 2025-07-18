type Props = {
  name: string;
  photo: string;
  description: string[];
};

const MasterInfo = ({ name, photo, description }: Props) => {
  return (
    <section className="master-section">
      <h3>O mistrzu</h3>
      <section className="mobile:grid-cols-[1fr_2fr] grid grid-cols-1 gap-4">
        <div className="aspect-square overflow-hidden rounded-2xl bg-amber-100">
          <img
            src={photo}
            alt={`Master ${name} photo`}
          />
        </div>
        <article className="space-y-1">
          {description.map((pr, i) => (
            <p data-testid="master-desc" key={i} className="first-letter:font-bold">
              {pr}
            </p>
          ))}
        </article>
      </section>
    </section>
  );
};

export default MasterInfo;
