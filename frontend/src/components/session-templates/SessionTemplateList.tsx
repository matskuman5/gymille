import SessionTemplateItem from './SessionTemplateItem';
import {
  deleteSessionTemplate,
  getUserSessionTemplates,
  postSessionTemplate,
} from '../../services/session-templates';
import { Button, Stack, Divider, Container, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserData } from '../../services/user';
import { v4 as uuidv4 } from 'uuid';
import { SessionTemplate } from '../../utils/types';
import { useState, useEffect } from 'react';

const SessionTemplateList = () => {
  const [tempSessionTemplates, setTempSessionTemplates] = useState<
    SessionTemplate[]
  >([]);

  useEffect(() => {
    const sessionTemplatesFromStorage = JSON.parse(
      localStorage.getItem('tempSessionTemplates') || '[]'
    );
    setTempSessionTemplates(sessionTemplatesFromStorage);
  }, []);

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  const { data: sessionTemplates } = useQuery({
    queryKey: ['sessionTemplates'],
    queryFn: () => getUserSessionTemplates(userData!.userId),
    enabled: !!userData?.userId,
  });

  const queryClient = useQueryClient();

  const mutationCreateSessionTemplate = useMutation({
    mutationFn: async () => {
      const defaultSessionTemplate = {
        id: uuidv4(),
        name: `New Session Template ${
          sessionTemplates ? sessionTemplates.length + 1 : 1
        }`,
        exerciseTemplates: [{ id: uuidv4(), name: 'Example Exercise' }],
      };
      await postSessionTemplate(defaultSessionTemplate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessionTemplates'] });
    },
  });

  const mutationDeleteSessionTemplate = useMutation({
    mutationFn: async (id: string) => await deleteSessionTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessionTemplates'] });
    },
  });

  const handleNewClick = () => {
    if (userData?.userId) {
      mutationCreateSessionTemplate.mutate();
    } else {
      const existingTempSessionTemplates = JSON.parse(
        localStorage.getItem('tempSessionTemplates') || '[]'
      );

      localStorage.setItem(
        'tempSessionTemplates',
        JSON.stringify([
          ...existingTempSessionTemplates,
          {
            id: uuidv4(),
            name: `New Session Template ${
              tempSessionTemplates ? tempSessionTemplates.length + 1 : 1
            }`,
            exerciseTemplates: [{ id: uuidv4(), name: 'Example Exercise' }],
          },
        ])
      );

      const sessionTemplatesFromStorage = JSON.parse(
        localStorage.getItem('tempSessionTemplates') || '[]'
      );
      setTempSessionTemplates(sessionTemplatesFromStorage);
    }
  };

  const deleteTempSessionTemplate = (id: string) => {
    const existingTempSessionTemplates = JSON.parse(
      localStorage.getItem('tempSessionTemplates') || '[]'
    );

    const updatedTempSessionTemplates = existingTempSessionTemplates.filter(
      (sessionTemplate: SessionTemplate) => sessionTemplate.id !== id
    );

    localStorage.setItem(
      'tempSessionTemplates',
      JSON.stringify(updatedTempSessionTemplates)
    );

    const sessionTemplatesFromStorage = JSON.parse(
      localStorage.getItem('tempSessionTemplates') || '[]'
    );
    setTempSessionTemplates(sessionTemplatesFromStorage);
  };

  return (
    <>
      {userData?.userId ? (
        <>
          {sessionTemplates ? (
            <Container>
              <Stack spacing={2}>
                <Stack spacing={2} divider={<Divider flexItem />}>
                  {sessionTemplates.map((sessionTemplate) => (
                    <SessionTemplateItem
                      key={sessionTemplate.id}
                      givenSessionTemplate={sessionTemplate}
                      deleteSessionTemplate={() =>
                        mutationDeleteSessionTemplate.mutate(sessionTemplate.id)
                      }
                    ></SessionTemplateItem>
                  ))}
                </Stack>

                <Button
                  style={{ maxWidth: '70px' }}
                  variant="contained"
                  onClick={handleNewClick}
                >
                  New
                </Button>
              </Stack>
            </Container>
          ) : (
            <Typography variant="h5">
              No session templates created yet!
            </Typography>
          )}
        </>
      ) : (
        <>
          <Container>
            <Stack spacing={2}>
              <Stack spacing={2} divider={<Divider flexItem />}>
                {tempSessionTemplates.map((sessionTemplate) => (
                  <SessionTemplateItem
                    key={sessionTemplate.id}
                    givenSessionTemplate={sessionTemplate}
                    deleteSessionTemplate={() =>
                      deleteTempSessionTemplate(sessionTemplate.id)
                    }
                  ></SessionTemplateItem>
                ))}
              </Stack>
              <Button
                style={{ maxWidth: '70px' }}
                variant="contained"
                onClick={handleNewClick}
              >
                New
              </Button>
            </Stack>
          </Container>
        </>
      )}
    </>
  );
};

export default SessionTemplateList;
