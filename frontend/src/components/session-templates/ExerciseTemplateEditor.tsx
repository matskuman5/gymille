import { TextField, Button } from '@mui/material';
import { ExerciseTemplate } from '../../utils/types';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  exerciseTemplate: ExerciseTemplate;
  updateExerciseTemplate: (
    newExerciseTemplate: ExerciseTemplate,
    id: string
  ) => void;
  deleteExerciseTemplate: (id: string) => void;
}

const ExerciseTemplateEditor = ({
  exerciseTemplate,
  updateExerciseTemplate,
  deleteExerciseTemplate,
}: Props) => {
  return (
    <div key={exerciseTemplate.id}>
      <TextField
        label="Exercise Name"
        defaultValue={exerciseTemplate.name}
        error={!exerciseTemplate.name}
        helperText={!exerciseTemplate.name ? 'Name must be non-empty' : ''}
        onChange={(event) =>
          updateExerciseTemplate(
            {
              ...exerciseTemplate,
              name: event.target.value,
            },
            exerciseTemplate.id
          )
        }
      ></TextField>
      <TextField
        label="Sets (optional)"
        defaultValue={exerciseTemplate.sets}
        type="number"
        onChange={(event) =>
          updateExerciseTemplate(
            {
              ...exerciseTemplate,
              sets: Number(event.target.value),
            },
            exerciseTemplate.id
          )
        }
      ></TextField>
      <TextField
        label="Reps (optional)"
        defaultValue={exerciseTemplate.reps}
        type="number"
        onChange={(event) =>
          updateExerciseTemplate(
            {
              ...exerciseTemplate,
              reps: Number(event.target.value),
            },
            exerciseTemplate.id
          )
        }
      ></TextField>
      <Button
        startIcon={<DeleteIcon />}
        onClick={() => deleteExerciseTemplate(exerciseTemplate.id)}
      >
        Delete
      </Button>
    </div>
  );
};

export default ExerciseTemplateEditor;
