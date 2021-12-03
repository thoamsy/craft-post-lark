import { createContext, useContext } from 'react';

export const Env = createContext({
  userAccessToken: '',
})
export const useEnv = () => useContext(Env)
