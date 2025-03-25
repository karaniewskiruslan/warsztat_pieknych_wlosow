import { ContactOpt } from "../../types/contact";

type Props = {
  contactOpt: ContactOpt;
};

const ContactText = ({ contactOpt }: Props) => {
  return contactOpt.isLink ? (
    <>
      <article className="w-fit">
        <a href={contactOpt.link} target="_blank">
          <h2 className="underline">{contactOpt.title}</h2>
        </a>
      </article>
    </>
  ) : (
    <article className="w-fit">
      <h2>{contactOpt.title}</h2>
      {Array.isArray(contactOpt.body) ? (
        contactOpt.body.map((line) => <p key={line}>{line}</p>)
      ) : (
        <p>{contactOpt.body}</p>
      )}
    </article>
  );
};

export default ContactText;
