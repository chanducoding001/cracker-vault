import React, { useReducer } from 'react';
import { crackersContext, crackersInitialState, crackersReducer } from './contextApi';

const CrackersContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(crackersReducer,crackersInitialState);

  return <>
    <crackersContext.Provider value={{state, dispatch}}>
        {children}
    </crackersContext.Provider>
  </>
}

export default CrackersContextProvider;
