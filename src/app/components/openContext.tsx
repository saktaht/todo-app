'use client'

import React from 'react'
import { useState, createContext } from 'react';

export const OpenContext = createContext<OpenContextProps>(
  {isOpen: false, handleOpen: () => {}}
);

export const OpenProvider: React.FC<{ children: JSX.Element }> = ({children}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    //true or falseを反転させる
    setIsOpen(!isOpen)
  };

  return (
    <OpenContext.Provider value={{isOpen, handleOpen}}>
      {children}
    </OpenContext.Provider>
  )
}
