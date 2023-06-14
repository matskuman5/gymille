import { useEffect, useState } from 'react';
import { SessionTemplate } from '../../types';
import SessionTemplateItem from './SessionTemplateItem';
import {
  getSessionTemplates,
  updateSessionTemplate,
  deleteSessionTemplate as deleteSessionTemplateAPI,
} from '../../services/session-templates';
import { Button, Stack, Divider, Container } from '@mui/material';

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
        id: Math.random() * 10000,
        name: '',
        exerciseTemplates: [],
      },
    ]);
  };

  const deleteSessionTemplate = async (id: Number) => {
    const response = await deleteSessionTemplateAPI(id);
    if (response !== undefined && response.status === 200) {
      setSessionTemplates(
        sessionTemplates.filter((sessionTemplate) => sessionTemplate.id !== id)
      );
    }
  };

  return (
    <Container>
      <Stack spacing={2}>
        <Stack spacing={2} divider={<Divider flexItem />}>
          {sessionTemplates.map((sessionTemplate) => (
            <SessionTemplateItem
              key={sessionTemplate.id}
              givenSessionTemplate={sessionTemplate}
              handleUpdatedSessionTemplate={handleUpdatedSessionTemplate}
              deleteSessionTemplate={() =>
                deleteSessionTemplate(sessionTemplate.id)
              }
            ></SessionTemplateItem>
          ))}
        </Stack>

        <Button
          style={{ maxWidth: '70px' }}
          variant="contained"
          onClick={newSessionTemplate}
        >
          New
        </Button>
      </Stack>
    </Container>
  );
};

export default SessionTemplateList;
