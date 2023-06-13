import { TextField, IconButton, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { ExerciseTemplate, SessionTemplate } from '../../types';
import { useState } from 'react';

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
          id: Math.round(Math.random() * 10000),
          name: '',
        },
      ],
    });
  };

  const deleteExerciseTemplate = (indexToRemove: number) => {
    setSessionTemplateEditing({
      ...sessionTemplateEditing,
      exerciseTemplates: sessionTemplateEditing.exerciseTemplates.filter(
        (exerciseTemplate) => exerciseTemplate.id !== indexToRemove
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
    <>
      <IconButton onClick={confirmChanges} disabled={!checkValidity()}>
        <CheckIcon />
      </IconButton>
      <IconButton onClick={cancelChanges}>
        <DoDisturbIcon />
      </IconButton>
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
              label="name"
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
            <Button onClick={() => deleteExerciseTemplate(exerciseTemplate.id)}>
              Delete
            </Button>
          </div>
        )
      )}
      <Button onClick={newExerciseTemplate}>Add Exercise Type</Button>
    </>
  );
};

export default SessionTemplateItemEditor;
