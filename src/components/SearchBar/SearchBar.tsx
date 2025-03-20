import React, { useState } from "react";
import "./SearchBar.css";
import Button from "../Button/Button";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar = (props: SearchBarProps) => {
  const [textSearch, setTextSearch] = useState("");

  return (
    <div className="search-bar">
      <input
        type="textfield"
        placeholder="Search trips"
        className="search-bar-textfield"
        value={textSearch}
        onChange={(e) => setTextSearch(e.target.value)}
      />
      <div className="serach-bar-button">
        <Button
          value="Search"
          onClick={() => props.onSearch(textSearch)}
          type="black"
          size="sm"
        />
      </div>
    </div>
  );
};

export default SearchBar;
