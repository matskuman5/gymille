import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState, useEffect } from 'react';
import { getUserSessionTemplates } from '../../services/session-templates';
import { Exercise, SessionTemplate } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../../services/user';

interface Props {
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  setSessionName: React.Dispatch<React.SetStateAction<string>>;
}

const SessionTemplateSelector = ({ setExercises, setSessionName }: Props) => {
  const [sessionTemplates, setSessionTemplates] = useState<SessionTemplate[]>(
    []
  );
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const { data: userData } = useQuery({
    queryKey: ['userData'],
    queryFn: getUserData,
  });

  useEffect(() => {
    const fetchSessionTemplates = async () => {
      const sessionTemplateData = await getUserSessionTemplates(
        userData!.userId
      );
      if (sessionTemplateData !== undefined) {
        setSessionTemplates(sessionTemplateData);
      }
    };

    fetchSessionTemplates();
  }, []);

  const getSessionTemplateByName = (name: string) => {
    return sessionTemplates.find(
      (sessionTemplates) => sessionTemplates.name === name
    );
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
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel>Template</InputLabel>
      <Select onChange={handleInputChange} value={selectedTemplate}>
        {sessionTemplates.map((sessionTemplate) => (
          <MenuItem key={sessionTemplate.name} value={sessionTemplate.name}>
            {sessionTemplate.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SessionTemplateSelector;
