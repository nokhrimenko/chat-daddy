import Contact from "@components/Contacts/Contact/Contact";
import { selectContacts } from "@redux/contactsSlice";
import React from "react";
import { useAppSelector } from "src/app/hooks";

const defaultPicture = "https://avt-18.foto.mail.ru/inbox/vint06/_avatar180?";
const defaultName = "No name";

const ContactsList = () => {
  const contacts = useAppSelector(selectContacts);

  return (
    <>
      {contacts.map(({ name, phoneNumber, tags, img }) => (
        <Contact
          name={name || defaultName}
          phoneNumber={phoneNumber}
          url={img?.url || defaultPicture}
          tags={JSON.stringify(tags)}
        />
      ))}
    </>
  );
};

export default ContactsList;
