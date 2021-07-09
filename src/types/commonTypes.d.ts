export interface ISideBarState {
  tagsToInclude: string[];
  tagsToExclude: string[];
  sentMessageFilter: IMessageFilter;
  receivedMessageFilter: IMessageFilter;
}

export type ActionType =
  | "INCLUDE_TAG"
  | "EXCLUDE_TAG"
  | "SENT_MESSAGE_FILTER_MIN"
  | "SENT_MESSAGE_FILTER_MAX"
  | "RECEIVED_MESSAGE_FILTER_MIN"
  | "RECEIVED_MESSAGE_FILTER_MAX"
  | "RESET_STATE"
  | string;

export interface IAction {
  type: ActionType;
  payload: string;
}

interface IMessageFilter {
  min: number;
  max: number;
}
