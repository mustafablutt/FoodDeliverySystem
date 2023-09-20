import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilter = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState(null);

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
