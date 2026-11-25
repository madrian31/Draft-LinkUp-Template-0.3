import { Route, Routes } from "react-router-dom";
import App from "../App.jsx";

import MembersForm from "../pages/members/MembersForm.tsx";
import MembersList from "../pages/members/MembersList.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/members/MembersList" element={<MembersList />} />
      <Route path="/members/MembersForm" element={<MembersForm />} />
      <Route path="/members/MembersForm/:id" element={<MembersForm />} />
    </Routes>
  );
}