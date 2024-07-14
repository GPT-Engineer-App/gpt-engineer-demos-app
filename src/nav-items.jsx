import { Home, Table2 } from "lucide-react";
import Index from "./pages/Index.jsx";
import DemoPlaceholder from "./pages/DemoPlaceholder.jsx";
import EditableTableDemo from "./pages/EditableTableDemo.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Editable Table",
    to: "/demo/editable-table",
    icon: <Table2 className="h-4 w-4" />,
    page: <EditableTableDemo />,
  },
];

export const demoRoutes = [
  {
    path: "/demo/:demoId",
    element: <DemoPlaceholder />,
  },
];