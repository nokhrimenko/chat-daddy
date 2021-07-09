import React from "react";
import Tags from "@containers/Tags/Tags";
import { IAction, ISideBarState } from "src/types/commonTypes";

import styles from "./TagsContainer.module.scss";

interface ITagsContainer {
  dispatch: (payload: IAction) => void;
  state: ISideBarState;
}

const INCLUDE_TAGS_LABEL = "Include tags";
const EXCLUDE_TAGS_LABEL = "Exclude tags";

const TagsContainer: React.FC<ITagsContainer> = ({ dispatch, state }) => (
  <div className={styles.container}>
    <h5>{INCLUDE_TAGS_LABEL}</h5>
    <Tags type="INCLUDE_TAG" dispatch={dispatch} state={state} />
    <h5>{EXCLUDE_TAGS_LABEL}</h5>
    <Tags type="EXCLUDE_TAG" dispatch={dispatch} state={state} />
  </div>
);

export default TagsContainer;
