// ProfContext.js

import React, { createContext, useContext, useState } from 'react';

const ProfContext = createContext();

export function ProfProvider({ children }) {
  const [prof, setProf] = useState('');

  const updateProf = (newProf) => {
    setProf(newProf);
  };

  return (
    <ProfContext.Provider value={{ prof, updateProf }}>
      {children}
    </ProfContext.Provider>
  );
}

export function useProf() {
  return useContext(ProfContext);
}
