import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccessToken } from "src/api/auth";
import {
  getAllTags,
  getContactsWithParams,
  getFirstContacts,
  getNextPage,
} from "src/api/Api";
import { RootState } from "src/app/store";
import { ITag, makeStringFromTagObject } from "@helpers/helpers";
import { ISideBarState } from "src/types/commonTypes";

interface IContacts {
  id: string;
  type: string;
  name: string;
  phoneNumber: string;
  platformNames: string[];
  messagesSent: number;
  messagesReceived: number;
  assignee: string;
  tags: ITag[];
  chats: string[];
  img: {
    url: string;
  };
}

interface IContactsSlide {
  contacts: IContacts[];
  loading: boolean;
  accessToken: string;
  nextPage: string;
  totalCount: number;
  tags: string[];
  filters: ISideBarState;
  selectedContacts: number[];
  search: string;
}

const filtersInitialState = {
  tagsToInclude: [],
  tagsToExclude: [],
  sentMessageFilter: { min: 0, max: 0 },
  receivedMessageFilter: { min: 0, max: 0 },
};

const initialState: IContactsSlide = {
  contacts: [],
  loading: false,
  accessToken: "",
  nextPage: "",
  totalCount: 0,
  tags: ["test", "test2"],
  filters: filtersInitialState,
  selectedContacts: [],
  search: "",
};

export const initializeRedux = createAsyncThunk(
  "contacts/getToken",
  async () => {
    const token = await getAccessToken();
    const contactsData = await getFirstContacts(token);

    const tags = await getAllTags(token);
    const formattedTags = tags.map(makeStringFromTagObject);
    return {
      token,
      contacts: contactsData.contacts,
      totalCount: contactsData.totalCount,
      tags: formattedTags,
      nextPage: contactsData.nextPage,
    };
  }
);

export const getNewContactsWithFilter = createAsyncThunk(
  "contacts/getNewContacts",
  async (_, thunkAPI) => {
    const {
      contacts: { accessToken, filters, nextPage, search },
    } = thunkAPI.getState() as any;

    const contactsData = await getContactsWithParams(
      accessToken,
      filters,
      nextPage,
      search
    );

    return {
      contacts: contactsData.contacts,
      totalCount: contactsData.totalCount,
    };
  }
);

export const getNewPage = createAsyncThunk(
  "contacts/getNewPage",
  async (_, thunkAPI) => {
    const {
      contacts: { accessToken, filters, nextPage },
    } = thunkAPI.getState() as any;

    const contactsData = await getNextPage(accessToken, nextPage, filters);

    return {
      contacts: contactsData.contacts,
      totalCount: contactsData.totalCount,
      nextPage: contactsData.nextPage,
    };
  }
);

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.filters = action.payload;
    },
    selectContact: (state, action) => {
      state.selectedContacts = [...state.selectedContacts, action.payload];
    },
    unSelectContact: (state, action) => {
      state.selectedContacts = state.selectedContacts.filter(
        (index) => index !== action.payload
      );
    },
    selectAll: (state) => {
      const allAvailableContacts = state.contacts.length;
      if (allAvailableContacts === state.selectedContacts.length) {
        state.selectedContacts = [];
      } else {
        state.selectedContacts = Array.from(Array(allAvailableContacts).keys());
      }
    },
    clearFilter: (state) => {
      state.filters = filtersInitialState;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeRedux.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeRedux.fulfilled, (state, action) => {
        state.loading = false;

        state.accessToken = action.payload.token;
        state.contacts = action.payload.contacts;
        state.nextPage = action.payload.nextPage;
        state.totalCount = action.payload.totalCount;

        state.tags = action.payload.tags;
      })
      .addCase(getNewContactsWithFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewContactsWithFilter.fulfilled, (state, action) => {
        state.loading = false;

        state.contacts = action.payload.contacts;
        state.totalCount = action.payload.totalCount;

        state.selectedContacts = [];
      })
      .addCase(getNewPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewPage.fulfilled, (state, action) => {
        state.loading = false;

        state.contacts = [...state.contacts, ...action.payload.contacts];
        state.totalCount = action.payload.totalCount;
        state.nextPage = action.payload.nextPage;

        state.selectedContacts = [];
      });
  },
});

export const { addFilter, clearFilter } = contactsSlice.actions;
export const { selectContact, unSelectContact, selectAll } =
  contactsSlice.actions;
export const { setSearch } = contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const totalCount = (state: RootState) => state.contacts.totalCount;
export const allTags = (state: RootState) => state.contacts.tags;
export const isLoading = (state: RootState) => state.contacts.loading;

export const selectedContacts = (state: RootState) =>
  state.contacts.selectedContacts;

export default contactsSlice.reducer;
