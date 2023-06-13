import {
  ListItemText,
  List,
  ListItem,
  IconButton,
  Typography,
  Box,
  Stack,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { SessionTemplate } from '../../types';
import { useState } from 'react';
import SessionTemplateItemEditor from './SessionTemplateItemEditor';

interface Props {
  givenSessionTemplate: SessionTemplate;
  handleUpdatedSessionTemplate: (sessionTemplate: SessionTemplate) => void;
  deleteSessionTemplate: (nameToRemove: string) => void;
}

const SessionTemplateItem = ({
  givenSessionTemplate,
  handleUpdatedSessionTemplate,
  deleteSessionTemplate,
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
          <Stack direction="row">
            <Typography variant="h4" margin={2}>
              {sessionTemplate.name}
            </Typography>

            <IconButton onClick={() => setEditing(!editing)}>
              <EditIcon />
            </IconButton>
          </Stack>

          <List>
            {sessionTemplate.exerciseTemplates.map((exerciseTemplate) => {
              const text: string =
                exerciseTemplate.sets || exerciseTemplate.reps
                  ? `${exerciseTemplate.name}, ${exerciseTemplate.sets} x ${exerciseTemplate.reps}`
                  : `${exerciseTemplate.name}`;
              return (
                <ListItem key={exerciseTemplate.id}>
                  <ListItemText primary={text} />
                </ListItem>
              );
            })}
          </List>

          <Button onClick={() => deleteSessionTemplate(sessionTemplate.name)}>
            Delete
          </Button>
        </>
      )}
    </>
  );
};

export default SessionTemplateItem;
