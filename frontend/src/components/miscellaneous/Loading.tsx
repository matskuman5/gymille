import { CircularProgress, Stack, Typography } from '@mui/material';

interface Props {
  text: string;
}

const Loading = ({ text }: Props) => {
  return (
    <Stack direction="row" spacing={3}>
      <CircularProgress />
      <Typography variant="h5">{text}</Typography>;
    </Stack>
  );
};

export default Loading;
