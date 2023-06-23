import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Session } from '../../types';

interface Props {
  session: Session;
  deleteSession: (id: string) => void;
}

const SessionItem = ({ session, deleteSession }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              {session.name ? (
                <b>
                  {session.name}, {session.date}
                </b>
              ) : (
                <b>{session.date}</b>
              )}
              <Button
                onClick={() => deleteSession(session.id)}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Exercise</TableCell>
            <TableCell>Sets</TableCell>
            <TableCell>Reps</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {session.exercises.map((exercise) => (
            <TableRow key={exercise.id}>
              <TableCell>{exercise.name}</TableCell>
              <TableCell>{exercise.sets}</TableCell>
              <TableCell>{exercise.reps}</TableCell>
              <TableCell>{exercise.weight}</TableCell>
              <TableCell>{exercise.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SessionItem;
