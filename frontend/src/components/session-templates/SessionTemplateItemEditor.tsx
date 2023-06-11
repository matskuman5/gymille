import { TextField, IconButton, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { SessionTemplate } from '../../types';
import { useState } from 'react';

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
  // create a deep copy to avoid editing the "main" session template in the editor
  const [sessionTemplateEditing, setSessionTemplateEditing] =
    useState<SessionTemplate>(JSON.parse(JSON.stringify(oldSessionTemplate)));

  const updateExerciseType = (name: string, index: number) => {
    setSessionTemplateEditing((sessionTemplateEditing) => {
      const newSessionTemplate = sessionTemplateEditing;
      newSessionTemplate.exerciseTypes[index] = {
        ...newSessionTemplate.exerciseTypes[index],
        name: name,
      };
      return newSessionTemplate;
    });

    console.log(oldSessionTemplate);
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
    console.log('deleting exercise type', indexToRemove);
    setSessionTemplateEditing({
      ...sessionTemplateEditing,
      exerciseTypes: sessionTemplateEditing.exerciseTypes.filter(
        (exerciseType) => exerciseType.id !== indexToRemove
      ),
    });
  };

  const confirmChanges = () => {
    console.log('confirm');
    setSessionTemplate(sessionTemplateEditing);
    setEditing(false);
  };

  const cancelChanges = () => {
    console.log('cancel');
    setEditing(false);
  };

  return (
    <>
      <IconButton onClick={confirmChanges}>
        <CheckIcon />
      </IconButton>
      <IconButton onClick={cancelChanges}>
        <DoDisturbIcon />
      </IconButton>
      <TextField
        label="Template Name"
        defaultValue={sessionTemplateEditing.name}
        onChange={(event) => updateName(event?.target.value)}
      ></TextField>
      {sessionTemplateEditing.exerciseTypes.map((exerciseType, index) => (
        <div key={exerciseType.id}>
          <TextField
            label="name"
            defaultValue={exerciseType.name}
            onChange={(event) => updateExerciseType(event.target.value, index)}
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
