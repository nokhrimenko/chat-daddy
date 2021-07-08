import React from "react";

import { PlusCircle } from "react-bootstrap-icons";

interface IPlusButton {
  size: string;
}

const PlusButton: React.FC<IPlusButton> = ({ size }) => (
  <PlusCircle
    size={size}
    style={{
      backgroundColor: "green",
      borderRadius: "15px",
      cursor: "pointer",
    }}
  />
);

export default PlusButton;
