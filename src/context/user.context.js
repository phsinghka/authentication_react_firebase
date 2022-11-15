import {createContext, useState, useEffect} from 'react';

import {onAuthChangedListener} from '../utils/firebase.utils';

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = {currentUser, setCurrentUser};

  useEffect(() => {
    onAuthChangedListener((user) => {
      setCurrentUser(user);
    });
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
