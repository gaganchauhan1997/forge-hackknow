import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AppLayout from "./pages/app/AppLayout";
import AppDashboard from "./pages/app/AppDashboard";
import AppSettings from "./pages/app/AppSettings";
import AppResumes from "./pages/app/AppResumes";
import AppPlan from "./pages/app/AppPlan";
import AppYahavi from "./pages/app/AppYahavi";
import AppUpload from "./pages/app/AppUpload";
import AppLogin from "./pages/app/AppLogin";
import ToolRunner from "./pages/app/ToolRunner";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<AppDashboard />} />
        <Route path="settings" element={<AppSettings />} />
        <Route path="resumes" element={<AppResumes />} />
        <Route path="plan" element={<AppPlan />} />
        <Route path="yahavi" element={<AppYahavi />} />
        <Route path="upload" element={<AppUpload />} />
        <Route path="login" element={<AppLogin />} />
        <Route path="tool/:toolId" element={<ToolRunner />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
