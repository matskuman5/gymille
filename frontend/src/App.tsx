import { Link, Route, Routes } from 'react-router-dom';
import NewSessionForm from './components/new-session/NewSessionForm';
import SessionList from './components/session-list/SessionList';

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

