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
import { useEffect, useState } from 'react';
import { deleteSession } from '../../services/sessions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserData } from '../../services/user';

interface Props {
  session: Session;
}

const SessionItem = ({ session }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const [weightUnit, setWeightUnit] = useState<string>('');

  useEffect(() => {
    setWeightUnit(localStorage.getItem('weightUnit') || '');
  }, []);

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteSession(session.id, userData!.userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });

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
              <TableCell>{`Weight (${
                weightUnit === 'lbs' ? 'lbs' : 'kg'
              })`}</TableCell>
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
                <TableCell>
                  {weightUnit === 'lbs'
                    ? Math.round(exercise.weight * 2.2)
                    : exercise.weight}
                </TableCell>
                <TableCell>{exercise.notes}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        {expanded && (
          <TableRow>
            <TableCell>
              <Button
                onClick={() => mutation.mutate()}
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
