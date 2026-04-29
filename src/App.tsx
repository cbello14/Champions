import { NavLink, Outlet } from 'react-router';

import { Toaster } from './components/ui/sonner';
import './index.css';

const App = () => (
  <div className="h-screen w-full bg-background text-foreground">
    <Toaster />
    <header className="flex justify-between gap-4 p-4">
      <p>Champions</p>
      <NavLink end to="/">
        Home
      </NavLink>
    </header>
    <Outlet />
  </div>
);

export default App;
