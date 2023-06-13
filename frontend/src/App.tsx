import { Route, Routes } from 'react-router-dom';
import NewSessionForm from './components/new-session/NewSessionForm';
import SessionList from './components/session-list/SessionList';
import Header from './components/Header';
import SessionTemplateList from './components/session-templates/SessionTemplateList';
import { ToastContainer } from 'react-toastify';
import { Container } from '@mui/material';

const App = () => {
  return (
    <Container>
      <Header></Header>
      <Routes>
        <Route path="/" element={<NewSessionForm />}></Route>
        <Route path="/sessions" element={<SessionList />}></Route>
        <Route
          path="/session-templates"
          element={<SessionTemplateList />}
        ></Route>
      </Routes>
      <ToastContainer />
    </Container>
  );
};

export default App;

