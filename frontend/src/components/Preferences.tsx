import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useState, useEffect } from 'react';

const Preferences = () => {
  const [weightUnit, setWeightUnit] = useState<string>('');

  useEffect(() => {
    setWeightUnit(localStorage.getItem('weightUnit') || 'kg');
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const oldUnit = localStorage.getItem('weightUnit');
    if (oldUnit === 'lbs') {
      localStorage.setItem('weightUnit', 'kg');
    } else {
      localStorage.setItem('weightUnit', 'lbs');
    }
    setWeightUnit((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <FormControl>
        <FormLabel>Weight unit</FormLabel>
        <RadioGroup defaultValue="kg" onChange={handleChange}>
          <FormControlLabel
            value="kg"
            control={<Radio />}
            label="kg"
            checked={weightUnit === 'kg'}
          />
          <FormControlLabel
            value="lbs"
            control={<Radio />}
            label="lbs"
            checked={weightUnit === 'lbs'}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default Preferences;
