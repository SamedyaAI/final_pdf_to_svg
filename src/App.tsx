import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { FeedbackList } from './components/FeedbackList';
import DashboardPage from './pages/DashboardPage';
import { FeedbackButton } from './components/FeedbackButton';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feedback" element={<FeedbackList />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>

      <div className="fixed bottom-4 right-4">
        <FeedbackButton />
      </div>
    </>
  );
}

export default App;