import { MenuItem, Select } from '@mui/material';
import { useState, useEffect } from 'react';
import { getSessionTemplates } from '../../services/session-templates';
import { Exercise, SessionTemplate } from '../../types';

interface Props {
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

const SessionTemplateSelect = ({ setExercises }: Props) => {
  const [sessionTemplates, setSessionTemplates] = useState<SessionTemplate[]>(
    []
  );

  useEffect(() => {
    const fetchSessionTemplates = async () => {
      const sessionsData = await getSessionTemplates();
      setSessionTemplates(sessionsData);
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
    const newExercises = template.exerciseTypes.map((exerciseType) => ({
      ...exerciseType,
      id: Math.round(Math.random() * 10000),
      sets: 0,
      reps: 0,
      weight: 0,
      notes: '',
    }));
    setExercises(newExercises);
  };

  return (
    <Select label="Template" onChange={handleInputChange} value="">
      {sessionTemplates.map((sessionTemplate) => (
        <MenuItem key={sessionTemplate.name} value={sessionTemplate.name}>
          {sessionTemplate.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SessionTemplateSelect;
