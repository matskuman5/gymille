import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import { getUserSessionTemplates } from '../../services/session-templates';
import { Exercise, SessionTemplate } from '../../utils/types';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../../services/user';

interface Props {
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  setSessionName: React.Dispatch<React.SetStateAction<string>>;
}

const SessionTemplateSelector = ({ setExercises, setSessionName }: Props) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [tempSessionTemplates, setTempSessionTemplates] = useState<
    SessionTemplate[]
  >([]);

  useEffect(() => {
    const sessionTemplatesFromStorage = JSON.parse(
      localStorage.getItem('tempSessionTemplates') || '[]'
    );
    setTempSessionTemplates(sessionTemplatesFromStorage);
  }, []);

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  const { data: sessionTemplates, isSuccess } = useQuery({
    queryKey: ['sessionTemplates'],
    queryFn: () => getUserSessionTemplates(userData!.userId),
    enabled: !!userData?.userId,
  });

  const getSessionTemplateByName = (name: string) => {
    const templates =
      userData?.userId && isSuccess ? sessionTemplates : tempSessionTemplates;
    const sessionTemplate = templates.find(
      (template) => template.name === name
    );
    return sessionTemplate;
  };

  const handleInputChange = (event: { target: { value: string } }) => {
    const { value } = event.target;
    const template = getSessionTemplateByName(value);
    if (template === undefined) {
      console.error(`can't find session template ${value}}`);
      return;
    }

    const newExercises = template.exerciseTemplates.map((exerciseTemplate) => {
      const sets = exerciseTemplate.sets ? exerciseTemplate.sets : 0;
      const reps = exerciseTemplate.reps ? exerciseTemplate.reps : 0;
      return {
        ...exerciseTemplate,
        id: exerciseTemplate.id,
        sets: sets,
        reps: reps,
        weight: 0,
        notes: '',
      };
    });
    setExercises(newExercises);
    setSessionName(template.name);
    setSelectedTemplate(template.name);
  };

  return (
    <>
      {
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Template</InputLabel>
          <Select
            data-cy="session-template-selector"
            onChange={handleInputChange}
            value={selectedTemplate}
          >
            {(userData?.userId && isSuccess
              ? sessionTemplates
              : tempSessionTemplates
            ).map((sessionTemplate) => (
              <MenuItem key={sessionTemplate.id} value={sessionTemplate.name}>
                {sessionTemplate.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      }
    </>
  );
};

export default SessionTemplateSelector;
