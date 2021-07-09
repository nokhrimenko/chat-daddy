import React from "react";
import { CheckCircle } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { selectAll } from "@redux/contactsSlice";
import { useAppDispatch } from "src/app/hooks";

import styles from "./ContactsAction.module.scss";

const SELECT_ALL_LABEL = "Select All";
const EXPORT_ALL_LABEL = "Export All";

const ContactsAction = () => {
  const dispatch = useAppDispatch();

  const handleSelectAll = () => {
    dispatch(selectAll());
  };

  return (
    <div className={styles.container}>
      <div>
        <CheckCircle onClick={handleSelectAll} />
        <span className={styles.label}>{SELECT_ALL_LABEL}</span>
      </div>
      <Button
        variant="success"
        size="sm"
        style={{ backgroundColor: "#0ba391" }}
        className={styles.btn}
      >
        {EXPORT_ALL_LABEL}
      </Button>
    </div>
  );
};

export default ContactsAction;
