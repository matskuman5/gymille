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
          <h3>
            {sessionTemplate.name}
            <IconButton onClick={() => setEditing(!editing)}>
              <EditIcon />
            </IconButton>
          </h3>

          <List>
            {sessionTemplate.exerciseTypes.map((exerciseType) => {
              const text: string = `${exerciseType.name}`;
              return (
                <ListItem key={exerciseType.id}>
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
