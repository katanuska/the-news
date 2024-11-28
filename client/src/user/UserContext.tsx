import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { UserDetails } from './User';

interface UserContextType {
  user: UserDetails | null;
  signin: (userInfo: UserDetails) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDetails | null>(null);

  const signin = (userInfo: UserDetails) => {
    setUser(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));
  };

  //TODO: implement signout

  useEffect(() => {
    const userInfoString = localStorage.getItem('user');

    if (!userInfoString) return;
    const userInfo = JSON.parse(userInfoString);

    if (!userInfo) return;
    setUser(userInfo);
  }, []);

  return (
    <UserContext.Provider value={{ user, signin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
