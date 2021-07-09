/* eslint-disable no-case-declarations */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-cycle

import { IAction, ISideBarState } from "src/types/commonTypes";

function deleteTag(tags: string[], tag: string) {
  return tags.filter((arrTag) => arrTag !== tag);
}

export function reducer(state: ISideBarState, action: IAction) {
  switch (action.type) {
    case "INCLUDE_TAG":
      if (state.tagsToInclude.includes(action.payload)) {
        const tagsToInclude = deleteTag(state.tagsToInclude, action.payload);

        return { ...state, tagsToInclude };
      }
      const tagsToExclude = deleteTag(state.tagsToExclude, action.payload);
      return {
        ...state,
        tagsToInclude: [...state.tagsToInclude, action.payload],
        tagsToExclude,
      };
    case "EXCLUDE_TAG":
      if (state.tagsToExclude.includes(action.payload)) {
        const newTagsToExclude = deleteTag(state.tagsToExclude, action.payload);

        return { ...state, tagsToExclude: newTagsToExclude };
      }
      const tagsToInclude = deleteTag(state.tagsToInclude, action.payload);
      return {
        ...state,
        tagsToExclude: [...state.tagsToExclude, action.payload],
        tagsToInclude,
      };
    case "RECEIVED_MESSAGE_FILTER_MIN":
      return {
        ...state,
        receivedMessageFilter: {
          ...state.receivedMessageFilter,
          min: action.payload,
        },
      };
    case "RECEIVED_MESSAGE_FILTER_MAX":
      return {
        ...state,
        receivedMessageFilter: {
          ...state.receivedMessageFilter,
          max: action.payload,
        },
      };
    case "SENT_MESSAGE_FILTER_MIN":
      return {
        ...state,
        sentMessageFilter: {
          ...state.sentMessageFilter,
          min: action.payload,
        },
      };
    case "SENT_MESSAGE_FILTER_MAX":
      return {
        ...state,
        sentMessageFilter: {
          ...state.sentMessageFilter,
          max: action.payload,
        },
      };
    case "RESET_STATE":
      return action.payload;
    default:
      return state;
  }
}
