import React from 'react';
import { countries } from 'countries-list';

const CountriesDropdown = ({ onChange, value }) => {
  const countryList = Object.values(countries);

  return (
    <select onChange={onChange} value={value} className="form-control">
      <option value="">Select a country</option>
      {countryList.map((country) => (
        <option key={country.name} value={country.name}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountriesDropdown;