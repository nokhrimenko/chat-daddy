import { totalCount } from "@redux/contactsSlice";
import React from "react";
import { TextRight } from "react-bootstrap-icons";
import { useAppSelector } from "src/app/hooks";

import styles from "./Header.module.scss";

const HEADER_TITLE = "AUDIENCE";
const CONTACTS_AMOUNT = " contacts";

const Header: React.FC = () => {
  const contactsTotalCount = useAppSelector(totalCount);

  return (
    <div className={styles.container}>
      <div className={styles.flex}>
        <TextRight className={styles.icon} />
        <span className={styles.title}>{HEADER_TITLE}</span>
      </div>
      <span
        className={styles.contacts}
      >{`${contactsTotalCount} ${CONTACTS_AMOUNT}`}</span>
    </div>
  );
};

export default Header;
