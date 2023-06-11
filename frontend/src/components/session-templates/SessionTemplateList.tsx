import { useEffect, useState } from 'react';
import { SessionTemplate } from '../../types';
import SessionTemplateItem from './SessionTemplateItem';
import {
  getSessionTemplates,
  updateSessionTemplate,
  deleteSessionTemplate as deleteSessionTemplateAPI,
} from '../../services/session-templates';
import { Button } from '@mui/material';

const SessionTemplateList = () => {
  const [sessionTemplates, setSessionTemplates] = useState<SessionTemplate[]>(
    []
  );

  useEffect(() => {
    const fetchSessionTemplates = async () => {
      const sessionTemplateData = await getSessionTemplates();
      if (sessionTemplateData !== undefined) {
        setSessionTemplates(sessionTemplateData);
      }
    };

    fetchSessionTemplates();
  }, []);

  const handleUpdatedSessionTemplate = async (
    sessionTemplate: SessionTemplate
  ) => {
    await updateSessionTemplate(sessionTemplate);
  };

  const newSessionTemplate = () => {
    setSessionTemplates([
      ...sessionTemplates,
      {
        name: '',
        exerciseTypes: [],
      },
    ]);
  };

  const deleteSessionTemplate = async (nameToRemove: string) => {
    const response = await deleteSessionTemplateAPI(nameToRemove);
    if (response !== undefined && response.status === 200) {
      setSessionTemplates(
        sessionTemplates.filter(
          (sessionTemplate) => sessionTemplate.name !== nameToRemove
        )
      );
    }
  };

  return (
    <div>
      <h2>Session templates:</h2>
      {sessionTemplates.map((sessionTemplate) => (
        // TODO: replace key with uuid
        <div key={sessionTemplate.name}>
          <SessionTemplateItem
            givenSessionTemplate={sessionTemplate}
            handleUpdatedSessionTemplate={handleUpdatedSessionTemplate}
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
