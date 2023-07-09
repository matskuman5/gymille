import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SessionTemplate } from '../../types';
import { UserContext } from '../user-authentication/UserContext';
import { getUserSessionTemplates } from '../../services/session-templates';

type SessionTemplateContextType = {
  sessionTemplates: SessionTemplate[];
  setSessionTemplates: React.Dispatch<React.SetStateAction<SessionTemplate[]>>;
};

export const SessionTemplateContext = createContext<SessionTemplateContextType>(
  {} as SessionTemplateContextType
);

type ChildProps = {
  children: ReactNode;
};

export const SessionTemplateProvider = ({ children }: ChildProps) => {
  const [sessionTemplates, setSessionTemplates] = useState<SessionTemplate[]>(
    []
  );

  const { userId } = useContext(UserContext);

  const fetchSessionTemplates = async () => {
    if (userId) {
      const sessionTemplateData = await getUserSessionTemplates(userId);
      if (sessionTemplateData) {
        setSessionTemplates(sessionTemplateData);
      } else {
        setSessionTemplates([]);
      }
    }
  };

  useEffect(() => {
    fetchSessionTemplates();
  }, []);

  return (
    <SessionTemplateContext.Provider
      value={{ sessionTemplates, setSessionTemplates }}
    >
      {children}
    </SessionTemplateContext.Provider>
  );
};
