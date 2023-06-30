import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Session } from '../../types';
import { useState } from 'react';

interface Props {
  session: Session;
  deleteSession: (id: string) => void;
}

const SessionItem = ({ session, deleteSession }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <IconButton onClick={() => setExpanded(!expanded)}>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </TableCell>
            <TableCell>
              <Typography variant="h5">
                {session.name ? `${session.name}` : 'Untitled'}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5">{session.date}</Typography>
            </TableCell>
          </TableRow>
          {expanded && (
            <TableRow>
              <TableCell>Exercise</TableCell>
              <TableCell>Sets</TableCell>
              <TableCell>Reps</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Notes</TableCell>
            </TableRow>
          )}
        </TableHead>
        <TableBody>
          {expanded &&
            session.exercises.map((exercise) => (
              <TableRow key={exercise.id}>
                <TableCell>{exercise.name}</TableCell>
                <TableCell>{exercise.sets}</TableCell>
                <TableCell>{exercise.reps}</TableCell>
                <TableCell>{exercise.weight}</TableCell>
                <TableCell>{exercise.notes}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        {expanded && (
          <TableRow>
            <TableCell>
              <Button
                onClick={() => deleteSession(session.id)}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        )}
      </Table>
    </TableContainer>
  );
};

export default SessionItem;
