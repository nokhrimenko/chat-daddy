import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAccessToken } from "src/api/auth";
import { getAllTags, getFirstContacts } from "src/api/Api";
import { RootState } from "src/app/store";
import { makeStringFromTagObject } from "@helpers/helpers";
import { ISideBarState } from "@containers/SideBar/SideBarContainer";

interface IContactsSlide {
  contacts: any[];
  loading: boolean;
  accessToken: string;
  lastContactNumber: number;
  totalCount: number;
  tags: string[];
  filters: ISideBarState;
  selectedContacts: number[];
}

const filtersInitialState = {
  tagsToInclude: [],
  tagsToExclude: [],
  sentMessageFilter: { min: 0, max: 0 },
  receivedMessageFilter: { min: 0, max: 0 },
};

const initialState: IContactsSlide = {
  contacts: [
    {
      id: 4718633,
      type: "individual",
      name: "string",
      phoneNumber: "string",
      platformNames: [],
      messagesSent: 0,
      messagesReceived: 0,
      assignee: null,
      tags: [
        {
          name: "string",
        },
      ],
      chats: [],
    },
    {
      id: 1811710,
      type: "individual",
      name: "Danny Ho",
      phoneNumber: "85268287168",
      platformNames: [],
      messagesSent: 0,
      messagesReceived: 0,
      assignee: null,
      tags: [],
      chats: [],
    },
    {
      id: 1811691,
      type: "individual",
      name: "Cherry Kwan",
      phoneNumber: "85263891688",
      platformNames: [],
      messagesSent: 0,
      messagesReceived: 0,
      assignee: null,
      tags: [],
      chats: [],
    },
  ],
  loading: false,
  accessToken: "",
  lastContactNumber: 0,
  totalCount: 0,
  tags: ["test", "test2"],
  filters: filtersInitialState,
  selectedContacts: [],
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
        state.lastContactNumber = 30;
        state.totalCount = action.payload.totalCount;

        state.tags = action.payload.tags;
      });
  },
});

export const { addFilter } = contactsSlice.actions;
export const { selectContact, unSelectContact, selectAll } =
  contactsSlice.actions;

export const selectContacts = (state: RootState) => state.contacts.contacts;
export const totalCount = (state: RootState) => state.contacts.totalCount;
export const allTags = (state: RootState) => state.contacts.tags;

export const selectedContacts = (state: RootState) =>
  state.contacts.selectedContacts;

export default contactsSlice.reducer;
