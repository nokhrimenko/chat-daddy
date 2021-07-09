import Contact from "@components/Contacts/Contact/Contact";
import { makeStringFromArray } from "@helpers/helpers";
import {
  getNewPage,
  isLoading,
  selectContact,
  selectContacts,
  selectedContacts,
  unSelectContact,
} from "@redux/contactsSlice";
import React, { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import debounce from "lodash.debounce";
import { Spinner } from "react-bootstrap";
import cn from "classnames";

import styles from "./ContactList.module.scss";

const defaultPicture = "https://avt-18.foto.mail.ru/inbox/vint06/_avatar180?";
const defaultName = "No name";

const ContactsList = () => {
  const contacts = useAppSelector(selectContacts);
  const selectedContactsArr = useAppSelector(selectedContacts);
  const isLoadingState = useAppSelector(isLoading);
  const dispatch = useAppDispatch();
  const listRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getResultDebounced = useCallback(debounce(dispatch, 200), []);

  useEffect(() => {
    const scrollFunc = () => {
      if (listRef.current) {
        // console.log(listRef.current?.scrollTop);
        const scroll =
          listRef.current.scrollHeight - listRef.current?.scrollTop;
        if (scroll < 760) {
          console.log("loading");
          getResultDebounced(getNewPage());
        }
      }
    };

    listRef.current!.addEventListener("scroll", scrollFunc);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      listRef.current!.removeEventListener("scroll", scrollFunc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (contactIndex: number) => {
    dispatch(selectContact(contactIndex));
  };

  const handleUnSelect = (contactIndex: number) => {
    dispatch(unSelectContact(contactIndex));
  };
  const checkSelect = (index: number) => selectedContactsArr.includes(index);

  return (
    <div className={styles.wrapper}>
      <div
        className={cn({
          [styles.loading]: true,
          [styles.hidden]: !isLoadingState,
        })}
      >
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
      <div ref={listRef} className={styles.container}>
        {contacts.map(({ name, phoneNumber, tags, img, id }, index) => (
          <Contact
            name={name || defaultName}
            phoneNumber={phoneNumber}
            url={img?.url || defaultPicture}
            tags={(tags || []).length ? makeStringFromArray(tags) : ""}
            key={id}
            isActive={checkSelect(index)}
            handleSelect={() => handleSelect(index)}
            handleUnSelect={() => handleUnSelect(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactsList;
