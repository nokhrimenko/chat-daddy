import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

interface IMessageCountComponent {
  label: string;
}

const MessageCountComponent: React.FC<IMessageCountComponent> = ({ label }) => (
  <div>
    <h6>{label}</h6>
    <InputGroup className="mb-3">
      <FormControl
        className="mb-1"
        aria-label="Amount (to the nearest dollar)"
        placeholder="min"
      />
      <FormControl
        className="mb-1"
        aria-label="Amount (to the nearest dollar)"
        placeholder="max"
      />
    </InputGroup>
  </div>
);

export default MessageCountComponent;
