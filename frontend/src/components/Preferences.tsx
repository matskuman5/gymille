import { Stack, Switch, Typography } from '@mui/material';

const Preferences = () => {
  const changeWeightUnit = () => {
    const oldUnit = localStorage.getItem('weightUnit');
    if (oldUnit === 'lbs') {
      localStorage.setItem('weightUnit', 'kg');
    } else {
      localStorage.setItem('weightUnit', 'lbs');
    }
  };

  return (
    <>
      <Typography variant="h5">Weight unit</Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>kg</Typography>
        <Switch onChange={changeWeightUnit} />
        <Typography>lbs</Typography>
      </Stack>
    </>
  );
};

export default Preferences;
