import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import DashboardLayout from "./layout/DashboardLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
