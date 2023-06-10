import { ListItemText, List, ListItem } from '@mui/material';
import { SessionTemplate } from '../../types';

interface Props {
  sessionTemplate: SessionTemplate;
}

const SessionTemplateItem = ({ sessionTemplate }: Props) => {
  return (
    <>
      <h3>{sessionTemplate.name}</h3>
      <List>
        {sessionTemplate.exerciseTypes.map((exerciseType) => {
          const text = `${exerciseType.name}, ${exerciseType.bodyPart}`;
          return (
            // TODO: replace key with uuid
            <ListItem key={exerciseType.name}>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default SessionTemplateItem;
