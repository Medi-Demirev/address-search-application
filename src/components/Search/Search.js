import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

import { GEO_API_URL } from "../../constants/Constants";
import { apiKey } from "../../services/api/apiServices";


const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState();

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/findAddressCandidates?address=${inputValue}&maxLocations=all&f=json&token=${apiKey}`
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.candidates.map((address) => {
            return {
              label: `${address.address}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };


  return (
    <AsyncPaginate
      placeholder="Намери адрес"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      isClearable
    />
  );
};
export default Search;
