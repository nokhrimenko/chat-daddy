import React from "react";
import Tags from "@components/SideBarComponents/Tags/Tags";

const INCLUDE_TAGS_LABEL = "Include tags";
const EXCLUDE_TAGS_LABEL = "Exclude tags";

const TagsContainer: React.FC = () => (
  <div>
    <h5>{INCLUDE_TAGS_LABEL}</h5>
    <Tags />
    <h5>{EXCLUDE_TAGS_LABEL}</h5>
    <Tags />
  </div>
);

export default TagsContainer;
