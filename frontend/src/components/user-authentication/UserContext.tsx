import { ReactNode, createContext, useEffect, useState } from 'react';
import { getUserName } from '../../services/user';

type UserContextType = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

type ChildProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: ChildProps) => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  const fetchUserData = async () => {
    const data = await getUserName();
    if (data) {
      setUsername(data.username);
      setUserId(data.userId);
    } else {
      setUsername('');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
