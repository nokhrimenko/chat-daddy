import Header from "@components/SideBarComponents/Header/Header";
import TagsContainer from "@containers/TagsContainer/TagsContainer";
import MessageCountContainer from "@containers/MessageCountContainer/MessageCountContainer";
import { Button } from "react-bootstrap";
import React, { useState } from "react";

import styles from "./SideBarContainer.module.scss";

interface IMessageFilter {
  min: number;
  max: number;
}

interface ISideBarState {
  tagsToInclude?: string[];
  tagsToExclude?: string[];
  sentMessageFilter?: IMessageFilter;
  receivedMessageFilter?: IMessageFilter;
}

const SideBarContainer: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataState, setDataState] = useState<ISideBarState>({});

  return (
    <div className={styles.container}>
      <div>
        <Header />
        <TagsContainer />
        <MessageCountContainer />
      </div>
      <Button variant="success">Success</Button>
    </div>
  );
};

export default SideBarContainer;
