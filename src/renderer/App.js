import Main from 'components/Main';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
