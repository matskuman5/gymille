import { TextField, IconButton } from '@mui/material';
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
        label="name"
        defaultValue={sessionTemplateEditing.name}
        onChange={(event) => updateName(event?.target.value)}
      ></TextField>
      {sessionTemplateEditing.exerciseTypes.map((exerciseType, index) => (
        <TextField
          key={exerciseType.name}
          label="name"
          defaultValue={exerciseType.name}
          onChange={(event) => updateExerciseType(event.target.value, index)}
        ></TextField>
      ))}
    </>
  );
};

export default SessionTemplateItemEditor;
