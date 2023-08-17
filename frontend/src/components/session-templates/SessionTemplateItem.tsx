import {
  ListItemText,
  List,
  ListItem,
  Typography,
  Box,
  Stack,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SessionTemplate } from '../../utils/types';
import { useState } from 'react';
import SessionTemplateItemEditor from './SessionTemplateItemEditor';

interface Props {
  givenSessionTemplate: SessionTemplate;
  deleteSessionTemplate: (nameToRemove: string) => void;
}

const SessionTemplateItem = ({
  givenSessionTemplate,
  deleteSessionTemplate,
}: Props) => {
  const [editing, setEditing] = useState<Boolean>(false);
  const [sessionTemplate, setSessionTemplate] =
    useState<SessionTemplate>(givenSessionTemplate);

  return (
    <Box boxShadow={3}>
      {editing ? (
        <SessionTemplateItemEditor
          oldSessionTemplate={sessionTemplate}
          setSessionTemplate={setSessionTemplate}
          setEditing={setEditing}
        />
      ) : (
        <>
          <Stack direction="row">
            <Typography variant="h4" margin={2} color="text.primary">
              {sessionTemplate.name}
            </Typography>

            <Button
              onClick={() => setEditing(!editing)}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button
              onClick={() => deleteSessionTemplate(sessionTemplate.name)}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Stack>

          <List>
            {sessionTemplate.exerciseTemplates.map((exerciseTemplate) => {
              const text: string =
                exerciseTemplate.sets || exerciseTemplate.reps
                  ? `${exerciseTemplate.name}, ${exerciseTemplate.sets} x ${exerciseTemplate.reps}`
                  : `${exerciseTemplate.name}`;
              return (
                <ListItem key={exerciseTemplate.id}>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      color: 'text.primary',
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </>
      )}
    </Box>
  );
};

export default SessionTemplateItem;
