/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { IAction, ISideBarState } from "src/types/commonTypes";

interface IMessageCountComponent {
  label: string;
  dispatch: (payload: IAction) => void;
  state: ISideBarState;
  type: "RECEIVED_MESSAGE_FILTER" | "SENT_MESSAGE_FILTER";
}

const MessageCountComponent: React.FC<IMessageCountComponent> = ({
  label,
  dispatch,
  state,
  type,
}) => {
  const handleClick = (e: any) => {
    const { value } = e.target;
    const eventType = e.target.placeholder.toUpperCase() as "MAX" | "MIN";

    dispatch({ type: `${type}_${eventType}`, payload: value });
  };

  const stateType =
    type === "RECEIVED_MESSAGE_FILTER"
      ? "receivedMessageFilter"
      : "sentMessageFilter";

  return (
    <div>
      <h6>{label}</h6>
      <InputGroup onChange={handleClick} className="mb-3">
        <FormControl
          className="mb-1"
          aria-label="Amount (to the nearest dollar)"
          placeholder="min"
          value={state[stateType].min}
        />
        <FormControl
          className="mb-1"
          aria-label="Amount (to the nearest dollar)"
          placeholder="max"
          value={state[stateType].max}
        />
      </InputGroup>
    </div>
  );
};

export default MessageCountComponent;
