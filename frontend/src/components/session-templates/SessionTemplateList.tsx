import { SessionTemplate } from '../../types';
import SessionTemplateItem from './SessionTemplateItem';
import {
  updateSessionTemplate,
  deleteSessionTemplate,
  getUserSessionTemplates,
  postSessionTemplate,
} from '../../services/session-templates';
import { Button, Stack, Divider, Container, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserData } from '../../services/user';
import { v4 as uuidv4 } from 'uuid';

const SessionTemplateList = () => {
  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  const { data: sessionTemplates } = useQuery({
    queryKey: ['sessionTemplates'],
    queryFn: () => getUserSessionTemplates(userData!.userId),
    enabled: !!userData?.userId,
  });

  const handleUpdatedSessionTemplate = async (
    sessionTemplate: SessionTemplate
  ) => {
    await updateSessionTemplate(sessionTemplate);
  };

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

  return (
    <>
      {sessionTemplates ? (
        <Container>
          <Stack spacing={2}>
            <Stack spacing={2} divider={<Divider flexItem />}>
              {sessionTemplates.map((sessionTemplate) => (
                <SessionTemplateItem
                  key={sessionTemplate.id}
                  givenSessionTemplate={sessionTemplate}
                  handleUpdatedSessionTemplate={handleUpdatedSessionTemplate}
                  deleteSessionTemplate={() =>
                    mutationDeleteSessionTemplate.mutate(sessionTemplate.id)
                  }
                ></SessionTemplateItem>
              ))}
            </Stack>

            <Button
              style={{ maxWidth: '70px' }}
              variant="contained"
              onClick={() => mutationCreateSessionTemplate.mutate()}
            >
              New
            </Button>
          </Stack>
        </Container>
      ) : (
        <Typography variant="h5">No session templates created yet!</Typography>
      )}
    </>
  );
};

export default SessionTemplateList;
