import { useEffect, useState } from 'react';
import { SessionTemplate } from '../../types';
import SessionTemplateItem from './SessionTemplateItem';
import { getSessionTemplates } from '../../services/session-templates';

const SessionTemplateList = () => {
  const [sessionTemplates, setSessionTemplates] = useState<SessionTemplate[]>(
    []
  );

  useEffect(() => {
    const fetchSessionTemplates = async () => {
      const sessionsData = await getSessionTemplates();
      setSessionTemplates(sessionsData);
    };

    fetchSessionTemplates();
  }, []);

  return (
    <div>
      <h2>Session templates:</h2>
      {sessionTemplates.map((sessionTemplate) => (
        // TODO: replace key with uuid
        <SessionTemplateItem
          key={sessionTemplate.name}
          givenSessionTemplate={sessionTemplate}
        ></SessionTemplateItem>
      ))}
    </div>
  );
};

export default SessionTemplateList;
