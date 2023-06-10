import { ListItemText, List, ListItem, Button, TextField } from '@mui/material';
import { SessionTemplate } from '../../types';
import { useState } from 'react';

interface Props {
  givenSessionTemplate: SessionTemplate;
}

const SessionTemplateItem = ({ givenSessionTemplate }: Props) => {
  const [editing, setEditing] = useState<Boolean>(false);
  const [sessionTemplate, setUpdatedSessionTemplate] =
    useState<SessionTemplate>(givenSessionTemplate);

  const updateExerciseType = (name: string, index: number) => {
    setUpdatedSessionTemplate((sessionTemplate) => {
      const newSessionTemplate = sessionTemplate;
      newSessionTemplate.exerciseTypes[index] = {
        ...newSessionTemplate.exerciseTypes[index],
        name: name,
      };
      return newSessionTemplate;
    });
  };

  return (
    <>
      <h3>{sessionTemplate.name}</h3>
      <Button onClick={() => setEditing(!editing)}>
        Edit: {editing.toString()}
      </Button>
      {editing ? (
        sessionTemplate.exerciseTypes.map((exerciseType, index) => (
          <TextField
            key={exerciseType.name}
            label="name"
            defaultValue={exerciseType.name}
            onChange={(event) => updateExerciseType(event.target.value, index)}
          ></TextField>
        ))
      ) : (
        <List>
          {sessionTemplate.exerciseTypes.map((exerciseType) => {
            const text: string = `${exerciseType.name}, ${exerciseType.bodyPart}`;
            return (
              // TODO: replace key with uuid
              <ListItem key={exerciseType.name}>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      )}
    </>
  );
};

export default SessionTemplateItem;
