import { useState } from "react";
import "./App.css";
import AppLayout from "./components/Layout/AppLayout";
import NavBar from "./components/Layout/NavBar";
import Sidebar from "./components/Layout/SideBar";
import TodoApp from "./features/TodoApp";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
    console.log("toggleSidebar", !sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    console.log("Closing sidebar");
  };

  const toggleCollapsed = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="app">
      <NavBar onMenuClick={toggleSidebar} />
      <AppLayout
        sidebar={sidebarOpen ? <Sidebar onClose={closeSidebar} /> : null}
        sidebarCollapsed={sidebarCollapsed}
        onToggleSidebar={toggleCollapsed}
      >
        <TodoApp />
      </AppLayout>
    </div>
  );
}

export default App;
