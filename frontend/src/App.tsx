import { Link, Route, Routes } from 'react-router-dom';
import NewSessionForm from './components/NewSessionForm';
import WorkoutList from './components/WorkoutList';

const App = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">New Session</Link>
          </li>
          <li>
            <Link to="/workouts">Workouts</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<NewSessionForm />}></Route>
        <Route path="/workouts" element={<WorkoutList />}></Route>
      </Routes>
    </>
  );
};

export default App;

