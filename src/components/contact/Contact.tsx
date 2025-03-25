import { contact } from "./contact.data";
import ContactText from "./ContactText";

const Contact = () => {
  const mapStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    border: "none",
  };

  return (
    <div className="w-full">
      <h1>Kontakt</h1>
      <section
        data-contact
        className="tablet:grid-cols-2 cols-1 tablet:grid-rows-1 grid w-full grid-rows-2 gap-4"
      >
        <section className="flex w-fit flex-col gap-4">
          {contact.map((option) => (
            <ContactText key={option.title} contactOpt={option} />
          ))}
        </section>
        <section className="w-full outline outline-offset-2">
          <iframe
            style={mapStyle}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d914.7021061266845!2d21.05354163685105!3d52.14178036629978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47192df52577184b%3A0x8d7b11484117b527!2zV2Fyc3p0YXQgUGnEmWtueWNoIFfFgm9zw7N3!5e1!3m2!1sen!2spl!4v1742244719994!5m2!1sen!2spl"
            loading="lazy"
          ></iframe>
        </section>
      </section>
    </div>
  );
};

export default Contact;
