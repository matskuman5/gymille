import { Route, Routes } from 'react-router-dom';
import NewSessionForm from './components/new-session/NewSessionForm';
import SessionList from './components/session-list/SessionList';
import Header from './components/Header';
import SessionTemplateList from './components/session-templates/SessionTemplateList';
import { ToastContainer } from 'react-toastify';
import { Box, Container, Stack } from '@mui/material';
import Footer from './components/Footer';

const App = () => {
  return (
    <Container>
      <Stack spacing={2} minHeight="100vh">
        <Header />
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<NewSessionForm />}></Route>
            <Route path="/sessions" element={<SessionList />}></Route>
            <Route
              path="/session-templates"
              element={<SessionTemplateList />}
            ></Route>
          </Routes>
        </Box>
        <Footer />
      </Stack>
      <ToastContainer />
    </Container>
  );
};

export default App;

