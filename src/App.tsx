import { NavLink, Outlet } from 'react-router';

import { Toaster } from './components/ui/sonner';
import './index.css';
import { TooltipProvider } from './components/ui/tooltip';

const App = () => (
  <div className="h-screen w-full bg-background text-foreground">
    <TooltipProvider>
    <Toaster />
    <header className="flex justify-between gap-4 p-4">
      <p>Champions</p>
      <NavLink end to="/">
        Home
      </NavLink>
    </header>
    <Outlet />
    </TooltipProvider>
  </div>
);

export default App;
