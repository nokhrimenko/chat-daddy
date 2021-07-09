/* eslint-disable import/no-cycle */
/* eslint-disable no-case-declarations */
import Header from "@components/SideBarComponents/Header/Header";
import TagsContainer from "@containers/TagsContainer/TagsContainer";
import MessageCountContainer from "@containers/MessageCountContainer/MessageCountContainer";
import { Button } from "react-bootstrap";
import React, { useReducer } from "react";
import { useAppDispatch } from "src/app/hooks";
import {
  addFilter,
  clearFilter,
  getNewContactsWithFilter,
} from "@redux/contactsSlice";
import { reducer } from "./helpers/sideBarReducer";

import styles from "./SideBarContainer.module.scss";

const sideBarInitialState = {
  tagsToInclude: [],
  tagsToExclude: [],
  sentMessageFilter: { min: 0, max: 0 },
  receivedMessageFilter: { min: 0, max: 0 },
};

const BUTTON_FILTER_LABEL = "Save filters";
const BUTTON_CLEAR_LABEL = "Clear filters";

const SideBarContainer: React.FC = () => {
  const [state, dispatch] = useReducer<any>(reducer, sideBarInitialState);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatchRedux = useAppDispatch();

  const handleApplyFilter = async () => {
    dispatchRedux(addFilter(state));
    await dispatchRedux(getNewContactsWithFilter());
  };

  const handleResetFilter = async () => {
    dispatchRedux(clearFilter());
    // @ts-ignore
    dispatch({ type: "RESET_STATE", payload: sideBarInitialState });
    await dispatchRedux(getNewContactsWithFilter());
  };

  return (
    <div className={styles.container}>
      <div>
        <Header />
        <TagsContainer dispatch={dispatch} state={state as any} />
        <MessageCountContainer dispatch={dispatch} state={state as any} />
      </div>
      <Button onClick={handleResetFilter} variant="danger">
        {BUTTON_CLEAR_LABEL}
      </Button>
      <Button
        onClick={handleApplyFilter}
        variant="success"
        style={{ backgroundColor: "#0ba391", marginTop: "5px" }}
      >
        {BUTTON_FILTER_LABEL}
      </Button>
    </div>
  );
};

export default SideBarContainer;
