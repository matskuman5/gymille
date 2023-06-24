import { Box, Link, Stack, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      boxShadow={3}
      sx={{
        backgroundColor: (theme) => theme.palette.grey[300],
        width: '100%',
      }}
    >
      <Stack margin={1}>
        <Typography variant="body2" color="text.secondary">
          Created by{' '}
          <Link href="https://github.com/matskuman5">matskuman5</Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Source code available on{' '}
          <Link href="https://github.com/matskuman5/gymille">GitHub</Link>
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
