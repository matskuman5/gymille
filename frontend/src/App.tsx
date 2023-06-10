import { Route, Routes } from 'react-router-dom';
import NewSessionForm from './components/new-session/NewSessionForm';
import SessionList from './components/session-list/SessionList';
import Header from './components/Header';
import SessionTemplateList from './components/session-templates/SessionTemplateList';

const App = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<NewSessionForm />}></Route>
        <Route path="/sessions" element={<SessionList />}></Route>
        <Route
          path="/session-templates"
          element={<SessionTemplateList />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;

