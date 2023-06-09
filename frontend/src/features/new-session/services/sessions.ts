import axios from 'axios';
import { Session } from '../../../types';

const postSession = (session: Session) => {
  axios.post('http://localhost:3000/api/sessions', session);
};

export default postSession;
