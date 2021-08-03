import React, { createContext, useState } from 'react';

interface ContextProps {
  ocultarMenu: boolean;
  showMenu: () => void;
  hideMenu: () => void;
}

export const UIContext = createContext({} as ContextProps);

export const UIProvider: React.FC = ({ children }) => {

  const [ ocultarMenu, setOcultarMenu ] = useState( false );

  const showMenu = () => {
    setOcultarMenu( false );
  }

  const hideMenu = () => {
    setOcultarMenu( true );
  }

  return (
    <UIContext.Provider
      value={{
        ocultarMenu,
        showMenu,
        hideMenu,
      }}
    >
      { children }
    </UIContext.Provider>
  )
}
