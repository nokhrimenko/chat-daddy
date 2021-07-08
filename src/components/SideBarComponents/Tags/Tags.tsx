import React from "react";
import { allTags } from "@redux/contactsSlice";
import { ListGroup } from "react-bootstrap";
import { useAppSelector } from "src/app/hooks";

import styles from "./Tags.module.scss";

const Tags = () => {
  const tags = useAppSelector(allTags);

  return (
    <ListGroup className={styles.tags}>
      {tags.map((tag, index) => (
        <ListGroup.Item style={{ background: index % 2 ? "gray" : "inherit" }}>
          {tag}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Tags;
