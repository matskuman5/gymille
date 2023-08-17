import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import { useState, useEffect } from 'react';

const Preferences = () => {
  const [weightUnit, setWeightUnit] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    setWeightUnit(localStorage.getItem('weightUnit') || 'kg');
    setDarkMode(localStorage.getItem('darkMode') === 'true' || false);
  }, []);

  const handleWeightUnitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const oldUnit = localStorage.getItem('weightUnit');
    if (oldUnit === 'lbs') {
      localStorage.setItem('weightUnit', 'kg');
    } else {
      localStorage.setItem('weightUnit', 'lbs');
    }
    setWeightUnit((event.target as HTMLInputElement).value);
  };

  const handleDarkModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const oldMode = localStorage.getItem('darkMode');
    if (oldMode === null) {
      localStorage.setItem('darkMode', 'true');
    } else {
      localStorage.removeItem('darkMode');
    }
    setDarkMode((event.target as HTMLInputElement).value === 'true');
    console.log('hello');
  };

  return (
    <Stack spacing={2}>
      <FormControl>
        <FormLabel>Weight unit</FormLabel>
        <RadioGroup defaultValue="kg" onChange={handleWeightUnitChange}>
          <FormControlLabel
            value="kg"
            control={<Radio />}
            label="kg"
            checked={weightUnit === 'kg'}
            sx={{ color: (theme) => theme.palette.text.secondary }}
          />
          <FormControlLabel
            value="lbs"
            control={<Radio />}
            label="lbs"
            checked={weightUnit === 'lbs'}
            sx={{ color: (theme) => theme.palette.text.secondary }}
          />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel>App theme (refresh to see changes)</FormLabel>
        <RadioGroup defaultValue="light" onChange={handleDarkModeChange}>
          <FormControlLabel
            value="false"
            control={<Radio />}
            label="Light"
            checked={!darkMode}
            sx={{ color: (theme) => theme.palette.text.secondary }}
          />
          <FormControlLabel
            value="true"
            control={<Radio />}
            label="Dark"
            checked={darkMode}
            sx={{ color: (theme) => theme.palette.text.secondary }}
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default Preferences;
