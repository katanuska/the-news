import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { UserDetails } from './User';
import { apiFetch } from '../../api';

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
  };

  //TODO: implement signout
  const loadCurrentUser = async () => {
    const currentUser = await apiFetch('/auth/user', {
      method: 'GET',
    });

    if (currentUser) {
      setUser(currentUser);
    }
  };

  useEffect(() => {
    loadCurrentUser();
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
