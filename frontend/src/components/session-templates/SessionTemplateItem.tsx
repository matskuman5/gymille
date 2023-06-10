import { ListItemText, List, ListItem } from '@mui/material';
import { SessionTemplate } from '../../types';

interface Props {
  sessionTemplate: SessionTemplate;
}

const SessionTemplateItem = ({ sessionTemplate }: Props) => {
  return (
    <List>
      {sessionTemplate.exerciseTypes.map((exerciseType) => {
        return (
          <ListItem>
            <ListItemText>
              primary="{exerciseType.name}, {exerciseType.bodyPart}"
            </ListItemText>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SessionTemplateItem;
