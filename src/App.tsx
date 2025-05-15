import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import DataLabelingPage from './pages/DataLabelingPage';
import MultiTurnDialogPage from './pages/MultiTurnDialogPage';
import AICallPage from './pages/AICallPage';
import MetricsManagementPage from './pages/MetricsManagementPage';
import PlaygroundPage from './pages/PlaygroundPage';
import SettingsPage from './pages/SettingsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="data-labeling" element={<DataLabelingPage />} />
          <Route path="data-labeling/multi-turn" element={<MultiTurnDialogPage />} />
          <Route path="data-labeling/ai-call" element={<AICallPage />} />
          <Route path="data-labeling/metrics" element={<MetricsManagementPage />} />
          <Route path="playground" element={<PlaygroundPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;