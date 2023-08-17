import { TextField, Button, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { ExerciseTemplate, SessionTemplate } from '../../types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ExerciseTemplateEditor from './ExerciseTemplateEditor';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateSessionTemplate } from '../../services/session-templates';
import { getUserData } from '../../services/user';

interface Props {
  oldSessionTemplate: SessionTemplate;
  setSessionTemplate: React.Dispatch<React.SetStateAction<SessionTemplate>>;
  setEditing: React.Dispatch<React.SetStateAction<Boolean>>;
}

const SessionTemplateItemEditor = ({
  oldSessionTemplate,
  setSessionTemplate,
  setEditing,
}: Props) => {
  const [sessionTemplateEditing, setSessionTemplateEditing] =
    useState<SessionTemplate>(oldSessionTemplate);

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  const updateExerciseTemplate = (
    newExerciseTemplate: ExerciseTemplate,
    id: string
  ) => {
    setSessionTemplateEditing((sessionTemplateEditing) => {
      const updatedExerciseTemplates =
        sessionTemplateEditing.exerciseTemplates.map((exerciseTemplate) => {
          if (exerciseTemplate.id === id) {
            return newExerciseTemplate;
          }
          return exerciseTemplate;
        });

      return {
        ...sessionTemplateEditing,
        exerciseTemplates: updatedExerciseTemplates,
      };
    });
  };

  const queryClient = useQueryClient();

  const mutationUpdateSessionTemplate = useMutation({
    mutationFn: async (sessionTemplate: SessionTemplate) => {
      await updateSessionTemplate(sessionTemplate);
    },
    onSuccess: () => {
      setEditing(false);
      setSessionTemplate(sessionTemplateEditing);
      queryClient.invalidateQueries({ queryKey: ['sessionTemplates'] });
    },
  });

  const handleConfirmClick = () => {
    if (userData?.userId) {
      mutationUpdateSessionTemplate.mutate(sessionTemplateEditing);
    } else {
      const existingTempSessionTemplates = JSON.parse(
        localStorage.getItem('tempSessionTemplates') || '[]'
      );

      const newTempSessionTemplates = existingTempSessionTemplates.map(
        (tempSessionTemplate: SessionTemplate) => {
          if (tempSessionTemplate.id === sessionTemplateEditing.id)
            return sessionTemplateEditing;
          return tempSessionTemplate;
        }
      );

      localStorage.setItem(
        'tempSessionTemplates',
        JSON.stringify(newTempSessionTemplates)
      );

      setEditing(false);
      setSessionTemplate(sessionTemplateEditing);
    }
  };

  const updateName = (newName: string) => {
    setSessionTemplateEditing({ ...sessionTemplateEditing, name: newName });
  };

  const newExerciseTemplate = () => {
    setSessionTemplateEditing({
      ...sessionTemplateEditing,
      exerciseTemplates: [
        ...sessionTemplateEditing.exerciseTemplates,
        {
          id: uuidv4(),
          name: '',
        },
      ],
    });
  };

  const deleteExerciseTemplate = (id: string) => {
    setSessionTemplateEditing({
      ...sessionTemplateEditing,
      exerciseTemplates: sessionTemplateEditing.exerciseTemplates.filter(
        (exerciseTemplate) => exerciseTemplate.id !== id
      ),
    });
  };

  const cancelChanges = () => {
    setEditing(false);
  };

  const checkValidity = () => {
    return (
      sessionTemplateEditing.exerciseTemplates.every(
        (exerciseTemplate) => exerciseTemplate.name
      ) && sessionTemplateEditing.name
    );
  };

  return (
    <Stack spacing={2} margin={3}>
      <Stack direction="row">
        <Button
          onClick={handleConfirmClick}
          disabled={!checkValidity()}
          startIcon={<CheckIcon />}
        >
          Confirm
        </Button>
        <Button onClick={cancelChanges} startIcon={<DoDisturbIcon />}>
          Cancel
        </Button>
      </Stack>

      <TextField
        label="Template Name"
        defaultValue={sessionTemplateEditing.name}
        error={!sessionTemplateEditing.name}
        helperText={
          !sessionTemplateEditing.name ? 'Name must be non-empty' : ''
        }
        onChange={(event) => updateName(event?.target.value)}
      ></TextField>
      {sessionTemplateEditing.exerciseTemplates.map((exerciseTemplate) => {
        return (
          <ExerciseTemplateEditor
            key={exerciseTemplate.id}
            exerciseTemplate={exerciseTemplate}
            updateExerciseTemplate={updateExerciseTemplate}
            deleteExerciseTemplate={deleteExerciseTemplate}
          />
        );
      })}
      <Button variant="contained" onClick={newExerciseTemplate}>
        Add Exercise Template
      </Button>
    </Stack>
  );
};

export default SessionTemplateItemEditor;
