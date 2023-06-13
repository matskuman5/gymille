import { useEffect, useState } from 'react';
import { SessionTemplate } from '../../types';
import SessionTemplateItem from './SessionTemplateItem';
import {
  getSessionTemplates,
  updateSessionTemplate,
  deleteSessionTemplate as deleteSessionTemplateAPI,
} from '../../services/session-templates';
import {
  Button,
  Stack,
  Typography,
  Divider,
  Box,
  Container,
} from '@mui/material';

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
      <Typography variant="h3" fontWeight="bold" margin={2}>
        Session templates:
      </Typography>
      <Stack spacing={2} divider={<Divider flexItem />}>
        {sessionTemplates.map((sessionTemplate) => (
          // TODO: replace key with uuid
          <Box key={sessionTemplate.name} boxShadow={3}>
            <SessionTemplateItem
              givenSessionTemplate={sessionTemplate}
              handleUpdatedSessionTemplate={handleUpdatedSessionTemplate}
              deleteSessionTemplate={() =>
                deleteSessionTemplate(sessionTemplate.name)
              }
            ></SessionTemplateItem>
          </Box>
        ))}
      </Stack>

      <Button onClick={newSessionTemplate}>Add New Session Template</Button>
    </Container>
  );
};

export default SessionTemplateList;
