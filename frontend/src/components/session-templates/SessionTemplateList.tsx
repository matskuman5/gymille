import { useEffect, useState } from 'react';
import { SessionTemplate } from '../../types';
import SessionTemplateItem from './SessionTemplateItem';
import {
  getSessionTemplates,
  updateSessionTemplate,
  deleteSessionTemplate as deleteSessionTemplateAPI,
} from '../../services/session-templates';
import { Button, Stack, Divider, Container } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../Loading';

const SessionTemplateList = () => {
  const [sessionTemplates, setSessionTemplates] = useState<SessionTemplate[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessionTemplates();
  }, []);

  const fetchSessionTemplates = async () => {
    setLoading(true);
    const sessionTemplateData = await getSessionTemplates();
    setLoading(false);
    if (sessionTemplateData !== undefined) {
      setSessionTemplates(sessionTemplateData);
    }
  };

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
    await fetchSessionTemplates();
  };

  return (
    <>
      {loading ? (
        <Loading text={'Fetching session templates..'} />
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
    </>
  );
};

export default SessionTemplateList;
