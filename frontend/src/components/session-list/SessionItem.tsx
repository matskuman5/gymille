import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { Session } from '../../types';

interface Props {
  session: Session;
}

const SessionItem = ({ session }: Props) => {
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
