import Contact from "@components/Contacts/Contact/Contact";
import { makeStringFromArray } from "@helpers/helpers";
import {
  selectContact,
  selectContacts,
  selectedContacts,
  unSelectContact,
} from "@redux/contactsSlice";
import React from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";

import styles from "./ContactList.module.scss";

const defaultPicture = "https://avt-18.foto.mail.ru/inbox/vint06/_avatar180?";
const defaultName = "No name";

const ContactsList = () => {
  const contacts = useAppSelector(selectContacts);
  const selectedContactsArr = useAppSelector(selectedContacts);
  const dispatch = useAppDispatch();

  const handleSelect = (contactIndex: number) => {
    dispatch(selectContact(contactIndex));
  };

  const handleUnSelect = (contactIndex: number) => {
    dispatch(unSelectContact(contactIndex));
  };
  const checkSelect = (index: number) => selectedContactsArr.includes(index);

  return (
    <div className={styles.container}>
      {contacts.map(({ name, phoneNumber, tags, img, id }, index) => (
        <Contact
          name={name || defaultName}
          phoneNumber={phoneNumber}
          url={img?.url || defaultPicture}
          tags={tags.length ? makeStringFromArray(tags) : ""}
          key={id}
          isActive={checkSelect(index)}
          handleSelect={() => handleSelect(index)}
          handleUnSelect={() => handleUnSelect(index)}
        />
      ))}
    </div>
  );
};

export default ContactsList;
