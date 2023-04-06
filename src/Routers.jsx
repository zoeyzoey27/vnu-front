import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutAdmin from "./components/LayoutAdmin";
import ClassList from "./pages/ClassList";
import Login from "./pages/Login";
import MajorList from "./pages/MajorList";
import StudentList from "./pages/StudentList";
import UserList from "./pages/UserList";
import { PrivateRoutes, UnLoggedRoutes } from "./PrivateRouters";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UnLoggedRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<LayoutAdmin />}>
            <Route path="users" element={<UserList />} />
            <Route path="majors" element={<MajorList />} />
            <Route path="classes" element={<ClassList />} />
            <Route path="students" element={<StudentList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
