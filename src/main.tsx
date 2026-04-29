import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import BoardPage from '@/components/BoardPage';
import DecisionPage from '@/components/DecisionPage';
import GamePage from '@/components/GamePage';
import PiecePage from '@/components/PiecePage';
import RestartGamePage from '@/components/RestartGamePage';

import App from './App';
import HomePage from './components/HomePage';
import InstancePage from './components/InstancePage';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />} path="/">
          <Route index element={<HomePage />} />
          <Route element={<PiecePage />} path="pieces" />
          <Route element={<GamePage />} path="games" />
          <Route element={<BoardPage />} path="boards" />
          <Route element={<DecisionPage />} path="start" />
          <Route element={<RestartGamePage />} path="current-games" />
          <Route element={<InstancePage />} path="play/:instanceId" />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
