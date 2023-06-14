import { TextField, Button, Stack } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import DeleteIcon from '@mui/icons-material/Delete';
import { ExerciseTemplate, SessionTemplate } from '../../types';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  oldSessionTemplate: SessionTemplate;
  setSessionTemplate: React.Dispatch<React.SetStateAction<SessionTemplate>>;
  setEditing: React.Dispatch<React.SetStateAction<Boolean>>;
  handleUpdatedSessionTemplate: (sessionTemplate: SessionTemplate) => void;
}

const SessionTemplateItemEditor = ({
  oldSessionTemplate,
  setSessionTemplate,
  setEditing,
  handleUpdatedSessionTemplate,
}: Props) => {
  const [sessionTemplateEditing, setSessionTemplateEditing] =
    useState<SessionTemplate>(oldSessionTemplate);

  const updateExerciseTemplate = (
    newExerciseTemplate: ExerciseTemplate,
    index: number
  ) => {
    setSessionTemplateEditing((sessionTemplateEditing) => {
      const updatedExerciseTemplates =
        sessionTemplateEditing.exerciseTemplates.map((exerciseTemplate, i) => {
          if (i === index) {
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

  const confirmChanges = () => {
    setSessionTemplate(sessionTemplateEditing);
    handleUpdatedSessionTemplate(sessionTemplateEditing);
    setEditing(false);
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
          onClick={confirmChanges}
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
      {sessionTemplateEditing.exerciseTemplates.map(
        (exerciseTemplate, index) => (
          <div key={exerciseTemplate.id}>
            <TextField
              label="Exercise Name"
              defaultValue={exerciseTemplate.name}
              error={!exerciseTemplate.name}
              helperText={
                !exerciseTemplate.name ? 'Name must be non-empty' : ''
              }
              onChange={(event) =>
                updateExerciseTemplate(
                  {
                    ...exerciseTemplate,
                    name: event.target.value,
                  },
                  index
                )
              }
            ></TextField>
            <TextField
              label="Sets (optional)"
              defaultValue={exerciseTemplate.sets}
              type="number"
              onChange={(event) =>
                updateExerciseTemplate(
                  {
                    ...exerciseTemplate,
                    sets: Number(event.target.value),
                  },
                  index
                )
              }
            ></TextField>
            <TextField
              label="Reps (optional)"
              defaultValue={exerciseTemplate.reps}
              type="number"
              onChange={(event) =>
                updateExerciseTemplate(
                  {
                    ...exerciseTemplate,
                    reps: Number(event.target.value),
                  },
                  index
                )
              }
            ></TextField>
            <Button
              startIcon={<DeleteIcon />}
              onClick={() => deleteExerciseTemplate(exerciseTemplate.id)}
            >
              Delete
            </Button>
          </div>
        )
      )}
      <Button variant="contained" onClick={newExerciseTemplate}>
        Add Exercise Template
      </Button>
    </Stack>
  );
};

export default SessionTemplateItemEditor;
