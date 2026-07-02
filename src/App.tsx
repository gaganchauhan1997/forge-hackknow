import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CommissionDetail from "./pages/CommissionDetail";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { ChatWidget } from "./components/ChatWidget";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/commission/:id" element={<CommissionDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatWidget />
    </>
  );
}
