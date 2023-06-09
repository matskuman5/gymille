import { Link, Route, Routes } from 'react-router-dom';
import NewSessionForm from './features/new-session/components/NewSessionForm';
import SessionList from './features/session-list/components/SessionList';

const App = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">New Session</Link>
          </li>
          <li>
            <Link to="/sessions">Sessions</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<NewSessionForm />}></Route>
        <Route path="/sessions" element={<SessionList />}></Route>
      </Routes>
    </>
  );
};

export default App;

