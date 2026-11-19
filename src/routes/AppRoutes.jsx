import { Route, Routes } from "react-router-dom";
import App from "../App.jsx";
import Members from "../pages/members.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/members" element={<Members />} />
    </Routes>
  );
}