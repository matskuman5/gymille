import { ListItemText, List, ListItem, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { SessionTemplate } from '../../types';
import { useState } from 'react';
import SessionTemplateItemEditor from './SessionTemplateItemEditor';

interface Props {
  givenSessionTemplate: SessionTemplate;
  handleUpdatedSessionTemplate: (sessionTemplate: SessionTemplate) => void;
}

const SessionTemplateItem = ({
  givenSessionTemplate,
  handleUpdatedSessionTemplate,
}: Props) => {
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
          handleUpdatedSessionTemplate={handleUpdatedSessionTemplate}
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
            {sessionTemplate.exerciseTemplates.map((exerciseTemplate) => {
              const text: string =
                exerciseTemplate.sets && exerciseTemplate.reps
                  ? `${exerciseTemplate.name}, ${exerciseTemplate.sets} x ${exerciseTemplate.reps}`
                  : `${exerciseTemplate.name}`;
              return (
                <ListItem key={exerciseTemplate.id}>
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
