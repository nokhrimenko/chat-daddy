import React from "react";
import { allTags } from "@redux/contactsSlice";
import { ListGroup } from "react-bootstrap";
import { useAppSelector } from "src/app/hooks";
import { Trash } from "react-bootstrap-icons";
import cn from "classnames";
import { IAction, ISideBarState } from "src/types/commonTypes";

import styles from "./Tags.module.scss";

interface ITags {
  type: "EXCLUDE_TAG" | "INCLUDE_TAG";
  dispatch: (payload: IAction) => void;
  state: ISideBarState;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Tags: React.FC<ITags> = ({ dispatch, type, state }) => {
  const tags = useAppSelector(allTags);

  const stateType = type === "EXCLUDE_TAG" ? "tagsToExclude" : "tagsToInclude";
  const isActive = (tag: string) => state[stateType].includes(tag);

  const handleClick = (tag: string) => {
    if (!isActive(tag)) {
      dispatch({ type, payload: tag });
    }
  };

  const handleDelete = (tag: string) => {
    dispatch({ type, payload: tag });
  };

  return (
    <ListGroup className={styles.tags}>
      {tags.map((tag, index) => (
        <ListGroup.Item
          onClick={() => handleClick(tag)}
          className={cn({
            [styles.oddRow]: index % 2,
            [styles.active]: isActive(tag),
          })}
          style={{
            borderRadius: "10px",
          }}
          key={String(index)}
        >
          <div className={styles.container}>
            {tag}
            {isActive(tag) && <Trash onClick={() => handleDelete(tag)} />}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Tags;
