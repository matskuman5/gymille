import { useContext } from 'react';
import { SessionTemplate } from '../../types';
import SessionTemplateItem from './SessionTemplateItem';
import {
  updateSessionTemplate,
  deleteSessionTemplate as deleteSessionTemplateAPI,
} from '../../services/session-templates';
import { Button, Stack, Divider, Container, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import {
  SessionTemplateContext,
  SessionTemplateProvider,
} from './SessionTemplateContext';

const SessionTemplateList = () => {
  const { sessionTemplates, setSessionTemplates } = useContext(
    SessionTemplateContext
  );

  const handleUpdatedSessionTemplate = async (
    sessionTemplate: SessionTemplate
  ) => {
    await updateSessionTemplate(sessionTemplate);
  };

  const newSessionTemplate = () => {
    setSessionTemplates([
      ...sessionTemplates,
      {
        id: uuidv4(),
        name: '',
        exerciseTemplates: [],
      },
    ]);
  };

  const deleteSessionTemplate = async (id: string) => {
    await deleteSessionTemplateAPI(id);
  };

  return (
    <SessionTemplateProvider>
      {!sessionTemplates ? (
        <Typography variant="h5">No session templates created yet!</Typography>
      ) : (
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
      )}
    </SessionTemplateProvider>
  );
};

export default SessionTemplateList;
