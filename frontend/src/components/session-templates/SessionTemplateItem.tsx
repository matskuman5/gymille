import { ListItemText, List, ListItem, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { SessionTemplate } from '../../types';
import { useState } from 'react';
import SessionTemplateItemEditor from './SessionTemplateItemEditor';

interface Props {
  givenSessionTemplate: SessionTemplate;
}

const SessionTemplateItem = ({ givenSessionTemplate }: Props) => {
  const [editing, setEditing] = useState<Boolean>(false);
  const [sessionTemplate, setSessionTemplate] =
    useState<SessionTemplate>(givenSessionTemplate);

  return (
    <>
      {editing ? (
        <SessionTemplateItemEditor
          oldSessionTemplate={sessionTemplate}
          setSessionTemplate={setSessionTemplate}
          setEditing={setEditing}
        />
      ) : (
        <>
          <h3>{sessionTemplate.name}</h3>
          <IconButton onClick={() => setEditing(!editing)}>
            <EditIcon />
          </IconButton>
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
        </>
      )}
    </>
  );
};

export default SessionTemplateItem;
