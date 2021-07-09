/* eslint-disable react/button-has-type */
import React from "react";
import { CheckCircle } from "react-bootstrap-icons";
import { Image, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import cn from "classnames";
import PlusButton from "../PlusButton/PlusButton";

import styles from "./Contact.module.scss";

interface IContact {
  name: string;
  phoneNumber: string;
  url: string;
  tags: string;
  isActive: boolean;
  handleSelect: () => void;
  handleUnSelect: () => void;
}

interface IOverlayButton {
  tags: string;
}

const TAGS_LABEL = "Tags";

const OverlayButton: React.FC<IOverlayButton> = ({ tags }) => (
  <OverlayTrigger
    placement="auto"
    delay={{ show: 250, hide: 400 }}
    overlay={
      <Tooltip id="button-tooltip" placement="auto">
        {tags}
      </Tooltip>
    }
  >
    <Button size="sm" variant="success" style={{ backgroundColor: "#0ba391" }}>
      {TAGS_LABEL}
    </Button>
  </OverlayTrigger>
);

const Contact: React.FC<IContact> = ({
  name,
  phoneNumber,
  url,
  tags,
  isActive,
  handleUnSelect,
  handleSelect,
}) => {
  const handleSelectClick = () => {
    if (isActive) {
      handleUnSelect();
    } else {
      handleSelect();
    }
  };

  return (
    <div
      className={cn({ [styles.container]: true, [styles.active]: isActive })}
    >
      <div className={styles.leftContainer}>
        <CheckCircle
          onClick={handleSelectClick}
          style={{ cursor: "pointer" }}
        />
        <div className={styles.imageContainer}>
          <Image src={url} />
        </div>
        <div className={styles.infoContainer}>
          <span className={styles.name}>{name}</span>
          <span className={styles.telephone}>{phoneNumber}</span>
        </div>
      </div>
      <div className={styles.actionContainer}>
        {tags && <OverlayButton tags={tags} />}
        <PlusButton size="15px" />
      </div>
    </div>
  );
};

export default Contact;
