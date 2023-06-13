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

  const updateExerciseType = (
    newExerciseType: ExerciseTemplate,
    index: number
  ) => {
    setSessionTemplateEditing((sessionTemplateEditing) => {
      const updatedExerciseTypes = sessionTemplateEditing.exerciseTypes.map(
        (exerciseType, i) => {
          if (i === index) {
            return newExerciseType;
          }
          return exerciseType;
        }
      );

      return {
        ...sessionTemplateEditing,
        exerciseTypes: updatedExerciseTypes,
      };
    });
  };

  const updateName = (newName: string) => {
    setSessionTemplateEditing({ ...sessionTemplateEditing, name: newName });
  };

  const newExerciseType = () => {
    setSessionTemplateEditing({
      ...sessionTemplateEditing,
      exerciseTypes: [
        ...sessionTemplateEditing.exerciseTypes,
        {
          id: Math.round(Math.random() * 10000),
          name: '',
        },
      ],
    });
  };

  const deleteExerciseType = (indexToRemove: number) => {
    setSessionTemplateEditing({
      ...sessionTemplateEditing,
      exerciseTypes: sessionTemplateEditing.exerciseTypes.filter(
        (exerciseType) => exerciseType.id !== indexToRemove
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
      sessionTemplateEditing.exerciseTypes.every(
        (exerciseType) => exerciseType.name
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
      {sessionTemplateEditing.exerciseTypes.map((exerciseType, index) => (
        <div key={exerciseType.id}>
          <TextField
            label="name"
            defaultValue={exerciseType.name}
            error={!exerciseType.name}
            helperText={!exerciseType.name ? 'Name must be non-empty' : ''}
            onChange={(event) =>
              updateExerciseType(
                {
                  ...exerciseType,
                  name: event.target.value,
                },
                index
              )
            }
          ></TextField>
          <TextField
            label="Sets (optional)"
            defaultValue={exerciseType.sets}
            onChange={(event) =>
              updateExerciseType(
                {
                  ...exerciseType,
                  sets: Number(event.target.value),
                },
                index
              )
            }
          ></TextField>
          <TextField
            label="Reps (optional)"
            defaultValue={exerciseType.reps}
            onChange={(event) =>
              updateExerciseType(
                {
                  ...exerciseType,
                  reps: Number(event.target.value),
                },
                index
              )
            }
          ></TextField>
          <Button onClick={() => deleteExerciseType(exerciseType.id)}>
            Delete
          </Button>
        </div>
      ))}
      <Button onClick={newExerciseType}>Add Exercise Type</Button>
    </>
  );
};

export default SessionTemplateItemEditor;
