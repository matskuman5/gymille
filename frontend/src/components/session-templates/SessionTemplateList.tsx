import { useEffect, useState } from 'react';
import { SessionTemplate } from '../../types';
import SessionTemplateItem from './SessionTemplateItem';
import {
  getSessionTemplates,
  updateSessionTemplate,
  deleteSessionTemplate as deleteSessionTemplateAPI,
} from '../../services/session-templates';
import { Button, Stack, Typography, Divider, Container } from '@mui/material';

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
        exerciseTemplates: [],
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
    <Container>
      <Stack spacing={2}>
        <Typography variant="h3" fontWeight="bold">
          Session templates:
        </Typography>
        <Stack spacing={2} divider={<Divider flexItem />}>
          {sessionTemplates.map((sessionTemplate) => (
            // TODO: replace key with uuid
            <SessionTemplateItem
              key={sessionTemplate.name}
              givenSessionTemplate={sessionTemplate}
              handleUpdatedSessionTemplate={handleUpdatedSessionTemplate}
              deleteSessionTemplate={() =>
                deleteSessionTemplate(sessionTemplate.name)
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
