import { getNewContactsWithFilter, setSearch } from "@redux/contactsSlice";
import debounce from "lodash.debounce";
import React, { useCallback } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { useAppDispatch } from "src/app/hooks";

const SearchContacts = () => {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getResultDebounced = useCallback(debounce(dispatch, 400), []);

  const handleChange = (e: any) => {
    dispatch(setSearch(e.target.value));
    getResultDebounced(getNewContactsWithFilter());
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search"
          aria-label="search"
          onChange={handleChange}
        />
      </InputGroup>
    </div>
  );
};

export default SearchContacts;
