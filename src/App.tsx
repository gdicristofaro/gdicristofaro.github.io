import { Routes, Route } from 'react-router-dom';
import BodyContent from './components/BodyContent';
import HomePage from './app/page';
import ProjectsPage from './app/projects/page';
import ResumePage from './app/resume/page';
import NotFoundPage from './app/not-found';

export default function App() {
  return (
    <BodyContent>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BodyContent>
  );
}
