import React, { createContext, useState, useContext } from 'react';

const DonarContext = createContext();

export function DonarProvider({ children }) {
  const [donarProfile, setDonarProfile] = useState({
    fullName: 'Avinash',
    bloodGroup: 'O+',
    age: '34',
    city: 'San Francisco, CA'
  });

  return (
    <DonarContext.Provider value={{ donarProfile, setDonarProfile }}>
      {children}
    </DonarContext.Provider>
  );
}

export const useDonar = () => useContext(DonarContext);
