import { ContactOpt } from "../../types/contact.type";
import Image from "../../UI/Image";

type Props = {
  contactOpt: ContactOpt;
};

const ContactText = ({ contactOpt }: Props) => {
  return contactOpt.isLink ? (
    <>
      <article className="w-fit">
        <a href={contactOpt.link} target="_blank" className="flex gap-2">
          <div className="size-9">
            <Image src={contactOpt.image!} alt={contactOpt.title} />
          </div>
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
