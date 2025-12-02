import React from 'react';

export const LayoutContext = React.createContext();

export const LayoutStorage = ({ children }) => {
  const [pageTitle, setPageTitle] = React.useState('Dashboard');

  return (
    <LayoutContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </LayoutContext.Provider>
  );
};