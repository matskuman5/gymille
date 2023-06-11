import { useEffect, useState } from 'react';
import { SessionTemplate } from '../../types';
import SessionTemplateItem from './SessionTemplateItem';
import { getSessionTemplates } from '../../services/session-templates';
import { Button } from '@mui/material';

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

  const newSessionTemplate = () => {
    setSessionTemplates([
      ...sessionTemplates,
      {
        name: '',
        exerciseTypes: [],
      },
    ]);
  };

  const deleteSessionTemplate = (nameToRemove: string) => {
    setSessionTemplates(
      sessionTemplates.filter(
        (sessionTemplate) => sessionTemplate.name !== nameToRemove
      )
    );
  };

  return (
    <div>
      <h2>Session templates:</h2>
      {sessionTemplates.map((sessionTemplate) => (
        // TODO: replace key with uuid
        <div key={sessionTemplate.name}>
          <SessionTemplateItem
            givenSessionTemplate={sessionTemplate}
          ></SessionTemplateItem>
          <Button onClick={() => deleteSessionTemplate(sessionTemplate.name)}>
            Delete
          </Button>
        </div>
      ))}
      <Button onClick={newSessionTemplate}>Add New Session Template</Button>
    </div>
  );
};

export default SessionTemplateList;
