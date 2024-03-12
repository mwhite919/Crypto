import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useGetAllCoinsQuery } from "../Providers/api/apiSlice";

const { data: allCoinsData, error, isError, isLoading } = useGetAllCoinsQuery({
  currency: "usd",
  sortValue: "volume_desc",
});

const filteredArrayResults = allCoinsData?.filter((coin) => {
  const name = coin.name.toLowerCase();
  const search = searchValue.toLowerCase();
  return name.startsWith(search);
});

const mappedArrayResults = filteredArrayResults?.map((coin, index) => {
  return (
    <DropdownRow
      key={coin.id}
      ref={index === focusedIndex ? resultContainer : null}
      className={`
  cursor-pointer
  hover:bg-slate-200
   ${focusedIndex === index ? "active bg-slate-200" : "bg-white"}`}
      onMouseDown={() => handleSearch(searchValue)}
      onBlur={resetSearchComplete}
    >
      {coin.name}
    </DropdownRow>
  );
});

const DropdownRow = styled.div`
  cursor: pointer;
  text-align: start;
  margin: 2px, 0;
  z-index: 1000;
`;

function SearchBar({
  handleSelection,
  handleSearch,
  placeHolderText,
  searchValue,
  showResults,
  focusedIndex,
  handleKeyPress,
  handleChange,
  resultContainer,
  resetSearchComplete,
  enterFunction,
  classForInput,
  valueForInput,
  handleSubmit,
}) {
  return (
    <div>
      <input
        value={valueForInput}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        placeholder={placeHolderText}
        type="text"
        className={classForInput}
      />
      <div className="ml-5 absolute max-h-44 overflow-y-auto w-44">
        {showResults && mappedArrayResults}
      </div>
    </div>
  );
}

export default SearchBar;
