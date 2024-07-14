import { Home, LogIn } from "lucide-react";
import Index from "./pages/Index.jsx";
import DemoPlaceholder from "./pages/DemoPlaceholder.jsx";
import EditableTableDemo from "./pages/EditableTableDemo.jsx";
import Login from "./pages/Login.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Login",
    to: "/login",
    icon: <LogIn className="h-4 w-4" />,
    page: <Login />,
  },
];

export const demoRoutes = [
  {
    path: "/demo/editable-table",
    element: <EditableTableDemo />,
  },
  {
    path: "/demo/:demoId",
    element: <DemoPlaceholder />,
  },
];