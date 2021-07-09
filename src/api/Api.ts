/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ITag } from "@helpers/helpers";
import axios from "axios";
import { ISideBarState } from "src/types/commonTypes";

interface IAdditionalFilters {
  [x: string]: string | number;
}

export async function getFirstContacts(token: string) {
  const {
    data: { contacts, totalCount, nextPage },
  } = await axios.get(`${process.env.REACT_APP_API_SERVER}/contacts`, {
    params: { count: 30, returnTotalCount: true },
    headers: { Authorization: `Bearer ${token}` },
  });

  return { contacts, totalCount, nextPage };
}

export async function getAllTags(token: string) {
  const {
    data: { tags },
  } = await axios.get(`${process.env.REACT_APP_API_SERVER}/tags`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return tags as ITag[];
}

export async function getNextPage(
  token: string,
  page: string,
  filters: ISideBarState
) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const queryFilters = getFilters(filters);
  const {
    data: { contacts, totalCount, nextPage },
  } = await axios.get(`${process.env.REACT_APP_API_SERVER}/contacts`, {
    params: { count: 30, returnTotalCount: true, page, ...queryFilters },
    headers: { Authorization: `Bearer ${token}` },
  });

  return { contacts, totalCount, nextPage };
}

export async function getContactsWithParams(
  token: string,
  filters: ISideBarState,
  page?: string,
  search?: string
) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const additionalFilters = getFilters(filters, page, search);

  const {
    data: { contacts, totalCount, nextPage: nextPageNew },
  } = await axios.get(`${process.env.REACT_APP_API_SERVER}/contacts`, {
    params: {
      count: 30,
      returnTotalCount: true,
      ...additionalFilters,
    },
    headers: { Authorization: `Bearer ${token}` },
  });

  return { contacts, totalCount, nextPage: nextPageNew };
}

function getFilters(filters: ISideBarState, page?: string, search?: string) {
  const additionalFilters: IAdditionalFilters = {};

  if (filters.receivedMessageFilter.max) {
    additionalFilters.minMessagesRecv = filters.receivedMessageFilter.max;
  }

  if (filters.receivedMessageFilter.min) {
    additionalFilters.maxMessagesRecv = filters.receivedMessageFilter.min;
  }

  if (filters.sentMessageFilter.max) {
    additionalFilters.maxMessagesSent = filters.sentMessageFilter.max;
  }

  if (filters.sentMessageFilter.min) {
    additionalFilters.minMessagesSent = filters.sentMessageFilter.min;
  }

  if (filters.tagsToExclude.length) {
    additionalFilters.notTags = JSON.stringify(filters.tagsToExclude);
  }

  if (filters.tagsToInclude.length) {
    additionalFilters.tags = JSON.stringify(filters.tagsToInclude);
  }

  if (search) {
    additionalFilters.q = search;
  }

  if (page) {
    additionalFilters.page = page;
  }

  return additionalFilters;
}
