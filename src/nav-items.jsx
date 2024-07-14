import { Home, Cpu } from "lucide-react";
import Index from "./pages/Index.jsx";
import DemoPlaceholder from "./pages/DemoPlaceholder.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "GPT Engineer Demos",
    to: "/demos",
    icon: <Cpu className="h-4 w-4" />,
    page: <Index />,
  },
];

export const demoRoutes = [
  {
    path: "/demo/:demoId",
    element: <DemoPlaceholder />,
  },
];