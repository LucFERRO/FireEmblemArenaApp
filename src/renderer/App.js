import Template from 'components/Template';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Template />} />
      </Routes>
    </Router>
  );
}
