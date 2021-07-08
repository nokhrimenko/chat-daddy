import React from "react";
import MessageCountComponent from "@components/SideBarComponents/MessageCountComponent/MessageCountComponent";

const MessageCountContainer = () => (
  <div>
    <MessageCountComponent label="Message sent" />
    <MessageCountComponent label="Message received" />
  </div>
);

export default MessageCountContainer;
