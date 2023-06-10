import { ListItemText, List, ListItem } from '@mui/material';
import { SessionTemplate } from '../../types';

interface Props {
  sessionTemplate: SessionTemplate;
}

const SessionTemplateItem = ({ sessionTemplate }: Props) => {
  return (
    <List>
      {sessionTemplate.exerciseTypes.map((exerciseType) => {
        const text = `${exerciseType.name}, ${exerciseType.bodyPart}`;
        return (
          <ListItem>
            <ListItemText primary={text} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default SessionTemplateItem;
